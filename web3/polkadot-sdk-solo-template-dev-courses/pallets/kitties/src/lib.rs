#![cfg_attr(not(feature = "std"), no_std)]
use frame_support::pallet_macros::import_section;
pub use pallet::*;
use sp_core::crypto::KeyTypeId;

extern crate alloc;
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
pub mod migration;

/// Defines application identifier for crypto keys of this module.
///
/// Every module that deals with signatures needs to declare its unique identifier for
/// its crypto keys.
/// When offchain worker is signing transactions it's going to request keys of type
/// `KeyTypeId` from the keystore and use the ones it finds to sign the transaction.
/// The keys can be inserted manually via RPC (see `author_insertKey`).
pub const KEY_TYPE: KeyTypeId = KeyTypeId(*b"btc!");

/// Based on the above `KeyTypeId` we need to generate a pallet-specific crypto type wrappers.
/// We can use from supported crypto kinds (`sr25519`, `ed25519` and `ecdsa`) and augment
/// the types with this pallet-specific identifier.
pub mod crypto {
    use super::KEY_TYPE;
    use sp_core::sr25519::Signature as Sr25519Signature;
    use sp_runtime::{
        app_crypto::{app_crypto, sr25519},
        traits::Verify,
        MultiSignature, MultiSigner,
    };
    app_crypto!(sr25519, KEY_TYPE);

    pub struct TestAuthId;

    impl frame_system::offchain::AppCrypto<MultiSigner, MultiSignature> for TestAuthId {
        type RuntimeAppPublic = Public;
        type GenericSignature = sp_core::sr25519::Signature;
        type GenericPublic = sp_core::sr25519::Public;
    }

    // implemented for mock runtime in test
    impl frame_system::offchain::AppCrypto<<Sr25519Signature as Verify>::Signer, Sr25519Signature>
        for TestAuthId
    {
        type RuntimeAppPublic = Public;
        type GenericSignature = sp_core::sr25519::Signature;
        type GenericPublic = sp_core::sr25519::Public;
    }
}

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
    use frame_support::traits::StorageVersion;
    use frame_system::pallet_prelude::*;
    use serde::{Deserialize, Serialize};
    use sp_io::hashing::blake2_128;
    use sp_std::prelude::*;
    use sp_weights::WeightMeter;
    pub type Price = u32;
    pub type KittyId = u32;
    pub type KittyDna = [u8; 16];
    pub type BalanceOf<T> =
        <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;

    #[allow(dead_code)]
    pub(crate) const STORAGE_VERSION: StorageVersion = StorageVersion::new(1);

    #[derive(
        Encode,
        Decode,
        Clone,
        Default,
        TypeInfo,
        Serialize,
        Deserialize,
        Copy,
        PartialEq,
        Eq,
        PartialOrd,
        Ord,
        Debug,
    )]
    pub struct Kitty {
        pub dna: KittyDna,
        pub price: Price,
    }

    #[pallet::pallet]
    #[pallet::storage_version(STORAGE_VERSION)]
    pub struct Pallet<T>(_);

    #[pallet::storage]
    pub type NextKittyId<T> = StorageValue<_, KittyId, ValueQuery>;

    #[pallet::storage]
    pub type Kitties<T> = StorageMap<_, _, KittyId, Kitty>;

    #[pallet::storage]
    pub type KittyOwner<T: Config> = StorageMap<_, _, KittyId, T::AccountId>;

    // bid price for each kitty,
    #[pallet::storage]
    pub type KittiesBid<T: Config> = StorageMap<_, _, KittyId, Vec<(T::AccountId, BalanceOf<T>)>>;

    // bid price for each kitty,
    #[pallet::storage]
    pub type KittiesOnSale<T: Config> = StorageMap<_, _, KittyId, BlockNumberFor<T>>;

    #[pallet::storage]
    pub type Prices<T: Config> = StorageValue<_, Price, ValueQuery>;
}
