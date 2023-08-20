use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env, near_bindgen,
    serde::{Deserialize, Serialize},
    store::{UnorderedMap, Vector},
    AccountId, Balance, PanicOnDefault,
};
use std::collections::BTreeMap;

use crate::{Contract, ContractExt};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Copy)]
pub enum Status {
    Ready,
    InProgress,
    Finish,
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Room {
    owner: AccountId,
    users: Vector<AccountId>,
    status: Status,
    current_id: u32,
    records: Vector<Record>,
    pokers: crate::poker::Poker,
    current_poker: u32,
    balance: Balance,
}

impl Room {
    fn new(owner: AccountId) -> Self {
        Room {
            owner,
            users: Vector::new(b'u'),
            status: Status::Ready,
            records: Vector::new(b'r'),
            current_id: 0,
            current_poker: 0,
            balance: 0,
            pokers: crate::poker::Poker::get_random_poker(),
        }
    }
    fn start(&mut self) {
        let random_idx = env::random_seed()[0] as u32 % self.users.len();
        self.current_id = random_idx;
        self.records
            .push(Record::Banker(self.users[random_idx].clone()));

        self.distribute(5);
    }
    fn distribute(&mut self, num: u32) {
        let mut map: UnorderedMap<AccountId, Vector<crate::poker::PlayingCard>> =
            UnorderedMap::new(b'd');
        for account_id in self.users.iter() {
            let mut list = Vector::new(
                [
                    b"d".as_slice(),
                    &near_sdk::env::sha256_array(account_id.as_bytes()),
                ]
                .concat(),
            );
            for _ in 0..num {
                let poker = self.pokers.get(self.current_poker);
                list.push(poker);
            }
            map.insert(account_id.clone(), list);
        }

        self.records.push(Record::Distribute(map));
    }
    fn disposit(&mut self, account_id: AccountId, balance: Balance) {
        self.balance += balance;
    }
    fn to_next_user(&mut self) {
        let next_idx = (self.current_id + 1) % self.users.len();
        self.current_id = next_idx;
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
enum Record {
    Banker(AccountId),
    Disposit(AccountId, Balance),
    Distribute(UnorderedMap<AccountId, Vector<crate::poker::PlayingCard>>),
}

#[derive(Serialize, Deserialize)]
pub struct RoomInfo {
    owner: AccountId,
    users: Vec<AccountId>,
    status: Status,
    current_id: u32,
    records: Vec<RoomInfoRecord>,
    current_poker: u32,
    pokers: crate::poker::PokerInfo,
}

impl Into<RoomInfo> for &mut Room {
    fn into(self) -> RoomInfo {
        let pokers = &self.pokers;
        RoomInfo {
            owner: self.owner.clone(),
            users: self.users.into_iter().map(|user| user.clone()).collect(),
            status: self.status,
            current_id: self.current_id,
            current_poker: self.current_poker,
            records: vec![],
            pokers: pokers.into(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub enum RoomInfoRecord {
    Banker(AccountId),
    Disposit(AccountId, Balance),
    Discard(AccountId),
    Distribute(BTreeMap<AccountId, Vec<crate::poker::PlayingCard>>),
}

impl Into<RoomInfoRecord> for Record {
    fn into(self) -> RoomInfoRecord {
        match self {
            Self::Banker(id) => RoomInfoRecord::Banker(id),
            Self::Disposit(id, balance) => RoomInfoRecord::Disposit(id, balance),
            Self::Distribute(map) => RoomInfoRecord::Distribute(
                map.into_iter()
                    .map(|(id, list)| {
                        (
                            id.clone(),
                            list.into_iter().map(|card| card.clone()).collect(),
                        )
                    })
                    .collect(),
            ),
        }
    }
}

#[near_bindgen]
impl Contract {
    #[private]
    pub fn get_room(&mut self, account_id: &AccountId) -> &mut Room {
        self.rooms
            .entry(account_id.clone())
            .or_insert(Room::new(account_id.clone()))
    }
    pub fn get_room_info(&mut self, account_id: AccountId) -> RoomInfo {
        self.get_room(&account_id).into()
    }
    pub fn open_room(&mut self) {
        let account_id = env::predecessor_account_id();
        assert!(!self.rooms.contains_key(&account_id));
        self.get_room(&account_id);
    }
    pub fn join_room(&mut self, room_id: AccountId) {
        let account_id = env::predecessor_account_id();
        {
            let account = self.get_account(&account_id);
            account.room_id = Some(room_id.clone());
        }
        {
            let room = self.get_room(&room_id);
            room.users.push(account_id.clone());
        }
    }
    pub fn leave_room(&mut self) {
        let account_id = env::predecessor_account_id();
        self.leave_room_with_account_id(account_id);
    }
    #[private]
    pub fn leave_room_with_account_id(&mut self, account_id: AccountId) {
        let account = self.get_account(&account_id);
        assert!(account.room_id.is_some());
        let room_id = account.room_id.take().unwrap();
        let room = self.get_room(&room_id);
        assert!(room.owner != account_id);
        let mut new_users = Vector::new(b'u');
        for user in room.users.drain(0..room.users.len()) {
            if user != account_id {
                new_users.push(user);
            }
        }
        room.users = new_users;
    }
    pub fn close_room(&mut self) {
        let account_id = env::predecessor_account_id();
        let account = self.get_account(&account_id);
        assert!(account.room_id.is_some());
        let room_id = account.room_id.take().unwrap();
        let account_ids = self
            .get_room(&room_id)
            .users
            .iter()
            .map(|id| id.clone())
            .collect::<Vec<AccountId>>();
        self.rooms.remove(&account_id);
        for account_id in account_ids {
            let account = self.get_account(&account_id);
            account.room_id = None;
        }
    }
    pub fn start_room(&mut self, room_id: AccountId) {
        let account_id = env::predecessor_account_id();
        assert!(account_id == room_id);
    }
}
