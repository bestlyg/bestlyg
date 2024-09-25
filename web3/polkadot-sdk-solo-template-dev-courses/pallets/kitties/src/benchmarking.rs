//! Benchmarking setup for pallet-template
//! ```
//! cargo build --profile=production --features runtime-benchmarks
//! ./target/production/solochain-template-node benchmark pallet \
//! --chain dev \
//! --execution=wasm \
//! --wasm-execution=compiled \
//! --pallet pallet_kitties \
//! --extrinsic "*" \
//! --steps 20 \
//! --repeat 10 \
//! --output pallets/kitties/src/weights.rs \
//! --template .maintain/frame-weight-template.hbs
//! ```

#![cfg(feature = "runtime-benchmarks")]
use super::*;
#[allow(unused)]
use crate::Pallet as PalletKitties;
use frame_benchmarking::v2::*;
// use frame_support::{assert_ok, pallet_prelude::*};
use frame_support::traits::Currency;
use frame_system::RawOrigin;

fn create_funded_user<T: Config>(
    string: &'static str,
    n: u32,
    balance_factor: u32,
) -> T::AccountId {
    let user = account(string, n, 0);
    let balance = T::Currency::minimum_balance() * balance_factor.into();
    let _ = T::Currency::make_free_balance_be(&user, balance);
    user
}

#[benchmarks]
mod benchmarks {
    use super::*;

    #[benchmark]
    fn create() -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();

        #[extrinsic_call]
        create(RawOrigin::Signed(caller.clone()));

        assert!(Kitties::<T>::get(&0).is_some());

        Ok(())
    }

    #[benchmark]
    fn breed() -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let _ = Pallet::<T>::create(RawOrigin::Signed(caller.clone()).into());
        let _ = Pallet::<T>::create(RawOrigin::Signed(caller.clone()).into());
        #[extrinsic_call]
        breed(RawOrigin::Signed(caller.clone()), 0, 1);
        assert!(Kitties::<T>::get(&2).is_some());
        Ok(())
    }

    #[benchmark]
    fn transfer() -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let to = create_funded_user::<T>("to", 0, 1000);
        let _ = Pallet::<T>::create(RawOrigin::Signed(caller.clone()).into());
        #[extrinsic_call]
        transfer(RawOrigin::Signed(caller.clone()), to.clone(), 0);
        assert_eq!(KittyOwner::<T>::get(&0), Some(to.clone()));
        Ok(())
    }

    #[benchmark]
    fn sale() -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let _ = Pallet::<T>::create(RawOrigin::Signed(caller.clone()).into());
        #[extrinsic_call]
        sale(RawOrigin::Signed(caller.clone()), 0, 10u32.into());
        assert_eq!(KittiesOnSale::<T>::get(&0), Some(10u32.into()));
        Ok(())
    }

    #[benchmark]
    fn bid() -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let bidder = create_funded_user::<T>("bidder", 0, 1000);
        let _ = Pallet::<T>::create(RawOrigin::Signed(caller.clone()).into());
        let _ = Pallet::<T>::sale(RawOrigin::Signed(caller.clone()).into(), 0, 10u32.into());
        #[extrinsic_call]
        bid(RawOrigin::Signed(bidder.clone()), 0, 500u32.into());
        let arr = KittiesBid::<T>::get(&0);
        assert!(arr.is_some());
        let arr = arr.unwrap();
        assert_eq!(arr[0], (bidder.clone(), 500u32.into()));
        Ok(())
    }
}
