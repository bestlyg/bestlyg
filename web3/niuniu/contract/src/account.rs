use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, near_bindgen,
    serde::{Deserialize, Serialize},
    AccountId, Balance, PanicOnDefault, Promise,
};

use crate::{Contract, ContractExt};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, PanicOnDefault, Clone)]
pub struct Account {
    pub account_id: AccountId,
    pub balance: Balance,
    pub room_id: Option<AccountId>,
}

impl Account {
    pub fn new(account_id: AccountId, balance: Balance) -> Self {
        Self {
            account_id,
            balance,
            room_id: None,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[private]
    pub fn get_account(&mut self, account_id: &AccountId) -> &mut Account {
        self.accounts
            .entry(account_id.clone())
            .or_insert(Account::new(account_id.clone(), 0))
    }
    #[payable]
    pub fn deposit_account_balance(&mut self) -> Balance {
        let account_id = env::predecessor_account_id();
        let balance = env::attached_deposit();
        self.change_balance(account_id, balance, true)
    }
    pub fn withdraw_account_balance(&mut self, balance: String) -> Promise {
        let balance = balance.parse::<Balance>();
        assert!(balance.is_ok());
        let balance: Balance = balance.unwrap();

        let account_id = env::predecessor_account_id();
        assert!(self.get_account(&account_id).balance >= balance);
        Promise::new(account_id.clone())
            .transfer(balance)
            .then(Self::ext(env::current_account_id()).change_balance(account_id, balance, false))
    }
    #[private]
    pub fn change_balance(
        &mut self,
        account_id: AccountId,
        balance: Balance,
        add: bool,
    ) -> Balance {
        let account = self.get_account(&account_id);
        if add {
            (*account).balance += balance;
        } else {
            (*account).balance -= balance;
        }
        (*account).balance
    }
}
