use crate::cell::{Cell, CellInfo};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    serde::Serialize,
    store::Vector,
};

#[derive(BorshDeserialize, BorshSerialize, Debug, Serialize)]
pub struct BoardInfo {
    size: (usize, usize),
    data: Vec<CellInfo>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Board(Vector<Vector<Cell>>);

impl Board {
    pub fn new(row_size: usize, col_size: usize) -> Self {
        let mut list = Vector::new(b'r');
        for i in 0..row_size {
            let mut row = Vector::new(i as u8);
            for j in 0..col_size {
                row.push(Cell::new_with_pos((i, j)));
            }
            list.push(row);
        }
        Board(list)
    }
}

impl Into<BoardInfo> for &Board {
    fn into(self) -> BoardInfo {
        let board = &self.0;
        let mut info = BoardInfo {
            size: (board.len() as usize, board[0].len() as usize),
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
