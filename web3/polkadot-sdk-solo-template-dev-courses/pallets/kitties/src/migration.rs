use crate::{Config, Kitties, Kitty, KittyDna, Pallet,KittyId};
use frame_support::{pallet_prelude::*, storage_alias};
use sp_std::prelude::*;
// use storage::IterableStorageMap;
mod v0 {
    use super::*;
    // only contains V0 storage format
    #[derive(Clone, Encode, Decode, PartialEq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct OldKitty(pub KittyDna);

    #[storage_alias]
    pub type Kitties<T: Config, OldKitty> = StorageMap<Pallet<T>, Identity, KittyId, OldKitty>;
}

// If migrate fron vo pub fn migrate_to_v1<t: Config>)
pub fn migrate_to_v1<T: Config>() -> Weight {
    let on_chain: StorageVersion = Pallet::<T>::on_chain_storage_version();
    if on_chain == 0 {
        log::info!("current version is 0, will upgrade to v1");
        log::info!(
            "current version is 0, will upgrade to v1,Old Kitties len:{:?}",
            v0::Kitties::<T, v0::OldKitty>::iter().count()
        );
        for (key, value) in v0::Kitties::<T, v0::OldKitty>::drain() {
            log::info!(
                "current version is 0, will upgrade to v1,new Kitties id:{:?}",
                key
            );
            let new_kitty = Kitty {
                dna: value.0,
                price: 0,
            };
            Kitties::<T>::insert(key, new_kitty);
        }
        StorageVersion::new(1).put::<Pallet<T>>();
    }
    Weight::default()
}
