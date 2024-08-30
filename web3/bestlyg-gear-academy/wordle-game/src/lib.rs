#![no_std]
use gstd::{collections::HashMap, exec, msg, prelude::*, ActorId};
use wordle_game_io::*;

static mut WORDLE: Option<Wordle> = None;

const BANK_OF_WORDS: [&str; 3] = ["house", "human", "horse"];

#[derive(Default)]
struct Wordle {
    games: HashMap<ActorId, String>,
}

#[no_mangle]
extern "C" fn init() {
    unsafe {
        WORDLE = Some(Wordle {
            games: HashMap::new(),
        });
    }
}

#[no_mangle]
extern "C" fn handle() {
    let action: Action = msg::load().expect("Unable to decode ");
    let wordle = unsafe { WORDLE.as_mut().expect("The program is not initialized") };
    gstd::debug!("===[game handle]===");
    gstd::debug!("action: {:?}", action);

    let reply = match action {
        Action::StartGame { user } => {
            let random_id = get_random_value(BANK_OF_WORDS.len() as u8);
            let word = BANK_OF_WORDS[random_id as usize];
            wordle.games.insert(user, word.to_string());
            Event::GameStarted { user }
        }
        Action::CheckWord { user, word } => {
            if word.len() != 5 {
                panic!("The length of the word exceeds 5");
            }
            let key_word = wordle
                .games
                .get(&user)
                .expect("There is no game with this user");
            let mut matched_indices = Vec::with_capacity(5);
            let mut key_indices = Vec::with_capacity(5);
            for (i, (a, b)) in key_word.chars().zip(word.chars()).enumerate() {
                if a == b {
                    matched_indices.push(i as u8);
                } else if key_word.contains(b) {
                    key_indices.push(i as u8);
                }
            }

            Event::WordChecked {
                user,
                correct_positions: matched_indices,
                contained_in_word: key_indices,
            }
        }
    };

    msg::reply(reply, 0).expect("Error in sending a reply");
}

static mut SEED: u8 = 0;

pub fn get_random_value(range: u8) -> u8 {
    let seed = unsafe { SEED };
    unsafe { SEED = SEED.wrapping_add(1) };
    let mut random_input: [u8; 32] = exec::program_id().into();
    random_input[0] = random_input[0].wrapping_add(seed);
    let (random, _) = exec::random(random_input).expect("Error in getting random number");
    random[0] % range
}
