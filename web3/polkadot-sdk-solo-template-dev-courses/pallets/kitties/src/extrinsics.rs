use frame_support::pallet_macros::pallet_section;

/// Define all extrinsics for the pallet.
#[pallet_section]
mod dispatches {
    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(T::WeightInfo::create())]
        pub fn create(origin: OriginFor<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let value = Self::random_value(&who);
            let kitty_id = NextKittyId::<T>::get();
            let kitty = Kitty(value);
            Kitties::<T>::insert(kitty_id, kitty);
            let next_kitty_id = kitty_id.checked_add(1).ok_or(Error::<T>::KittyIdOverflow)?;
            NextKittyId::<T>::put(next_kitty_id);
            KittyOwner::<T>::insert(kitty_id, who.clone());
            Self::deposit_event(Event::KittyCreated {
                who: who,
                kitty_id,
                kitty: kitty.clone(),
            });
            Ok(())
        }

        #[pallet::call_index(1)]
        #[pallet::weight(T::WeightInfo::breed())]
        pub fn breed(
            origin: OriginFor<T>,
            kitty_id1: KittyId,
            kitty_id2: KittyId,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(kitty_id1 != kitty_id2, Error::<T>::SameKittyId);
            let kitty_id = Self::get_next_id()?;
            let kitty1 = Kitties::<T>::get(kitty_id1).ok_or(Error::<T>::InvalidKittyId)?;
            let kitty2 = Kitties::<T>::get(kitty_id2).ok_or(Error::<T>::InvalidKittyId)?;
            let selector = Self::random_value(&who);
            let mut dna = [0u8; 16];
            for (i, v) in selector.into_iter().enumerate() {
                dna[i] = kitty1.0[i] & v | kitty2.0[i] & v;
            }
            let kitty = Kitty(dna);

            Kitties::<T>::insert(kitty_id, &kitty);
            KittyOwner::<T>::insert(kitty_id, &who);

            Self::deposit_event(Event::KittyBreed {
                who: who,
                kitty_id,
                kitty: kitty.clone(),
            });
            Ok(())
        }

        #[pallet::call_index(2)]
        #[pallet::weight(T::WeightInfo::transfer())]
        pub fn transfer(
            origin: OriginFor<T>,
            recipient: T::AccountId,
            kitty_id: KittyId,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let owner = KittyOwner::<T>::get(kitty_id).ok_or(Error::<T>::InvalidKittyId)?;
            ensure!(owner == who, Error::<T>::NotOwner);

            KittyOwner::<T>::insert(kitty_id, &recipient);

            Self::deposit_event(Event::KittyTransfer {
                from: who,
                to: recipient,
                kitty_id,
            });
            Ok(())
        }

        #[pallet::call_index(3)]
        #[pallet::weight(T::WeightInfo::sale())]
        pub fn sale(
            origin: OriginFor<T>,
            kitty_id: KittyId,
            until_block: BlockNumberFor<T>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let owner = KittyOwner::<T>::get(kitty_id).ok_or(Error::<T>::InvalidKittyId)?;
            ensure!(owner == who, Error::<T>::NotOwner);
            KittiesOnSale::<T>::insert(kitty_id, until_block);
            Self::deposit_event(Event::KittyOnSale {
                who,
                kitty_id,
                until_block,
            });
            Ok(())
        }

        #[pallet::call_index(4)]
        #[pallet::weight(T::WeightInfo::bid())]
        pub fn bid(origin: OriginFor<T>, kitty_id: KittyId, price: BalanceOf<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;
            T::Currency::reserve(&who, price)?;
            KittiesBid::<T>::mutate(kitty_id, |bids| match bids {
                Some(bids) => {
                    bids.push((who.clone(), price));
                }
                None => {
                    *bids = Some(vec![(who.clone(), price)]);
                }
            });
            Self::deposit_event(Event::KittyBid {
                who,
                kitty_id,
                price,
                block_number: frame_system::Pallet::<T>::block_number(),
                cents: (TryInto::<Price>::try_into(price).ok().unwrap_or(0) * Prices::<T>::get()),
            });
            Ok(())
        }
    }
}
