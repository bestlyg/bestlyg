use crate as pallet_kitties;
use frame_support::traits::Hooks;
use frame_support::{
    derive_impl,
    traits::{ConstU128, ConstU32},
    weights::Weight,
};
use sp_core::{
    offchain::{testing, OffchainWorkerExt, TransactionPoolExt},
    sr25519::Signature,
    H256,
};
use sp_runtime::BuildStorage;
use sp_runtime::{
    testing::TestXt,
    traits::{BlakeTwo256, Extrinsic as ExtrinsicT, IdentifyAccount, IdentityLookup, Verify},
    RuntimeAppPublic,
};
type Extrinsic = TestXt<RuntimeCall, ()>;
type Balance = u128;
type Block = frame_system::mocking::MockBlock<Test>;
type AccountId = <<Signature as Verify>::Signer as IdentifyAccount>::AccountId;

// impl frame_system::offchain::SigningTypes for Test {
//     type Public = <Signature as Verify>::Signer;
//     type Signature = Signature;
// }

// impl<LocalCall> frame_system::offchain::SendTransactionTypes<LocalCall> for Test
// where
//     RuntimeCall: From<LocalCall>,
// {
//     type OverarchingCall = RuntimeCall;
//     type Extrinsic = Extrinsic;
// }

// impl<LocalCall> frame_system::offchain::CreateSignedTransaction<LocalCall> for Test
// where
//     RuntimeCall: From<LocalCall>,
// {
//     fn create_transaction<C: frame_system::offchain::AppCrypto<Self::Public, Self::Signature>>(
//         call: RuntimeCall,
//         _public: <Signature as Verify>::Signer,
//         _account: AccountId,
//         nonce: u64,
//     ) -> Option<(RuntimeCall, <Extrinsic as ExtrinsicT>::SignaturePayload)> {
//         Some((call, (nonce, ())))
//     }
// }

// Configure a mock runtime to test the pallet.
frame_support::construct_runtime!(
    pub enum Test
    {
        System: frame_system,
        Balances: pallet_balances,
        Kitties: pallet_kitties,
        Random: pallet_insecure_randomness_collective_flip,
    }
);

#[derive_impl(frame_system::config_preludes::TestDefaultConfig)]
impl frame_system::Config for Test {
    type Block = Block;
    type AccountData = pallet_balances::AccountData<Balance>;
}

impl pallet_kitties::Config for Test {
    type RuntimeEvent = RuntimeEvent;
    type WeightInfo = ();
    type Randomness = Random;
    type Currency = Balances;
    type KittyPrice = ConstU128<200>;
    type MaxPrices = ConstU32<1000>;
}

impl pallet_insecure_randomness_collective_flip::Config for Test {}

#[derive_impl(pallet_balances::config_preludes::TestDefaultConfig)]
impl pallet_balances::Config for Test {
    type Balance = Balance;
    type ExistentialDeposit = ConstU128<500>;
    type AccountStore = System;
}

// Build genesis storage according to the mock runtime.
pub fn new_test_ext() -> sp_io::TestExternalities {
    sp_tracing::try_init_simple();
    let mut ext: sp_io::TestExternalities = frame_system::GenesisConfig::<Test>::default()
        .build_storage()
        .unwrap()
        .into();
    ext.execute_with(|| {
        let _ = Balances::force_set_balance(RuntimeOrigin::root(), 1, 999_999_999);
        let _ = Balances::force_set_balance(RuntimeOrigin::root(), 2, 999_999_999);
        let _ = Balances::force_set_balance(RuntimeOrigin::root(), 3, 999_999_999);
        System::set_block_number(1);
    });
    ext
}

pub fn run_to_block(n: u64) {
    while System::block_number() < n {
        log::info!("current block: {:?}", System::block_number());
        Kitties::on_finalize(System::block_number());
        System::on_finalize(System::block_number());
        System::set_block_number(System::block_number() + 1);
        System::on_initialize(System::block_number());
        Kitties::on_initialize(System::block_number());
        Kitties::on_idle(System::block_number(), Weight::default());
    }
}
