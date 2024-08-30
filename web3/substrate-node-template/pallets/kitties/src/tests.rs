use crate::{mock::*, Error};
use frame_support::{assert_noop, assert_ok};

#[test]
fn it_works() {
	new_test_ext().execute_with(|| assert_eq!(true, true));
}

#[test]
fn it_works_for_create() {
	new_test_ext().execute_with(|| {
		let kitty_id = 0;
		let account_id = 1;

		assert_eq!(KittiesModule::next_kitty_id(), kitty_id);
		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"test1234"));
		assert_eq!(KittiesModule::kitties(&kitty_id).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id,
				kitty: KittiesModule::kitties(kitty_id).unwrap(),
			}
			.into(),
		);
		assert_eq!(KittiesModule::next_kitty_id(), kitty_id + 1);
		assert_eq!(KittiesModule::kitties(&kitty_id).is_some(), true);
		assert_eq!(KittiesModule::kitty_owner(&kitty_id), Some(account_id));
		assert_eq!(KittiesModule::kitty_parents(&kitty_id), None);

		crate::NextKittyId::<Test>::set(crate::KittyId::MAX);
		assert_noop!(
			KittiesModule::create(RuntimeOrigin::signed(account_id), *b"test1234"),
			Error::<Test>::InvalidKittyId
		);
	});
}

#[test]
fn it_works_for_breed() {
	new_test_ext().execute_with(|| {
		let kitty_id = 0;
		let account_id = 1;
		assert_noop!(
			KittiesModule::breed(
				RuntimeOrigin::signed(account_id),
				kitty_id,
				kitty_id,
				*b"breed123"
			),
			Error::<Test>::SameKittyId
		);

		assert_noop!(
			KittiesModule::breed(
				RuntimeOrigin::signed(account_id),
				kitty_id,
				kitty_id + 1,
				*b"breed123"
			),
			Error::<Test>::InvalidKittyId
		);

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"breed-p1"));
		assert_eq!(KittiesModule::kitties(kitty_id).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id,
				kitty: KittiesModule::kitties(kitty_id).unwrap(),
			}
			.into(),
		);
		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"breed-p2"));
		assert_eq!(KittiesModule::kitties(kitty_id + 1).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id: kitty_id + 1,
				kitty: KittiesModule::kitties(kitty_id + 1).unwrap(),
			}
			.into(),
		);
		assert_eq!(KittiesModule::next_kitty_id(), kitty_id + 2);
		assert_ok!(KittiesModule::breed(
			RuntimeOrigin::signed(account_id),
			kitty_id,
			kitty_id + 1,
			*b"child000"
		));
		assert_eq!(KittiesModule::kitties(kitty_id + 2).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyBreed {
				who: account_id,
				kitty_id: kitty_id + 2,
				kitty: KittiesModule::kitties(kitty_id + 2).unwrap(),
			}
			.into(),
		);
		let breed_kitty_id = 2;
		assert_eq!(KittiesModule::next_kitty_id(), breed_kitty_id + 1);
		assert_eq!(KittiesModule::kitties(breed_kitty_id).is_some(), true);
		assert_eq!(KittiesModule::kitty_owner(breed_kitty_id), Some(account_id));
		assert_eq!(KittiesModule::kitty_parents(breed_kitty_id), Some((kitty_id, kitty_id + 1)));
	})
}

#[test]
fn it_works_for_transfer() {
	new_test_ext().execute_with(|| {
		let kitty_id = 0;
		let account_id = 1;
		let recipient = 2;

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"kitty-k1"));
		assert_eq!(KittiesModule::kitties(kitty_id).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id,
				kitty: KittiesModule::kitties(kitty_id).unwrap(),
			}
			.into(),
		);
		assert_eq!(KittiesModule::kitty_owner(&kitty_id), Some(account_id));

		assert_noop!(
			KittiesModule::transfer(RuntimeOrigin::signed(recipient), account_id, kitty_id),
			Error::<Test>::NotOwner
		);

		assert_ok!(KittiesModule::transfer(RuntimeOrigin::signed(account_id), recipient, kitty_id));
		assert_eq!(KittiesModule::kitty_owner(kitty_id), Some(recipient));
		System::assert_last_event(
			crate::Event::<Test>::KittyTransfer { from: account_id, kitty_id, to: recipient }
				.into(),
		);
		assert_ok!(KittiesModule::transfer(RuntimeOrigin::signed(recipient), account_id, kitty_id));
		assert_eq!(KittiesModule::kitty_owner(kitty_id), Some(account_id));
		System::assert_last_event(
			crate::Event::<Test>::KittyTransfer { from: recipient, kitty_id, to: account_id }
				.into(),
		);
	})
}

