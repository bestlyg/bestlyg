use frame_support::pallet_macros::pallet_section;

/// Define all events used in the pallet.
#[pallet_section]
mod events {
    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        KittyCreated {
            who: T::AccountId,
            kitty_id: KittyId,
            kitty: Kitty,
        },
        KittyBreed {
            who: T::AccountId,
            kitty_id: KittyId,
            kitty: Kitty,
        },
        KittyTransfer {
            from: T::AccountId,
            kitty_id: KittyId,
            to: T::AccountId,
        },
        KittyOnSale {
            who: T::AccountId,
            kitty_id: KittyId,
            until_block: BlockNumberFor<T>,
        },
        KittyBid {
            who: T::AccountId,
            kitty_id: KittyId,
            block_number: BlockNumberFor<T>,
            price: BalanceOf<T>,
            cents: Price,
        },
        NewPrice {
            price: Price,
        },
    }
}
