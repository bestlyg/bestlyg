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
    use frame_support::traits::Randomness;
    use frame_system::pallet_prelude::*;
    use serde::{Deserialize, Serialize};
    use sp_std::prelude::*;
    use sp_weights::WeightMeter;

    #[derive(Encode, Decode, Clone, Default, TypeInfo, Serialize, Deserialize)]
    pub struct Kitty(pub [u8; 16]);

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::storage]
    pub type NextKittyId<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::storage]
    pub type Kitties<T> = StorageMap<_, _, u32, Kitty>;

    #[pallet::storage]
    pub type KittyOwner<T: Config> = StorageMap<_, _, u32, T::AccountId>;

    // bid price for each kitty,
    #[pallet::storage]
    pub type KittiesBid<T: Config> = StorageMap<_, _, u32, Vec<(T::AccountId, u64)>>;
}
