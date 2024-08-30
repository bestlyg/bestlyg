#![no_std]
use gstd::{
    exec,
    exec::{wait, wake},
    msg,
    prelude::*,
};
use wordle_game_session_io::*;

static mut WORDLE_STATE: Option<WordleState> = None;

const COUNT_WORD: usize = 5;

fn get_wordle_state() -> &'static mut WordleState {
    unsafe {
        let game_state = WORDLE_STATE
            .as_mut()
            .expect("WORDLE_STATE isn't initialized");
        game_state
    }
}

#[no_mangle]
extern "C" fn init() {
    gstd::debug!("===[program init]===");
    let wordle_init = msg::load::<WordleInit>().expect("Failed to load");
    unsafe {
        WORDLE_STATE = Some(WordleState {
            wordle_address: wordle_init.wordle_address,
            status: WordleStatus::Init,
            count_attemps: wordle_init.count_attempts,
            delay_timeout: wordle_init.delay_timeout,
        })
    }
}

#[no_mangle]
unsafe extern "C" fn state() {
    gstd::debug!("===[program state]===");
    let state = get_wordle_state();
    msg::reply(state, 0).expect("Unable to share the state");
}

#[no_mangle]
unsafe extern "C" fn handle() {
    let user_id = msg::source();
    let msg_id = msg::id();
    let state = get_wordle_state();
    let action: WordleAction = msg::load().expect("Failed to load payload");

    gstd::debug!("===[program handle]===");
    gstd::debug!("action = {:?}", action);
    gstd::debug!("state = {:?}", state);

    if action == WordleAction::CheckGameStatus {
        let status = match &state.status {
            WordleStatus::GameOver(status) => status.clone(),
            _ => WordlePlayerStatus::Loose,
        };
        msg::reply(
            match status {
                WordlePlayerStatus::Win => WordleEvent::YouAreWin,
                WordlePlayerStatus::Loose => WordleEvent::YouAreLoose,
            },
            0,
        )
        .expect("Failed to reply");
        return;
    }

    match &state.status {
        WordleStatus::Init => {
            if action == WordleAction::StartGame {
                gstd::debug!(
                    "send_delayed, to: {}, block: {}",
                    exec::program_id(),
                    state.delay_timeout
                );
                msg::send_delayed(
                    exec::program_id(),
                    WordleAction::CheckGameStatus,
                    0,
                    state.delay_timeout,
                )
                .expect("Failed to send");

                let sent_id = msg::send(
                    state.wordle_address,
                    wordle_game_io::Action::StartGame { user: user_id },
                    0,
                )
                .expect("Failed to send");

                state.status = WordleStatus::GameStartMessageSent {
                    orig_id: msg_id,
                    sent_id,
                };

                wait();
            } else {
                msg::reply(WordleEvent::WrongActionToTrigger(state.clone(), action), 0)
                    .expect("Failed to reply");
            }
        }
        WordleStatus::GameStartMessageSent {
            orig_id: _,
            sent_id: _,
        }
        | WordleStatus::CheckWordMessageSent {
            orig_id: _,
            sent_id: _,
        } => {
            msg::reply(WordleEvent::WrongActionToTrigger(state.clone(), action), 0)
                .expect("Failed to reply");
        }
        WordleStatus::GameStartMessageReceived { event } => match event {
            wordle_game_io::Event::GameStarted { user: _ } => {
                state.status = WordleStatus::GameStarted;
                msg::reply(WordleEvent::GameStartSuccess, 0).expect("Failed to reply");
            }
            _ => {
                msg::reply(WordleEvent::GameStartFail(event.clone()), 0).expect("Failed to reply");
            }
        },
        WordleStatus::CheckWordMessageReceived { event } => {
            let send_event = event.clone();
            match event {
                wordle_game_io::Event::WordChecked {
                    user: _,
                    correct_positions: _,
                    contained_in_word: _,
                } => {
                    state.status = WordleStatus::GameStarted;
                    msg::reply(WordleEvent::CheckWordSuccess(send_event), 0)
                        .expect("Failed to reply");
                }
                _ => {
                    msg::reply(WordleEvent::CheckWordFail(send_event), 0).expect("Failed to reply");
                }
            }
        }
        WordleStatus::GameStarted => {
            if let WordleAction::CheckWord(word) = action {
                let sent_id = msg::send(
                    state.wordle_address,
                    wordle_game_io::Action::CheckWord {
                        user: user_id,
                        word,
                    },
                    0,
                )
                .expect("Failed to send");

                state.status = WordleStatus::CheckWordMessageSent {
                    orig_id: msg_id,
                    sent_id,
                };

                wait();
            } else {
                msg::reply(WordleEvent::WrongActionToTrigger(state.clone(), action), 0)
                    .expect("Failed to reply");
            }
        }
        WordleStatus::GameOver(status) => {
            let status = match status {
                WordlePlayerStatus::Win => WordleEvent::YouAreWin,
                WordlePlayerStatus::Loose => WordleEvent::YouAreLoose,
            };
            msg::reply(status, 0).expect("Failed to reply");
        }
    };
}

#[no_mangle]
unsafe extern "C" fn handle_reply() {
    let reply_to = msg::reply_to().expect("Failed to get reply_to");
    let event: wordle_game_io::Event = msg::load().expect("Failed to load payload");
    let state = get_wordle_state();

    match state.status {
        WordleStatus::GameStartMessageSent { orig_id, sent_id } if reply_to == sent_id => {
            wake(orig_id).expect("Failed to wake message");
            state.status = WordleStatus::GameStartMessageReceived { event };
        }
        WordleStatus::CheckWordMessageSent { orig_id, sent_id } if reply_to == sent_id => {
            wake(orig_id).expect("Failed to wake message");

            if let wordle_game_io::Event::WordChecked {
                user: _,
                ref correct_positions,
                ref contained_in_word,
            } = event
            {
                if correct_positions.len() == COUNT_WORD && contained_in_word.is_empty() {
                    state.status = WordleStatus::GameOver(WordlePlayerStatus::Win);
                    return;
                } else {
                    state.count_attemps -= 1;
                    if state.count_attemps == 0 {
                        state.status = WordleStatus::GameOver(WordlePlayerStatus::Loose);
                        return;
                    }
                }
            }
            state.status = WordleStatus::CheckWordMessageReceived { event };
        }
        _ => todo!(),
    };
}

// #[cfg(test)]
// mod tests;
