use frame_support::pallet_macros::pallet_section;

/// Define all extrinsics for the pallet.
#[pallet_section]
mod dispatches {
    #[pallet::call]
    impl<T: Config> Pallet<T> {
        pub fn create(origin: OriginFor<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let _value = Self::random_value(&who);

            Ok(())
        }

        pub fn breed(origin: OriginFor<T>, kitty_1: u32, kitty_2: u32) -> DispatchResult {
            let _who = ensure_signed(origin)?;
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
