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
    pub(crate) fn get_account(&mut self, account_id: &AccountId) -> &mut Account {
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
    fn _withdraw_account_balance(&mut self, balance: Balance) -> Promise {
        let account_id = env::predecessor_account_id();
        require!(
            self.get_account(&account_id).balance >= balance,
            "You do not have enough balance to withdraw."
        );
        Promise::new(account_id.clone()).transfer(balance).then(
            Self::ext(env::current_account_id()).change_balance(account_id, balance, false),
        )
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
    // 只能自己调
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
    // 只能自己调
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

#[cfg(test)]
mod tests {
    use near_sdk::{test_utils::VMContextBuilder, testing_env};

    use super::*;
    const OWNER: &'static str = "bestlyg.testnet";
    const TEST1_ACCOUNT: &'static str = "test1.testnet";

    #[test]
    fn get_account() {
        let test1_account = TEST1_ACCOUNT.parse::<AccountId>().unwrap();
        let init_balance = crate::shared::POINT_ONE * 10;
        let mut contract = Contract::init(OWNER.parse().unwrap());
        contract.accounts.insert(
            test1_account.clone(),
            Account::new(test1_account.clone(), init_balance),
        );
        let account = contract.accounts.get(&test1_account);
        assert!(account.is_some());
        let account = account.unwrap();
        assert!(account.balance == init_balance);
    }

    #[test]
    fn deposit_account_balance() {
        let test1_account = TEST1_ACCOUNT.parse::<AccountId>().unwrap();
        let init_balance = crate::shared::POINT_ONE * 11;
        set_context(test1_account.clone(), init_balance);
        let mut contract = Contract::init(OWNER.parse().unwrap());
        contract.deposit_account_balance();

        let account = contract.accounts.get(&test1_account);
        assert!(account.is_some());
        let account = account.unwrap();
        assert!(account.balance == init_balance);
    }

    fn set_context(predecessor: AccountId, amount: Balance) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder.attached_deposit(amount);
        testing_env!(builder.build());
    }
}
