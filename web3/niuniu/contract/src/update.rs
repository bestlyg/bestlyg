// use crate::{board::Board, Contract, ContractExt};
// use near_sdk::{
//     borsh::{self, BorshDeserialize, BorshSerialize},
//     env, near_bindgen, AccountId, Gas, Promise,
// };
// const NO_ARGS: Vec<u8> = vec![];
// const CALL_GAS: Gas = Gas(200_000_000_000_000); // 200 TGAS

// #[near_bindgen]
// impl Contract {
//     pub fn update_contract(&self) -> Promise {
//         assert!(
//             env::predecessor_account_id() == self.owner_id,
//             "Only the manager can update the code"
//         );
//         let code = env::input().expect("Error: No input").to_vec();

//         Promise::new(env::current_account_id())
//             .deploy_contract(code)
//             .function_call("migrate".to_string(), NO_ARGS, 0, CALL_GAS)
//             .as_return()
//     }
// }

// #[derive(BorshDeserialize, BorshSerialize)]
// struct OldContract {
//     owner_id: AccountId,
//     message: String,
//     board: Board,
// }

// #[near_bindgen]
// impl Contract {
//     #[private]
//     #[init(ignore_state)]
//     pub fn migrate() -> Self {
//         let old_state: OldContract = env::state_read().expect("failed");
//         Self {
//             owner_id: old_state.owner_id,
//             message: old_state.message,
//             board: old_state.board,
//         }
//     }
// }
