use crate::{mock::*, Error, Event, NextKittyId};
use frame_support::{assert_noop, assert_ok};
use frame_system::Config;

#[test]
fn it_works_for_default_value() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        run_to_block(2);
    });
}

#[test]
fn it_works_create_kitty() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = <<Test as Config>::RuntimeOrigin>::signed(alice);
        assert_ok!(Kitties::create(caller));
        System::assert_has_event(
            Event::KittyCreated {
                creator: alice,
                index: 0,
                data: [0u8; 16],
            }
            .into(),
        );
    });
}

#[test]
fn it_kitty_id_overflow() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = <<Test as Config>::RuntimeOrigin>::signed(alice);
        NextKittyId::<Test>::put(u32::MAX);
        assert_noop!(Kitties::create(caller), Error::<Test>::KittyIdOverflow);
    });
}

// #[test]
// fn it_kitty_