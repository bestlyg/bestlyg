#![cfg_attr(not(feature = "std"), no_std, no_main)]
use ink::env::*;

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    BalanceTooLow,
    AllowanceTooLow,
}

pub type Result<T> = core::result::Result<T, Error>;

type Environment = DefaultEnvironment;
type AccountId = <DefaultEnvironment as ::ink::env::Environment>::AccountId;
type Balance = <DefaultEnvironment as ::ink::env::Environment>::Balance;

#[ink::trait_definition]
pub trait TERC20 {
    #[ink(message)]
    fn balance_of(&self, who: AccountId) -> Balance;

    #[ink(message)]
    fn total_supply(&self) -> Balance;

    #[ink(message)]
    fn approve(&mut self, to: AccountId, value: Balance) -> Result<()>;

    #[ink(message)]
    fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()>;

    #[ink(message)]
    fn transfer_from(&mut self, from: AccountId, to: AccountId, value: Balance) -> Result<()>;
}
