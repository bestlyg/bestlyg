use frame_support::pallet_macros::pallet_section;

/// Define all events used in the pallet.
#[pallet_section]
mod events {
    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        KittyCreated {
            creator: T::AccountId,
            kitty_id: KittyId,
            kitty: Kitty,
        },
		KittyBreed { creator: T::AccountId, kitty_id: KittyId, kitty: Kitty },
    }
}