#[test]
fn it_works_for_sale() {
	new_test_ext().execute_with(|| {
		let kitty_id = 0;
		let account_id = 1;

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"kitty-k1"));
		assert_eq!(KittiesModule::kitties(kitty_id).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id,
				kitty: KittiesModule::kitties(kitty_id).unwrap(),
			}
			.into(),
		);
		assert_noop!(
			KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id + 1),
			Error::<Test>::InvalidKittyId
		);

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id + 1), *b"kitty-k2"));
		assert_eq!(KittiesModule::kitties(kitty_id + 1).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id + 1,
				kitty_id: kitty_id + 1,
				kitty: KittiesModule::kitties(kitty_id + 1).unwrap(),
			}
			.into(),
		);
		assert_noop!(
			KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id + 1),
			Error::<Test>::NotOwner
		);

		assert_ok!(KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id));
		System::assert_last_event(
			crate::Event::<Test>::KittyOnSale { who: account_id, kitty_id }.into(),
		);

		assert_noop!(
			KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id),
			Error::<Test>::AlreadyOnSale
		);
	})
}

#[test]
fn it_works_for_buy() {
	new_test_ext().execute_with(|| {
		let kitty_id = 0;
		let account_id = 1;

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id), *b"kitty-k1"));
		assert_eq!(KittiesModule::kitties(kitty_id).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id,
				kitty_id,
				kitty: KittiesModule::kitties(kitty_id).unwrap(),
			}
			.into(),
		);
		assert_noop!(
			KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id + 1),
			Error::<Test>::InvalidKittyId
		);

		assert_ok!(KittiesModule::sale(RuntimeOrigin::signed(account_id), kitty_id));
		System::assert_last_event(
			crate::Event::<Test>::KittyOnSale { who: account_id, kitty_id }.into(),
		);

		assert_ok!(KittiesModule::create(RuntimeOrigin::signed(account_id + 1), *b"kitty-k2"));
		assert_eq!(KittiesModule::kitties(kitty_id + 1).is_some(), true);
		System::assert_last_event(
			crate::Event::<Test>::KittyCreated {
				who: account_id + 1,
				kitty_id: kitty_id + 1,
				kitty: KittiesModule::kitties(kitty_id + 1).unwrap(),
			}
			.into(),
		);

		assert_noop!(
			KittiesModule::buy(RuntimeOrigin::signed(account_id), kitty_id),
			Error::<Test>::AlreadyOwned
		);
		assert_noop!(
			KittiesModule::buy(RuntimeOrigin::signed(account_id), kitty_id + 1),
			Error::<Test>::NotOnSale
		);

		assert_ok!(KittiesModule::sale(RuntimeOrigin::signed(account_id + 1), kitty_id + 1));
		System::assert_last_event(
			crate::Event::<Test>::KittyOnSale { who: account_id + 1, kitty_id: kitty_id + 1 }
				.into(),
		);

		assert_ok!(KittiesModule::buy(RuntimeOrigin::signed(account_id + 1), kitty_id));
		assert_eq!(KittiesModule::kitty_on_sale(kitty_id).is_none(), true);
		assert_eq!(KittiesModule::kitty_owner(kitty_id), Some(account_id + 1));
		System::assert_last_event(
			crate::Event::<Test>::KittyBought { who: account_id + 1, kitty_id }.into(),
		);
	});
}
