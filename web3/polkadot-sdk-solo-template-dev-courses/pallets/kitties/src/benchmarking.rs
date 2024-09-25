//! Benchmarking setup for pallet-template
#![cfg(feature = "runtime-benchmarks")]
use super::*;

#[allow(unused)]
use crate::Pallet as Template;
use frame_benchmarking::v2::*;
use frame_system::RawOrigin;

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
}

// cargo build --profile=production --features runtime-benchmarks
// ./target/production/solochain-template-node benchmark pallet \
// --chain dev \
// --execution=wasm \
// --wasm-execution=compiled \
// --pallet pallet_kitties \
// --extrinsic "*" \
// --steps 20 \
// --repeat 10 \
// --output pallets/kitties/src/weights.rs \
// --template .maintain/frame-weight-template.hbs
