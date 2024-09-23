use frame_support::pallet_macros::pallet_section;

/// Define the implementation of the pallet, like helper functions.
#[pallet_section]
mod impls {
    impl<T: Config> Pallet<T> {
        // get a random 256.
        // fn random_value(who: &T::AccountId) -> [u8; 16] {
        //     let nonce = frame_system::Pallet::<T>::account_nonce(&who);
        //     // let nonce_u32: u32 = nonce as u32;
        //     // generate a random value based on account and its nonce
        //     let nonce_u32: u32 = TryInto::try_into(nonce).ok().expect("nonce is u64; qed");
        //     let a: BlockNumberFor<T> = TryFrom::try_from(nonce_u32)
        //         .ok()
        //         .expect("nonce is u32; qed");
        //     payload.using_encoded(blake2_128)
        //     // [0_u8; 16]
        // }
        fn random_value(who: &T::AccountId) -> [u8; 16] {
            let nonce = frame_system::Pallet::<T>::account_nonce(&who);
            // let nonce_u32: u32 = nonce as u32;
            // generate a random value based on account and its nonce
            let nonce_u32: u32 = TryInto::try_into(nonce).ok().expect("nonce is u64; qed");
            let a: BlockNumberFor<T> = TryFrom::try_from(nonce_u32)
                .ok()
                .expect("nonce is u32; qed");
            let payload = (
                T::Randomness::random_seed(),
                &a,
                <frame_system::Pallet<T>>::extrinsic_index(),
            );
            payload.using_encoded(blake2_128)
        }

        fn get_next_id() -> Result<KittyId, DispatchError> {
            NextKittyId::<T>::try_mutate(|next_id| -> Result<KittyId, DispatchError> {
                let current_id = *next_id;
                *next_id = next_id
                    .checked_add(1)
                    .ok_or::<DispatchError>(Error::<T>::InvalidKittyId.into())?;
                Ok(current_id)
            })
        }
    }
}
