use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, log, near_bindgen, require,
    store::LookupMap,
    AccountId, PanicOnDefault,
};

// mod account;
pub mod account;
// mod beads;
pub mod beads;
// mod shared;
pub mod shared;
// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    message: String,
    accounts: LookupMap<AccountId, crate::account::Account>,
}

#[near_bindgen]
impl Contract {
    #[init(ignore_state)]
    pub fn init(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            message: Default::default(),
            accounts: LookupMap::new(b'a'),
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

        return format!("INFO: [{}]", self.message);
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
