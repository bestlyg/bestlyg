#![cfg_attr(not(feature = "std"), no_std)]
use frame_support::pallet_macros::import_section;
pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;
pub mod weights;
pub use weights::*;

mod config;
mod errors;
mod events;
mod extrinsics;
mod genesis;
mod hooks;
mod impls;

/// Import all sections from different files.
#[import_section(extrinsics::dispatches)]
#[import_section(errors::errors)]
#[import_section(events::events)]
#[import_section(config::config)]
#[import_section(hooks::hooks)]
#[import_section(impls::impls)]
#[import_section(genesis::genesis)]
/// Set the pallet at dev mode for quick PoC.
#[frame_support::pallet(dev_mode)]
pub mod pallet {
    use super::*;
    use frame_support::pallet_prelude::*;
    use frame_support::traits::Currency;
    use frame_support::traits::Randomness;
    use frame_support::traits::ReservableCurrency;
    use frame_system::pallet_prelude::*;
    use serde::{Deserialize, Serialize};
    use sp_io::hashing::blake2_128;
    use sp_std::prelude::*;
    use sp_weights::WeightMeter;
    pub type KittyId = u32;
    pub type KittyDna = [u8; 16];
    pub type BalanceOf<T> =
        <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    #[derive(Encode, Decode, Clone, Default, TypeInfo, Serialize, Deserialize, Copy, PartialEq, Eq, PartialOrd, Ord, Debug)]
    pub struct Kitty(pub KittyDna);

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::storage]
    pub type NextKittyId<T> = StorageValue<_, KittyId, ValueQuery>;

    #[pallet::storage]
    pub type Kitties<T> = StorageMap<_, _, KittyId, Kitty>;

    #[pallet::storage]
    pub type KittyOwner<T: Config> = StorageMap<_, _, KittyId, T::AccountId>;

    // bid price for each kitty,
    #[pallet::storage]
    pub type KittiesBid<T: Config> = StorageMap<_, _, KittyId, Vec<(T::AccountId, u64)>>;

    // bid price for each kitty,
    #[pallet::storage]
    pub type KittiesOnSale<T: Config> = StorageMap<_, _, KittyId, BlockNumberFor<T>>;

    #[pallet::storage]
    pub type KittyParents<T: Config> = StorageMap<_, _, KittyId, (KittyId, KittyId)>;
}
