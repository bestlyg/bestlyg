use frame_support::pallet_macros::pallet_section;

/// Define all hooks used in the pallet.
#[pallet_section]
mod hooks {
    use crate::migration::migrate_to_v1;
    use frame_support::sp_runtime::traits::Bounded;
    use frame_support::traits::ExistenceRequirement;
    #[pallet::hooks]
    impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {
        fn on_runtime_upgrade() -> Weight {
            //Weight::default()
            migrate_to_v1::<T>()
        }

        fn on_initialize(n: BlockNumberFor<T>) -> Weight {
            log::info!("Kitties on_initialize at block {:?}", n);
            KittiesOnSale::<T>::iter().for_each(|(kitty_id, until_block)| {
                if until_block == n {
                    let owner = KittyOwner::<T>::get(kitty_id).expect("");
                    if let Some(bids) = KittiesBid::<T>::take(kitty_id) {
                        let mut new_owner = None;
                        let mut final_price = BalanceOf::<T>::min_value();

                        for bid in bids.iter() {
                            T::Currency::unreserve(&bid.0, bid.1);

                            if bid.1 > final_price {
                                final_price = bid.1;
                                new_owner = Some(bid.0.clone())
                            }
                        }
                        if final_price != BalanceOf::<T>::min_value() {
                            T::Currency::transfer(
                                &new_owner.clone().unwrap(),
                                &owner,
                                final_price,
                                ExistenceRequirement::KeepAlive,
                            )
                            .expect("");

                            KittyOwner::<T>::insert(kitty_id, new_owner.unwrap());
                            Kitties::<T>::mutate(&kitty_id, |kitty| match kitty {
                                Some(kitty) => {
                                    kitty.price =
                                        (TryInto::<Price>::try_into(final_price).ok().unwrap_or(0)
                                            * Prices::<T>::get());
                                }
                                None => {}
                            });

                            KittiesOnSale::<T>::remove(kitty_id);
                            KittiesBid::<T>::remove(kitty_id);
                        }
                    }
                }
            });
            Weight::default()
        }

        fn on_poll(n: BlockNumberFor<T>, _remaining_weight: &mut WeightMeter) {
            log::info!("Kitties on_poll at block {:?}", n);
        }

        fn on_finalize(n: BlockNumberFor<T>) {
            // remove the kitty on sale if no bid and the block number is greater than the until_block.
            // sale the kitty if according to bid price
            log::info!("Kitties on_finalize at block {:?}", n);
        }

        fn on_idle(n: BlockNumberFor<T>, _remaining_weight: Weight) -> Weight {
            log::info!("Kitties on_idle at block {:?}", n);
            Weight::default()
        }

        fn integrity_test() {
            assert!(NextKittyId::<T>::get() == 0);
        }

        fn offchain_worker(block_number: BlockNumberFor<T>) {
            log::info!("Kitties offchain_worker at block {:?}", block_number);
            let parent_hash = <frame_system::Pallet<T>>::block_hash(block_number - 1u32.into());
            log::debug!(
                "Current block: {:?} (parent hash: {:?})",
                block_number,
                parent_hash
            );
            let price = Self::fetch_price();
            match price {
                Err(err) => {
                    log::info!("Fetch price err: {:?}", err);
                }
                Ok(price) => {
                    log::info!(
                        "Current price: {:?}, max = {:?}",
                        price,
                        T::MaxPrices::get()
                    );
                    // <Prices<T>>::mutate(|cur| *cur = price.min(T::MaxPrices::get()));
                    // log::info!(
                    //     "Current price: {:?}, max = {:?}, cur = {:?}",
                    //     price,
                    //     T::MaxPrices::get(),
                    //     <Prices<T>>::get()
                    // );
                    // Self::deposit_event(Event::NewPrice { price });
                }
            }
        }

        // #[cfg(feature = "try-runtime")]
        // fn pre_upgrade() -> Result<Vec<u8>, TryRuntimeError> {
        //     unimplemented!()
        // }

        // #[cfg(feature = "try-runtime")]
        // fn post_upgrade(_state: Vec<u8>) -> Result<(), TryRuntimeError> {
        //     unimplemented!()
        // }

        // #[cfg(feature = "try-runtime")]
        // fn try_state(_n: BlockNumberFor<T>) -> Result<(), TryRuntimeError> {
        //     unimplemented!()
        // }
    }
}
