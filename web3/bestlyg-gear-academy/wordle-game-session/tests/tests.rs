use gtest::{Log, Program, System};
use wordle_game_session_io::*;

const COUNT_ATTEMPTS: u32 = 5;
const DELAY_TIMEOUT: u32 = 1;
const USER: u64 = 42;

fn get_program(system: &System) -> Program {
    system.init_logger();
    let session = Program::current(system);
    let wordle = Program::from_file(
        system,
        "../target/wasm32-unknown-unknown/release/wordle_game.opt.wasm",
    );

    assert_eq!(session.id(), 1.into());
    assert_eq!(wordle.id(), 2.into());

    let init_result = wordle.send_bytes(USER, b"");
    assert!(!init_result.main_failed());

    let init_result = session.send(
        USER,
        WordleInit {
            wordle_address: wordle.id(),
            count_attempts: COUNT_ATTEMPTS,
            delay_timeout: DELAY_TIMEOUT,
        },
    );
    assert!(!init_result.main_failed());

    let state: WordleState = session.read_state(b"").unwrap();
    assert_eq!(state.count_attemps, COUNT_ATTEMPTS);
    assert_eq!(state.status, WordleStatus::Init);

    session
}

#[test]
fn handle_start_game() {
    let system = System::new();
    let program = get_program(&system);

    let result = program.send(USER, WordleAction::StartGame);
    let expected = Log::builder().payload(WordleEvent::GameStartSuccess);
    assert!(result.contains(&expected));

    let state: WordleState = program.read_state(b"").unwrap();
    assert_eq!(state.status, WordleStatus::GameStarted);
}

#[test]
fn handle_check_word() {
    let system = System::new();
    let program = get_program(&system);
    let _ = program.send(USER, WordleAction::StartGame);

    let result = program.send(USER, WordleAction::CheckWord("hhhhh".to_string()));
    let expected = Log::builder().payload(WordleEvent::CheckWordSuccess(
        wordle_game_io::Event::WordChecked {
            user: USER.into(),
            correct_positions: vec![0],
            contained_in_word: vec![1, 2, 3, 4],
        },
    ));
    assert!(result.contains(&expected));
}

#[test]
fn handle_you_are_win() {
    let system = System::new();
    let program = get_program(&system);
    let _ = program.send(USER, WordleAction::StartGame);

    let arr = vec!["house", "human", "horse"];
    let expected = Log::builder().payload(WordleEvent::YouAreWin);
    let mut results = arr
        .into_iter()
        .map(|s| program.send(USER, WordleAction::CheckWord(s.to_string())));
    assert!(results.any(|result| result.contains(&expected)));
}

#[test]
fn handle_you_are_loose() {
    let system = System::new();
    let program = get_program(&system);
    let _ = program.send(USER, WordleAction::StartGame);

    let expected = Log::builder().payload(WordleEvent::YouAreLoose);
    let results = (0..(COUNT_ATTEMPTS as usize))
        .map(|_| program.send(USER, WordleAction::CheckWord("hhhhh".to_string())));
    assert!(results.last().unwrap().contains(&expected));
}

// #[test]
// fn handle_timeout() {
//     let system = System::new();
//     let program = get_program(&system);
//     let _ = program.send(USER, WordleAction::StartGame);

//     std::thread::sleep(std::time::Duration::from_secs(10));

//     let state: WordleState = program.read_state(b"").unwrap();
//     assert_eq!(
//         state.status,
//         WordleStatus::GameOver(WordlePlayerStatus::Loose)
//     );
// }
