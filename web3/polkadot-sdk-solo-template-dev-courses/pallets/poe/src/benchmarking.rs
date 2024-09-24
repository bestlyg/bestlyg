#![cfg(feature = "runtime-benchmarks")]

use super::*;

use frame_benchmarking::v2::*;
use frame_support::{pallet_prelude::Get, BoundedVec};
use frame_system::RawOrigin;
use sp_std::vec;

#[benchmarks]
mod benches {
    use super::*;

    #[benchmark]
    fn create_claim(b: Linear<1, { T::MaxClaimLength::get() }>) -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let claim = BoundedVec::try_from(vec![0; b as usize]).unwrap();

        #[extrinsic_call]
        create_claim(RawOrigin::Signed(caller.clone()), claim.clone());

        assert_eq!(
            Proofs::<T>::get(&claim),
            Some((caller, frame_system::Pallet::<T>::block_number()))
        );

        Ok(())
    }

    #[benchmark]
    fn revoke_claim(b: Linear<1, { T::MaxClaimLength::get() }>) -> Result<(), BenchmarkError> {
        let caller: T::AccountId = whitelisted_caller();
        let claim = BoundedVec::try_from(vec![0; b as usize]).unwrap();

        let _ = Pallet::<T>::create_claim(RawOrigin::Signed(caller.clone()).into(), claim.clone())?;

        assert_eq!(
            Proofs::<T>::get(&claim),
            Some((caller.clone(), frame_system::Pallet::<T>::block_number()))
        );

        #[extrinsic_call]
        revoke_claim(RawOrigin::Signed(caller.clone()), claim.clone());

        assert!(Proofs::<T>::get(&claim).is_none());

        Ok(())
    }

    #[benchmark]
    fn transfer_claim(b: Linear<1, { T::MaxClaimLength::get() }>) -> Result<(), BenchmarkError> {
        let claim = BoundedVec::try_from(vec![0; b as usize]).unwrap();
        let caller: T::AccountId = whitelisted_caller();
        let target: T::AccountId = account("target", 0, 0);

        let _ = Pallet::<T>::create_claim(RawOrigin::Signed(caller.clone()).into(), claim.clone())?;

        assert_eq!(
            Proofs::<T>::get(&claim),
            Some((caller.clone(), frame_system::Pallet::<T>::block_number()))
        );

        #[extrinsic_call]
        transfer_claim(
            RawOrigin::Signed(caller.clone()),
            claim.clone(),
            target.clone(),
        );

        assert_eq!(
            Proofs::<T>::get(&claim),
            Some((target.clone(), frame_system::Pallet::<T>::block_number()))
        );

        Ok(())
    }
}

// cargo build --profile=production --features runtime-benchmarks
// ./target/production/solochain-template-node benchmark pallet \
// --chain dev \
// --execution=wasm \
// --wasm-execution=compiled \
// --pallet pallet_poe \
// --extrinsic "*" \
// --steps 20 \
// --repeat 10 \
// --output pallets/poe/src/weights.rs \
// --template .maintain/frame-weight-template.hbs
