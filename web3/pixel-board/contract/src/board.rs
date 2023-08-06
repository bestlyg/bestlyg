use crate::{
    cell::{Cell, CellInfo},
    shared::Position,
};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    serde::Serialize,
    store::Vector,
};

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize)]
pub struct BoardInfo {
    pub size: Position,
    pub data: Vec<CellInfo>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Board {
    pub size: Position,
    pub data: Vector<Vector<Cell>>,
}

impl Board {
    pub fn new(row_size: u32, col_size: u32) -> Self {
        let mut list = Vector::new(b'r');
        for i in 0..row_size {
            let mut row = Vector::new(i as u8);
            for j in 0..col_size {
                row.push(Cell::new_with_pos((i, j)));
            }
            list.push(row);
        }
        Board {
            size: (row_size, col_size),
            data: list,
        }
    }
}

impl Into<BoardInfo> for &Board {
    fn into(self) -> BoardInfo {
        let board = &self.data;
        let mut info = BoardInfo {
            size: (board.len(), board[0].len()),
            data: Default::default(),
        };
        for row in board {
            for cell in row {
                info.data.push(cell.into());
            }
        }
        info
    }
}
