use frame_support::{
	migration::storage_key_iter, pallet_prelude::*, storage::StoragePrefixedMap,
	traits::GetStorageVersion, weights::Weight, Blake2_128Concat,
};
use crate::{Config, Kitties, Kitty, KittyId, Pallet};

#[derive(
	Encode, Decode, Clone, Copy, RuntimeDebug, Eq, PartialEq, Default, TypeInfo, MaxEncodedLen,
)]
pub struct OldKitty{
	pub dna: [u8; 16],
	pub name: [u8; 4],
}


pub fn migrate<T: Config>() -> Weight {
	let on_chain_version = <Pallet<T>>::on_chain_storage_version();
	let current_versoin = <Pallet<T>>::current_storage_version();

	if on_chain_version != 1 {
		return Weight::zero();
	}

	if current_versoin != 2 {
		return Weight::zero();
	}

	let module = Kitties::<T>::module_prefix();
	let item = Kitties::<T>::storage_prefix();

	for (index, kitty) in
		storage_key_iter::<KittyId, OldKitty, Blake2_128Concat>(module, item).drain()
	{
		let new_kitty = Kitty { dna: kitty.dna, name: *b"abcdefch" };
		Kitties::<T>::insert(index, &new_kitty);
	}
	Weight::zero()
}
