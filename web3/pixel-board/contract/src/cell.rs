use crate::shared::{Color, Position};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    serde::{Deserialize, Serialize},
    AccountId,
};

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize, Deserialize)]
pub struct CellInfo {
    pub pos: Position,
    pub color: Color,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Cell {
    pub pos: Position,
    pub color: Color,
    pub owner: Option<AccountId>,
}

impl Cell {
    pub fn new_with_pos(pos: Position) -> Self {
        Self {
            pos,
            color: (255, 255, 255, 1),
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
