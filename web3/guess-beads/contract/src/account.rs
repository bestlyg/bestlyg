use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, near_bindgen, require,
    serde::{Deserialize, Serialize},
    AccountId, Balance, PanicOnDefault, Promise,
};

use crate::{Contract, ContractExt};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, PanicOnDefault, Clone)]
pub struct Account {
    pub account_id: AccountId,
    pub balance: Balance,
}

impl Account {
    pub fn new(account_id: AccountId, balance: Balance) -> Self {
        Self {
            account_id,
            balance,
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
    pub fn get_account_info(&mut self) -> Account {
        let account_id = env::predecessor_account_id();
        (*self.get_account(&account_id)).clone()
    }
    pub fn get_account_balance(&mut self) -> String {
        let account_id = env::predecessor_account_id();
        self.get_account(&account_id).balance.to_string()
    }
    #[payable]
    pub fn deposit_account_balance(&mut self) -> String {
        let account_id = env::predecessor_account_id();
        let balance = env::attached_deposit();
        self.change_balance(account_id, balance, true).to_string()
    }
    #[private]
    pub fn _withdraw_account_balance(&mut self, balance: Balance) -> Promise {
        let account_id = env::predecessor_account_id();
        require!(
            self.get_account(&account_id).balance >= balance,
            "You do not have enough balance to withdraw."
        );
        Promise::new(account_id.clone())
            .transfer(balance)
            .then(Self::ext(env::current_account_id()).change_balance_string(account_id, balance, false))
    }
    pub fn withdraw_account_balance(&mut self, balance: String) -> Promise {
        let balance: Result<u128, std::num::ParseIntError> = balance.parse::<Balance>();
        require!(balance.is_ok(), "Error balance type;");
        let balance: Balance = balance.unwrap();
        self._withdraw_account_balance(balance)
    }
    pub fn withdraw_account_balance_all(&mut self) -> Promise {
        let account_id = env::predecessor_account_id();
        let balance = self.get_account(&account_id).balance;
        self._withdraw_account_balance(balance)
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
    #[private]
    pub fn change_balance_string(
        &mut self,
        account_id: AccountId,
        balance: Balance,
        add: bool,
    ) -> String {
        self.change_balance(account_id, balance, add).to_string()
    }
}
