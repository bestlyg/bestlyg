use crate::shared::{Color, Position};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    serde::Serialize,
    AccountId,
};

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize)]
pub struct CellInfo {
    pos: Position,
    color: Color,
}

#[derive(BorshDeserialize, BorshSerialize, Default, Debug)]
pub struct Cell {
    pos: Position,
    color: Color,
    owner: Option<AccountId>,
}

impl Cell {
    pub fn new_with_pos(pos: Position) -> Self {
        Self {
            pos,
            color: Default::default(),
            owner: Default::default(),
        }
    }
}

impl Into<CellInfo> for &Cell {
    fn into(self) -> CellInfo {
        CellInfo {
            pos: self.pos,
            color: self.color,
        }
    }
}
