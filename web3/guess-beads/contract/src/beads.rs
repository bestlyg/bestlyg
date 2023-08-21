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
        let benefits = match list {
            [0, 4, 8] => 100,
            [1, 3, 8] | [2, 2, 8] => 10,
            [0, 5, 7] | [0, 6, 6] => 20,
            [1, 4, 7] | [2, 3, 7] => 5,
            [1, 5, 6] | [2, 4, 6] | [3, 3, 6] | [2, 5, 5] | [4, 4, 4] => 1,
            [3, 4, 5] => -2,
            _ => 0,
        };
        (pick_list, benefits)
    }
    pub fn collect(list: &[BeadType]) -> [usize; TYPE_NUM] {
        let mut result_list = [0, 0, 0];
        for ty in list {
            result_list[*ty as usize] += 1;
        }
        result_list
    }
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PanicOnDefault)]
pub struct GussBeadsResult {
    pick_list: Vec<crate::beads::BeadType>,
    benefits: i32,
    balance: Balance,
}

#[near_bindgen]
impl Contract {
    pub fn guess_beads(&mut self) -> GussBeadsResult {
        const MIN_BALANCE: Balance = 11;
        let account_id = env::predecessor_account_id();
        let account = self.get_account(&account_id);
        require!(
            account.balance >= MIN_BALANCE * crate::shared::POINT_ONE,
            format!("You need least {} balance in your account.", MIN_BALANCE)
        );
        account.balance -= 1;
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
        GussBeadsResult {
            pick_list,
            benefits,
            balance: account.balance,
        }
    }
}
