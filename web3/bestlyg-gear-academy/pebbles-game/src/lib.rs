#![no_std]

use gstd::{exec, msg, prelude::*, ActorId};
use pebbles_game_io::*;

static mut GAME_STATE: Option<GameState> = None;
static mut OWNER: Option<ActorId> = None;

fn get_random_u32() -> u32 {
    let salt: [u8; 32] = msg::id().into();
    let owner: [u8; 32] = gstd::Into::<[u8; 32]>::into(unsafe { *OWNER.as_ref().unwrap() });
    let mut random_seed = [0u8; 32];
    for i in 0..32 {
        random_seed[i] += salt[i] ^ owner[i];
    }
    // gstd::debug!("get_random_u32: random_seed = {random_seed:?}");
    let (hash, _num) = exec::random(random_seed).expect("get_random_u32(): random call failed");
    u32::from_le_bytes([hash[0], hash[1], hash[2], hash[3]])
}

fn get_game_state() -> &'static mut GameState {
    unsafe {
        let game_state = GAME_STATE.as_mut().expect("GAME_STATE isn't initialized");
        game_state
    }
}

// fn get_owner() -> ActorId {
//     unsafe { OWNER.take().expect("OWNER isn't initialized") }
// }

fn turn_if_first_player_is_program() {
    let game_state = get_game_state();
    if game_state.first_player == Player::Program {
        let random_count = get_random_u32() % get_game_state().max_pebbles_per_turn + 1;
        // gstd::debug!("FirstPlayer is program.");
        let count = match game_state.difficulty {
            DifficultyLevel::Easy => random_count,
            DifficultyLevel::Hard => {
                if game_state.pebbles_remaining % (game_state.max_pebbles_per_turn + 1) == 0 {
                    random_count
                } else {
                    game_state.pebbles_remaining % game_state.max_pebbles_per_turn
                }
            }
        };
        turn(count);
    }
}

fn turn(count: u32) {
    let game_state = get_game_state();

    let count = count.clamp(1, game_state.max_pebbles_per_turn);

    gstd::debug!("Turn: count={count},player={:?}", game_state.first_player);
    game_state.pebbles_remaining = game_state.pebbles_remaining.saturating_sub(count);

    msg::send(
        msg::source(),
        PebblesEvent::CounterTurn(game_state.first_player, count),
        0,
    )
    .expect("Unable to send");

    gstd::debug!(
        "After send: state={:?}",
        PebblesEvent::CounterTurn(game_state.first_player, count)
    );

    if game_state.pebbles_remaining == 0 {
        game_state.winner = Some(game_state.first_player);
    } else {
        game_state.first_player = match game_state.first_player {
            Player::User => Player::Program,
            Player::Program => Player::User,
        };
    }

    gstd::debug!("After turn: state={:?}", get_game_state());
}

fn restart(pebbles_init: PebblesInit) {
    let random_num = get_random_u32();
    let game_state = GameState {
        pebbles_count: pebbles_init.pebbles_count,
        max_pebbles_per_turn: pebbles_init.max_pebbles_per_turn,
        pebbles_remaining: pebbles_init.pebbles_count,
        difficulty: pebbles_init.difficulty,
        first_player: if random_num % 2 == 0 {
            Player::User
        } else {
            Player::Program
        },
        winner: None,
    };
    unsafe {
        GAME_STATE = Some(game_state);
    }
    gstd::debug!(
        "Restart state: {:?}, random_num = {random_num}",
        get_game_state()
    );
    turn_if_first_player_is_program();
}

#[no_mangle]
unsafe extern "C" fn init() {
    let pebbles_init = msg::load::<PebblesInit>().expect("Failed to load PebblesInit");
    // gstd::debug!("Init : {pebbles_init:?}");
    OWNER = Some(msg::source());
    restart(pebbles_init);
}

#[no_mangle]
unsafe extern "C" fn handle() {
    let pebbles_action = msg::load::<PebblesAction>().expect("Failed to load PebblesAction");
    let game_state = get_game_state();
    match pebbles_action {
        PebblesAction::Turn(count) => {
            if game_state.winner.is_some() {
                msg::reply(PebblesEvent::Won(game_state.winner.unwrap()), 0)
                    .expect("Unable to reply");
            } else {
                turn(count);
                turn_if_first_player_is_program();
                msg::reply("turned", 0).expect("Unable to send");
            }
        }
        PebblesAction::GiveUp => {
            if game_state.winner.is_some() {
                msg::reply(PebblesEvent::Won(game_state.winner.unwrap()), 0)
                    .expect("Unable to send");
            } else {
                game_state.winner = Some(Player::Program);
                msg::reply(PebblesEvent::Won(Player::Program), 0).expect("Unable to send");
            }
        }
        PebblesAction::Restart(pebbles_init) => restart(pebbles_init),
    }
}

#[no_mangle]
unsafe extern "C" fn state() {
    let game_state = get_game_state();
    gstd::debug!("State: {game_state:?}");
    msg::reply(game_state, 0).expect("Unable to share the state");
}

