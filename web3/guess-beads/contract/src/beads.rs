use crate::{Contract, ContractExt};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, log, near_bindgen, require,
    serde::{Deserialize, Serialize},
    Balance, PanicOnDefault,
};

pub const BEAD_NUM: usize = 8;
pub const PICK_NUM: usize = 12;
pub const TYPE_NUM: usize = 3;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Copy, Debug)]
pub enum BeadType {
    Red,
    Green,
    Blue,
}
pub const BEAD_TYPE_LIST: [BeadType; 3] = [BeadType::Red, BeadType::Green, BeadType::Blue];

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Debug)]
pub struct Beads(pub Vec<BeadType>);

impl Beads {
    pub fn get_full_beads() -> Self {
        let mut list = vec![];
        for ty in BEAD_TYPE_LIST {
            for _ in 0..BEAD_NUM {
                list.push(ty)
            }
        }
        Beads(list)
    }
    pub fn get_random_beads() -> Self {
        let beads = Self::get_full_beads();
        let random = env::random_seed_array();
        let mut random_list = (0..beads.0.len())
            .map(|i| (random[i], beads.0[i]))
            .collect::<Vec<(u8, BeadType)>>();
        random_list.sort_by_key(|item| item.0);
        Beads(random_list.into_iter().map(|(_, ty)| ty).collect())
    }
    pub fn pick(&self) -> (&[BeadType], i32) {
        let pick_list = &self.0[0..PICK_NUM];
        let mut list = Self::collect(&pick_list);
        list.sort();
        let benefits = Self::get_benefits(&list);
        (pick_list, benefits)
    }
    pub fn collect(list: &[BeadType]) -> [usize; TYPE_NUM] {
        let mut result_list = [0, 0, 0];
        for ty in list {
            result_list[*ty as usize] += 1;
        }
        result_list.sort();
        result_list
    }
    pub fn get_benefits(list: &[usize; 3]) -> i32 {
        match list {
            [0, 4, 8] => 100,
            [1, 3, 8] | [2, 2, 8] => 30,
            [0, 5, 7] | [0, 6, 6] => 50,
            [1, 4, 7] | [2, 3, 7] => 20,
            [1, 5, 6] | [2, 4, 6] | [3, 3, 6] | [2, 5, 5] | [4, 4, 4] => 2,
            [3, 4, 5] => -1,
            _ => 0,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PanicOnDefault)]
pub struct GuessBeadsResult {
    pick_list: Vec<crate::beads::BeadType>,
    benefits: String,
    balance: String,
}

#[near_bindgen]
impl Contract {
    pub fn guess_beads(&mut self) -> GuessBeadsResult {
        const MIN_BALANCE: Balance = 11;
        let account_id = env::predecessor_account_id();
        let account = self.get_account(&account_id);
        require!(
            account.balance >= MIN_BALANCE * crate::shared::POINT_ONE,
            format!("You need least {} balance in your account.", MIN_BALANCE)
        );
        account.balance -= crate::shared::POINT_ONE;
        let beads = crate::beads::Beads::get_random_beads();
        log!("Beads : {:?}", beads);
        let (pick_list, benefits) = beads.pick();
        let pick_list = pick_list.iter().map(|o| o.clone()).collect();
        if benefits > 0 {
            account.balance += benefits as Balance * crate::shared::POINT_ONE;
        } else if benefits < 0 {
            let benefits = -benefits;
            account.balance -= benefits as Balance * crate::shared::POINT_ONE;
        }
        GuessBeadsResult {
            pick_list,
            benefits: benefits.to_string(),
            balance: account.balance.to_string(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{test_utils::VMContextBuilder, testing_env, AccountId};
    const OWNER: &'static str = "bestlyg.testnet";
    const TEST1_ACCOUNT: &'static str = "test1.testnet";
    #[test]
    fn guess_beads() {
        let test1_account = TEST1_ACCOUNT.parse::<AccountId>().unwrap();
        let init_balance = crate::shared::POINT_ONE * 11;
        set_context(test1_account.clone(), init_balance);
        let mut contract = Contract::init(OWNER.parse().unwrap());
        contract.deposit_account_balance();
        for _ in 0..100 {
            let GuessBeadsResult {
                pick_list,
                balance,
                benefits,
            } = contract.guess_beads();

            let list = Beads::collect(&pick_list);
            assert!(Beads::get_benefits(&list).to_string() == benefits);

            let account = contract.accounts.get(&test1_account);
            assert!(account.is_some());
            let account = account.unwrap();
            assert!(account.balance.to_string() == balance);
        }
    }

    fn set_context(predecessor: AccountId, amount: Balance) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder.attached_deposit(amount);
        testing_env!(builder.build());
    }
}
