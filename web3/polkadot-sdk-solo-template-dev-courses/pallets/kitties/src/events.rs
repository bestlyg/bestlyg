use frame_support::pallet_macros::pallet_section;

/// Define all events used in the pallet.
#[pallet_section]
mod events {
    #[pallet::event]
    pub enum Event<T: Config> {
        KittyCreated {
            creator: T::AccountId,
            index: u64,
            data: [u8; 16],
        },
    }
}