#[cfg(test)]
mod tests {
    use super::*;
    use gclient::ext::{sp_core::serde::de::IntoDeserializer, sp_runtime::print};
    use gtest::{Log, Program, System};
    const USER_OWNER: u64 = 42;
    const PROGRAM_OWNER: u64 = 46;
    const PEBBLES_INIT: PebblesInit = PebblesInit {
        pebbles_count: 15,
        max_pebbles_per_turn: 4,
        difficulty: DifficultyLevel::Easy,
    };

    #[test]
    fn program_test() {
        let system = System::new();
        system.init_logger();
        let program = Program::current(&system);
        assert_eq!(program.id(), 1.into());

        let init = PEBBLES_INIT.clone();
        let init_result = program.send(USER_OWNER, init);
        assert!(!init_result.main_failed());

        let game_state: GameState = program.read_state(b"").unwrap();
        assert_eq!(game_state.pebbles_count, PEBBLES_INIT.pebbles_count);
    }

    #[test]
    fn first_player_is_user() {
        let system = System::new();
        system.init_logger();
        let program = Program::current(&system);
        let _ = program.send(USER_OWNER, PEBBLES_INIT.clone());
        loop {
            let random_count = 1;
            let result = program.send(USER_OWNER, PebblesAction::Turn(random_count));
            let log: &[gtest::CoreLog] = result.log();
            if log.len() > 1 {
                let payload = log[0].payload().to_vec();
                let mut data = &payload[..];
                match PebblesEvent::decode(&mut data).expect("Decode error") {
                    PebblesEvent::CounterTurn(player, count) => {
                        assert_eq!(player, Player::User);
                        assert_eq!(count, random_count);
                    }
                    PebblesEvent::Won(player) => {
                        assert_eq!(player, Player::User);
                        break;
                    }
                }
            }
            if log.len() > 2 {
                let payload = log[1].payload().to_vec();
                let mut data = &payload[..];
                match PebblesEvent::decode(&mut data).expect("Decode error") {
                    PebblesEvent::CounterTurn(player, _) => {
                        assert_eq!(player, Player::Program);
                    }
                    PebblesEvent::Won(player) => {
                        assert_eq!(player, Player::Program);
                        break;
                    }
                }
            }

            if log.len() <= 1 {
                break;
            }
        }
    }

    #[test]
    fn first_player_is_program() {
        let system = System::new();
        system.init_logger();
        let program = Program::current(&system);
        let _ = program.send(PROGRAM_OWNER, PEBBLES_INIT.clone());
        loop {
            let random_count = 1;
            let result = program.send(PROGRAM_OWNER, PebblesAction::Turn(random_count));
            let log: &[gtest::CoreLog] = result.log();

            if log.len() > 1 {
                let payload = log[0].payload().to_vec();
                let mut data = &payload[..];
                match PebblesEvent::decode(&mut data).expect("Decode error") {
                    PebblesEvent::CounterTurn(player, count) => {
                        assert_eq!(player, Player::User);
                        assert_eq!(count, random_count);
                    }
                    PebblesEvent::Won(player) => {
                        assert_eq!(player, Player::User);
                        break;
                    }
                }
            }

            if log.len() > 2 {
                let payload = log[1].payload().to_vec();
                let mut data = &payload[..];
                match PebblesEvent::decode(&mut data).expect("Decode error") {
                    PebblesEvent::CounterTurn(player, _) => {
                        assert_eq!(player, Player::Program);
                    }
                    PebblesEvent::Won(player) => {
                        assert_eq!(player, Player::Program);
                        break;
                    }
                }
            }

            if log.len() <= 1 {
                break;
            }
        }
    }

    #[test]
    fn give_up() {
        let system = System::new();
        system.init_logger();
        let program = Program::current(&system);
        let _ = program.send(PROGRAM_OWNER, PEBBLES_INIT.clone());
        let result = program.send(PROGRAM_OWNER, PebblesAction::GiveUp);
        let expected = Log::builder().payload(PebblesEvent::Won(Player::Program));
        assert!(result.contains(&expected));
    }

    #[test]
    fn restart() {
        let system = System::new();
        system.init_logger();
        let program = Program::current(&system);
        let _ = program.send(PROGRAM_OWNER, PEBBLES_INIT.clone());
        let _ = program.send(PROGRAM_OWNER, PebblesAction::Restart(PEBBLES_INIT));
        let game_state: GameState = program.read_state(b"").unwrap();
        assert_eq!(game_state.pebbles_count, PEBBLES_INIT.pebbles_count);
        assert_eq!(
            game_state.max_pebbles_per_turn,
            PEBBLES_INIT.max_pebbles_per_turn
        );
        assert_eq!(game_state.difficulty, PEBBLES_INIT.difficulty);
        assert_eq!(game_state.pebbles_remaining, game_state.pebbles_count);
    }
}
