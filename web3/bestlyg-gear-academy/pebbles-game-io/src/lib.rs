#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::prelude::*;

#[derive(Debug, Default, Clone, Encode, TypeInfo, Decode)]
pub struct PebblesInit {
    pub difficulty: DifficultyLevel,
    pub pebbles_count: u32,
    pub max_pebbles_per_turn: u32,
}

#[derive(Debug, Default, Clone, Encode, Decode, TypeInfo, PartialEq, Eq)]
pub enum DifficultyLevel {
    #[default]
    Easy,
    Hard,
}

#[derive(Debug, Clone, Encode, Decode, TypeInfo)]
pub enum PebblesAction {
    Turn(u32),
    GiveUp,
    Restart(PebblesInit),
}

#[derive(Debug, Clone, Encode, Decode, TypeInfo, PartialEq, Eq)]
pub enum PebblesEvent {
    CounterTurn(Player, u32),
    Won(Player),
}

impl PebblesEvent {
    pub fn is_user_turn(&self) -> bool {
        self.is_counter_turn() && self.is_counter_turn_with_player(Player::User)
    }
    pub fn is_program_turn(&self) -> bool {
        self.is_counter_turn() && self.is_counter_turn_with_player(Player::Program)
    }
    pub fn is_user_win(&self) -> bool {
        self.is_won() && self.is_counter_turn_with_player(Player::User)
    }
    pub fn is_program_win(&self) -> bool {
        self.is_won() && self.is_counter_turn_with_player(Player::Program)
    }
    pub fn is_counter_turn(&self) -> bool {
        match self {
            PebblesEvent::CounterTurn(_, _) => true,
            PebblesEvent::Won(_) => false,
        }
    }
    pub fn is_counter_turn_with_player(&self, player: Player) -> bool {
        match self {
            PebblesEvent::CounterTurn(cur, _) => *cur == player,
            PebblesEvent::Won(cur) => *cur == player,
        }
    }
    pub fn is_won(&self) -> bool {
        match self {
            PebblesEvent::CounterTurn(_, _) => false,
            PebblesEvent::Won(_) => true,
        }
    }
}

#[derive(Copy, PartialEq, Eq, Debug, Default, Clone, Encode, Decode, TypeInfo)]
pub enum Player {
    #[default]
    User,
    Program,
}

#[derive(Debug, Default, Clone, Encode, Decode, TypeInfo)]
pub struct GameState {
    pub pebbles_count: u32,
    pub max_pebbles_per_turn: u32,
    pub pebbles_remaining: u32,
    pub difficulty: DifficultyLevel,
    pub first_player: Player,
    pub winner: Option<Player>,
}

pub struct PebblesMetadata;

impl Metadata for PebblesMetadata {
    type Init = In<PebblesInit>;
    type Handle = InOut<PebblesAction, PebblesEvent>;
    type State = Out<GameState>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}
