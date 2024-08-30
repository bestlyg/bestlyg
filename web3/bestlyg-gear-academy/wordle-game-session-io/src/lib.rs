#![no_std]

use gmeta::{In, Metadata, Out};
use gstd::{prelude::*, ActorId, MessageId};

pub struct WordleSessionMetadata;

impl Metadata for WordleSessionMetadata {
    type Init = In<WordleInit>;
    type Handle = ();
    type Others = ();
    type Reply = ();
    type Signal = ();
    type State = Out<WordleState>;
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub enum WordleAction {
    StartGame,
    CheckWord(String),
    CheckGameStatus,
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub struct WordleInit {
    pub wordle_address: ActorId,
    pub count_attempts: u32,
    pub delay_timeout: u32,
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub struct WordleState {
    pub wordle_address: ActorId,
    pub status: WordleStatus,
    pub count_attemps: u32,
    pub delay_timeout: u32,
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub enum WordlePlayerStatus {
    Win,
    Loose,
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub enum WordleStatus {
    Init,
    GameStartMessageSent {
        orig_id: MessageId,
        sent_id: MessageId,
    },
    GameStartMessageReceived {
        event: wordle_game_io::Event,
    },
    GameStarted,
    CheckWordMessageSent {
        orig_id: MessageId,
        sent_id: MessageId,
    },
    CheckWordMessageReceived {
        event: wordle_game_io::Event,
    },
    GameOver(WordlePlayerStatus),
}

#[derive(Encode, Decode, TypeInfo, Debug, PartialEq, Eq, Clone)]
pub enum WordleEvent {
    WrongActionToTrigger(WordleState, WordleAction),
    GameStartSuccess,
    GameStartFail(wordle_game_io::Event),
    CheckWordSuccess(wordle_game_io::Event),
    CheckWordFail(wordle_game_io::Event),
    YouAreWin,
    YouAreLoose,
}
