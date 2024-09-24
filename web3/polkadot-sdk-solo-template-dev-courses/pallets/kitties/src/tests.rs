use crate::{mock::*, Error, Event, NextKittyId};
use frame_support::{assert_noop, assert_ok};

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
        let caller = RuntimeOrigin::signed(alice);
        assert_ok!(Kitties::create(caller));
        System::assert_has_event(
            Event::KittyCreated {
                creator: alice,
                kitty_id: 0,
                kitty: crate::Kitties::<Test>::get(0).unwrap().clone(),
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
        let caller = RuntimeOrigin::signed(alice);
        NextKittyId::<Test>::put(u32::MAX);
        assert_noop!(Kitties::create(caller), Error::<Test>::KittyIdOverflow);
    });
}

#[test]
fn it_kitty_breed() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_ok!(Kitties::create(caller.clone()));
        assert_ok!(Kitties::create(caller.clone()));
        assert_ok!(Kitties::breed(caller.clone(), 0, 1));
        System::assert_has_event(
            Event::KittyBreed {
                creator: alice,
                kitty_id: 2,
                kitty: crate::Kitties::<Test>::get(2).unwrap().clone(),
            }
            .into(),
        );
    })
}

#[test]
fn it_kitty_breed_same_kitty() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_noop!(
            Kitties::breed(caller.clone(), 0, 0),
            Error::<Test>::SameKittyId
        );
    })
}

#[test]
fn it_kitty_breed_invalid_kitty() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_noop!(
            Kitties::breed(caller.clone(), 0, 1),
            Error::<Test>::InvalidKittyId
        );
    })
}

#[test]
fn it_kitty_transfer() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_ok!(Kitties::create(caller.clone()));
        assert_ok!(Kitties::transfer(caller.clone(), 1, 0));
        let kitty = crate::KittyOwner::<Test>::get(&0).unwrap();
        assert_eq!(kitty, 1);
        System::assert_has_event(
            Event::KittyTransfer {
                from: 0,
                to: 1,
                kitty_id: 0,
            }
            .into(),
        );
    })
}

#[test]
fn it_kitty_transfer_invalid_kitty() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_noop!(
            Kitties::transfer(caller.clone(), 1, 0),
            Error::<Test>::InvalidKittyId
        );
    })
}

#[test]
fn it_kitty_transfer_not_owner() {
    new_test_ext().execute_with(|| {
        run_to_block(1);
        let alice = 0;
        let caller = RuntimeOrigin::signed(alice);
        assert_ok!(Kitties::create(caller.clone()));
        assert_ok!(Kitties::create(caller.clone()));
        assert_noop!(
            Kitties::transfer(RuntimeOrigin::signed(1), 1, 0),
            Error::<Test>::NotOwner
        );
    })
}
