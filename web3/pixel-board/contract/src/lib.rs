use board::{Board, BoardInfo};
use cell::CellInfo;
// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, log, near_bindgen, require, AccountId, PanicOnDefault};

pub mod board;
pub mod cell;
pub mod shared;
mod update;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    message: String,
    board: Board,
}

#[near_bindgen]
impl Contract {
    #[init(ignore_state)]
    pub fn init(owner_id: AccountId, row_size: u32, col_size: u32) -> Self {
        Self {
            owner_id,
            message: Default::default(),
            board: Board::new(row_size, col_size),
        }
    }
    /// debug 打印所有环境信息
    pub fn info(&self) -> String {
        require!(
            self.owner_id == env::predecessor_account_id(),
            "Only the owner can view info."
        );

        log!(
            "predecessor_account_id: {:?}",
            env::predecessor_account_id()
        );
        log!("current_account_id: {:?}", env::current_account_id());
        log!("signer_account_id: {:?}", env::signer_account_id());
        log!("attached_deposit: {:?}", env::attached_deposit());
        log!("account_balance: {:?}", env::account_balance());
        log!("prepaid_gas: {:?}", env::prepaid_gas().0);
        log!("block_timestamp: {:?}", env::block_timestamp());
        log!("epoch_height: {:?}", env::epoch_height());
        log!("storage_usage: {:?}", env::storage_usage());
        log!("storage_byte_cost: {:?}", env::storage_byte_cost());
        log!("used_gas: {:?}", env::used_gas().0);
        log!("signer_account_pk: {:?}", env::signer_account_pk());
        log!(
            "account_locked_balance: {:?}",
            env::account_locked_balance()
        );
        log!("board: {:?}", self.get_board_metadata());

        return format!("INFO: [{}]", self.message);
    }
    pub fn get_board_metadata(&self) -> BoardInfo {
        (&self.board).into()
    }
    pub fn set_board(&mut self, cells: Vec<CellInfo>) {
        let account_id = env::predecessor_account_id();
        for info in cells {
            require!(info.pos.0 <= self.board.size.0, "Out of row boundary.");
            require!(info.pos.1 <= self.board.size.1, "Out of col boundary.");
            let cell = &mut self.board.data[info.pos.0][info.pos.1];
            cell.color = info.color;
            cell.owner = Some(account_id.clone());
        }
    }
    // 测试打印信息
    pub fn get_greeting(&self) -> String {
        return format!("{}: {}", "2023-8-8 22:13", self.message);
    }
    // 测试设置数据
    pub fn set_greeting(&mut self, message: String) {
        self.message = message;
    }
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn get_default_greeting() {
//         let contract = Contract::default();
//         // this test did not call set_greeting so should return the default "Hello" greeting
//         assert_eq!(contract.get_greeting(), "Hello".to_string());
//     }

//     #[test]
//     fn set_then_get_greeting() {
//         let mut contract = Contract::default();
//         contract.set_greeting("howdy".to_string());
//         assert_eq!(contract.get_greeting(), "howdy".to_string());
//     }
// }