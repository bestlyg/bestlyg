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

        pub fn breed(origin: OriginFor<T>, kitty_id1: u32, kitty_id2: u32) -> DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(kitty_id1 != kitty_id2, Error::<T>::SameKittyId);

            ensure!(
                Kitties::<T>::contains_key(&kitty_id1),
                Error::<T>::InvalidKittyId
            );
            ensure!(
                Kitties::<T>::contains_key(&kitty_id2),
                Error::<T>::InvalidKittyId
            );

            let kitty_id = Self::get_next_id()?;
            let kitty1 = Kitties::<T>::get(kitty_id1).ok_or(Error::<T>::InvalidKittyId)?;
            let kitty2 = Kitties::<T>::get(kitty_id2).ok_or(Error::<T>::InvalidKittyId)?;

            let selector = Self::random_value(&who);
            let mut dna = [0u8; 16];
            for (i, v) in selector.into_iter().enumerate() {
                dna[i] = kitty1.dna[i] & v | kitty2.dna[i] & v;
            }
            // let kitty = Kitty(data);
            let kitty = Kitty { dna, name };

            let price = T::KittyPrice::get();
            // T::Currency::reserve(&who, price)?;
            T::Currency::transfer(
                &who,
                &Self::get_account_id(),
                price,
                ExistenceRequirement::KeepAlive,
            )?;

            Kitties::<T>::insert(kitty_id, &kitty);
            KittyOwner::<T>::insert(kitty_id, &who);
            KittyParents::<T>::insert(kitty_id, (kitty_id1, kitty_id2));

            Self::deposit_event(Event::KittyBreed {
                who,
                kitty_id,
                kitty,
            });
            Ok(())
        }

        pub fn transfer(origin: OriginFor<T>, kitty_id: u32) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }

        pub fn sale(
            origin: OriginFor<T>,
            kitty_id: u32,
            until_block: BlockNumberFor<T>,
        ) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }

        pub fn bid(origin: OriginFor<T>, kitty_id: u32, price: u64) -> DispatchResult {
            let _who = ensure_signed(origin)?;
            Ok(())
        }
    }
}
