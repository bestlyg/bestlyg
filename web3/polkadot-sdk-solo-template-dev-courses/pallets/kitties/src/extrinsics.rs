use frame_support::pallet_macros::pallet_section;

/// Define all extrinsics for the pallet.
#[pallet_section]
mod dispatches {
    #[pallet::call]
    impl<T: Config> Pallet<T> {
        pub fn create(origin: OriginFor<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let value = Self::random_value(&who);
            let kitty_id = NextKittyId::<T>::get();
            Kitties::<T>::insert(kitty_id, Kitty(value));
            let next_kitty_id = kitty_id.checked_add(1).ok_or(Error::<T>::KittyIdOverflow)?;
            NextKittyId::<T>::put(next_kitty_id);
            Self::deposit_event(Event::KittyCreated {
                creator: who,
                index: kitty_id,
                data: value,
            });
            Ok(())
        }

        pub fn breed(origin: OriginFor<T>, kitty_1: KittyId, kitty_2: KittyId) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }

        pub fn transfer(origin: OriginFor<T>, kitty_id: KittyId) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }

        pub fn sale(
            origin: OriginFor<T>,
            kitty_id: KittyId,
            until_block: BlockNumberFor<T>,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }

        pub fn bid(origin: OriginFor<T>, kitty_id: KittyId, price: u64) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }
    }
}
