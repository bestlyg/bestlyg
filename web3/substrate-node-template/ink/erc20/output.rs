#![feature(prelude_import)]
#[prelude_import]
use std::prelude::rust_2021::*;
#[macro_use]
extern crate std;
mod erc20 {
    impl ::ink::env::ContractEnv for Erc20 {
        type Env = ::ink::env::DefaultEnvironment;
    }
    type Environment = <Erc20 as ::ink::env::ContractEnv>::Env;
    type AccountId = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::AccountId;
    type Balance = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::Balance;
    type Hash = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::Hash;
    type Timestamp = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::Timestamp;
    type BlockNumber = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::BlockNumber;
    type ChainExtension = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::ChainExtension;
    const MAX_EVENT_TOPICS: usize = <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::MAX_EVENT_TOPICS;
    const _: () = {
        struct Check {
            salt: (),
            field_0: Balance,
            field_1: Mapping<AccountId, Balance>,
            field_2: Mapping<(AccountId, AccountId), Balance>,
        }
    };
    #[cfg(not(feature = "__ink_dylint_Storage"))]
    pub struct Erc20 {
        total_supply: <Balance as ::ink::storage::traits::AutoStorableHint<
            ::ink::storage::traits::ManualKey<375105693u32, ()>,
        >>::Type,
        balances: <Mapping<
            AccountId,
            Balance,
        > as ::ink::storage::traits::AutoStorableHint<
            ::ink::storage::traits::ManualKey<639884519u32, ()>,
        >>::Type,
        allowances: <Mapping<
            (AccountId, AccountId),
            Balance,
        > as ::ink::storage::traits::AutoStorableHint<
            ::ink::storage::traits::ManualKey<3969917367u32, ()>,
        >>::Type,
    }
    const _: () = {
        impl<
            __ink_generic_salt: ::ink::storage::traits::StorageKey,
        > ::ink::storage::traits::StorableHint<__ink_generic_salt> for Erc20 {
            type Type = Erc20;
            type PreferredKey = ::ink::storage::traits::AutoKey;
        }
    };
    const _: () = {
        impl ::ink::storage::traits::StorageKey for Erc20 {
            const KEY: ::ink::primitives::Key = <() as ::ink::storage::traits::StorageKey>::KEY;
        }
    };
    const _: () = {
        impl ::ink::storage::traits::Storable for Erc20 {
            #[inline(always)]
            #[allow(non_camel_case_types)]
            fn decode<__ink_I: ::scale::Input>(
                __input: &mut __ink_I,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                ::core::result::Result::Ok(Erc20 {
                    total_supply: <<Balance as ::ink::storage::traits::AutoStorableHint<
                        ::ink::storage::traits::ManualKey<375105693u32, ()>,
                    >>::Type as ::ink::storage::traits::Storable>::decode(__input)?,
                    balances: <<Mapping<
                        AccountId,
                        Balance,
                    > as ::ink::storage::traits::AutoStorableHint<
                        ::ink::storage::traits::ManualKey<639884519u32, ()>,
                    >>::Type as ::ink::storage::traits::Storable>::decode(__input)?,
                    allowances: <<Mapping<
                        (AccountId, AccountId),
                        Balance,
                    > as ::ink::storage::traits::AutoStorableHint<
                        ::ink::storage::traits::ManualKey<3969917367u32, ()>,
                    >>::Type as ::ink::storage::traits::Storable>::decode(__input)?,
                })
            }
            #[inline(always)]
            #[allow(non_camel_case_types)]
            fn encode<__ink_O: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __dest: &mut __ink_O,
            ) {
                match self {
                    Erc20 {
                        total_supply: __binding_0,
                        balances: __binding_1,
                        allowances: __binding_2,
                    } => {
                        {
                            ::ink::storage::traits::Storable::encode(
                                __binding_0,
                                __dest,
                            );
                        }
                        {
                            ::ink::storage::traits::Storable::encode(
                                __binding_1,
                                __dest,
                            );
                        }
                        {
                            ::ink::storage::traits::Storable::encode(
                                __binding_2,
                                __dest,
                            );
                        }
                    }
                }
            }
        }
    };
    #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
    const _: () = {
        impl ::scale_info::TypeInfo for Erc20 {
            type Identity = Self;
            fn type_info() -> ::scale_info::Type {
                ::scale_info::Type::builder()
                    .path(
                        ::scale_info::Path::new_with_replace(
                            "Erc20",
                            "erc20::erc20",
                            &[],
                        ),
                    )
                    .type_params(::alloc::vec::Vec::new())
                    .composite(
                        ::scale_info::build::Fields::named()
                            .field(|f| {
                                f
                                    .ty::<
                                        <Balance as ::ink::storage::traits::AutoStorableHint<
                                            ::ink::storage::traits::ManualKey<375105693u32, ()>,
                                        >>::Type,
                                    >()
                                    .name("total_supply")
                                    .type_name(
                                        "<Balance as::ink::storage::traits::AutoStorableHint<::ink::\nstorage::traits::ManualKey<375105693u32, ()>,>>::Type",
                                    )
                            })
                            .field(|f| {
                                f
                                    .ty::<
                                        <Mapping<
                                            AccountId,
                                            Balance,
                                        > as ::ink::storage::traits::AutoStorableHint<
                                            ::ink::storage::traits::ManualKey<639884519u32, ()>,
                                        >>::Type,
                                    >()
                                    .name("balances")
                                    .type_name(
                                        "<Mapping<AccountId, Balance> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<639884519u32, ()\n>,>>::Type",
                                    )
                            })
                            .field(|f| {
                                f
                                    .ty::<
                                        <Mapping<
                                            (AccountId, AccountId),
                                            Balance,
                                        > as ::ink::storage::traits::AutoStorableHint<
                                            ::ink::storage::traits::ManualKey<3969917367u32, ()>,
                                        >>::Type,
                                    >()
                                    .name("allowances")
                                    .type_name(
                                        "<Mapping<(AccountId, AccountId), Balance> as::ink::storage::traits\n::AutoStorableHint<::ink::storage::traits::ManualKey<\n3969917367u32, ()>,>>::Type",
                                    )
                            }),
                    )
            }
        }
    };
    const _: () = {
        impl ::ink::storage::traits::StorageLayout for Erc20 {
            fn layout(
                __key: &::ink::primitives::Key,
            ) -> ::ink::metadata::layout::Layout {
                ::ink::metadata::layout::Layout::Struct(
                    ::ink::metadata::layout::StructLayout::new(
                        "Erc20",
                        [
                            ::ink::metadata::layout::FieldLayout::new(
                                "total_supply",
                                <<Balance as ::ink::storage::traits::AutoStorableHint<
                                    ::ink::storage::traits::ManualKey<375105693u32, ()>,
                                >>::Type as ::ink::storage::traits::StorageLayout>::layout(
                                    __key,
                                ),
                            ),
                            ::ink::metadata::layout::FieldLayout::new(
                                "balances",
                                <<Mapping<
                                    AccountId,
                                    Balance,
                                > as ::ink::storage::traits::AutoStorableHint<
                                    ::ink::storage::traits::ManualKey<639884519u32, ()>,
                                >>::Type as ::ink::storage::traits::StorageLayout>::layout(
                                    __key,
                                ),
                            ),
                            ::ink::metadata::layout::FieldLayout::new(
                                "allowances",
                                <<Mapping<
                                    (AccountId, AccountId),
                                    Balance,
                                > as ::ink::storage::traits::AutoStorableHint<
                                    ::ink::storage::traits::ManualKey<3969917367u32, ()>,
                                >>::Type as ::ink::storage::traits::StorageLayout>::layout(
                                    __key,
                                ),
                            ),
                        ],
                    ),
                )
            }
        }
    };
    #[automatically_derived]
    impl ::core::default::Default for Erc20 {
        #[inline]
        fn default() -> Erc20 {
            Erc20 {
                total_supply: ::core::default::Default::default(),
                balances: ::core::default::Default::default(),
                allowances: ::core::default::Default::default(),
            }
        }
    }
    const _: () = {
        impl ::ink::reflect::ContractName for Erc20 {
            const NAME: &'static str = "Erc20";
        }
    };
    const _: () = {
        impl<'a> ::ink::codegen::Env for &'a Erc20 {
            type EnvAccess = ::ink::EnvAccess<
                'a,
                <Erc20 as ::ink::env::ContractEnv>::Env,
            >;
            fn env(self) -> Self::EnvAccess {
                <<Self as ::ink::codegen::Env>::EnvAccess as ::core::default::Default>::default()
            }
        }
        impl<'a> ::ink::codegen::StaticEnv for Erc20 {
            type EnvAccess = ::ink::EnvAccess<
                'static,
                <Erc20 as ::ink::env::ContractEnv>::Env,
            >;
            fn env() -> Self::EnvAccess {
                <<Self as ::ink::codegen::StaticEnv>::EnvAccess as ::core::default::Default>::default()
            }
        }
    };
    const _: () = {
        #[allow(unused_imports)]
        use ::ink::codegen::{Env as _, StaticEnv as _};
        use ::ink::codegen::EmitEvent as _;
    };
    const _: () = {
        impl<'a> ::ink::codegen::EmitEvent<Erc20> for ::ink::EnvAccess<'a, Environment> {
            fn emit_event<E>(self, event: E)
            where
                E: Into<<Erc20 as ::ink::reflect::ContractEventBase>::Type>,
            {
                ::ink::env::emit_event::<
                    Environment,
                    <Erc20 as ::ink::reflect::ContractEventBase>::Type,
                >(event.into());
            }
        }
    };
    #[allow(non_camel_case_types)]
    #[cfg(not(feature = "__ink_dylint_EventBase"))]
    pub enum __ink_EventBase {
        Transfer(Transfer),
        Approval(Approval),
    }
    #[allow(deprecated)]
    const _: () = {
        #[allow(non_camel_case_types)]
        #[automatically_derived]
        impl ::scale::Encode for __ink_EventBase {
            fn size_hint(&self) -> usize {
                1_usize
                    + match *self {
                        __ink_EventBase::Transfer(ref aa) => {
                            0_usize.saturating_add(::scale::Encode::size_hint(aa))
                        }
                        __ink_EventBase::Approval(ref aa) => {
                            0_usize.saturating_add(::scale::Encode::size_hint(aa))
                        }
                        _ => 0_usize,
                    }
            }
            fn encode_to<__CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __codec_dest_edqy: &mut __CodecOutputEdqy,
            ) {
                match *self {
                    __ink_EventBase::Transfer(ref aa) => {
                        __codec_dest_edqy.push_byte(0usize as ::core::primitive::u8);
                        ::scale::Encode::encode_to(aa, __codec_dest_edqy);
                    }
                    __ink_EventBase::Approval(ref aa) => {
                        __codec_dest_edqy.push_byte(1usize as ::core::primitive::u8);
                        ::scale::Encode::encode_to(aa, __codec_dest_edqy);
                    }
                    _ => {}
                }
            }
        }
        #[automatically_derived]
        impl ::scale::EncodeLike for __ink_EventBase {}
    };
    #[allow(deprecated)]
    const _: () = {
        #[allow(non_camel_case_types)]
        #[automatically_derived]
        impl ::scale::Decode for __ink_EventBase {
            fn decode<__CodecInputEdqy: ::scale::Input>(
                __codec_input_edqy: &mut __CodecInputEdqy,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                match __codec_input_edqy
                    .read_byte()
                    .map_err(|e| {
                        e
                            .chain(
                                "Could not decode `__ink_EventBase`, failed to read variant byte",
                            )
                    })?
                {
                    #[allow(clippy::unnecessary_cast)]
                    __codec_x_edqy if __codec_x_edqy
                        == 0usize as ::core::primitive::u8 => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Ok(
                                __ink_EventBase::Transfer({
                                    let __codec_res_edqy = <Transfer as ::scale::Decode>::decode(
                                        __codec_input_edqy,
                                    );
                                    match __codec_res_edqy {
                                        ::core::result::Result::Err(e) => {
                                            return ::core::result::Result::Err(
                                                e.chain("Could not decode `__ink_EventBase::Transfer.0`"),
                                            );
                                        }
                                        ::core::result::Result::Ok(__codec_res_edqy) => {
                                            __codec_res_edqy
                                        }
                                    }
                                }),
                            )
                        })();
                    }
                    #[allow(clippy::unnecessary_cast)]
                    __codec_x_edqy if __codec_x_edqy
                        == 1usize as ::core::primitive::u8 => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Ok(
                                __ink_EventBase::Approval({
                                    let __codec_res_edqy = <Approval as ::scale::Decode>::decode(
                                        __codec_input_edqy,
                                    );
                                    match __codec_res_edqy {
                                        ::core::result::Result::Err(e) => {
                                            return ::core::result::Result::Err(
                                                e.chain("Could not decode `__ink_EventBase::Approval.0`"),
                                            );
                                        }
                                        ::core::result::Result::Ok(__codec_res_edqy) => {
                                            __codec_res_edqy
                                        }
                                    }
                                }),
                            )
                        })();
                    }
                    _ => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Err(
                                <_ as ::core::convert::Into<
                                    _,
                                >>::into(
                                    "Could not decode `__ink_EventBase`, variant doesn't exist",
                                ),
                            )
                        })();
                    }
                }
            }
        }
    };
    const _: () = {
        impl ::ink::reflect::ContractEventBase for Erc20 {
            type Type = __ink_EventBase;
        }
    };
    const _: () = {
        impl From<Transfer> for __ink_EventBase {
            fn from(event: Transfer) -> Self {
                Self::Transfer(event)
            }
        }
    };
    const _: () = {
        impl From<Approval> for __ink_EventBase {
            fn from(event: Approval) -> Self {
                Self::Approval(event)
            }
        }
    };
    const _: () = {
        pub enum __ink_UndefinedAmountOfTopics {}
        impl ::ink::env::topics::EventTopicsAmount for __ink_UndefinedAmountOfTopics {
            const AMOUNT: usize = 0;
        }
        impl ::ink::env::Topics for __ink_EventBase {
            type RemainingTopics = __ink_UndefinedAmountOfTopics;
            fn topics<E, B>(
                &self,
                builder: ::ink::env::topics::TopicsBuilder<
                    ::ink::env::topics::state::Uninit,
                    E,
                    B,
                >,
            ) -> <B as ::ink::env::topics::TopicsBuilderBackend<E>>::Output
            where
                E: ::ink::env::Environment,
                B: ::ink::env::topics::TopicsBuilderBackend<E>,
            {
                match self {
                    Self::Transfer(event) => {
                        <Transfer as ::ink::env::Topics>::topics::<E, B>(event, builder)
                    }
                    Self::Approval(event) => {
                        <Approval as ::ink::env::Topics>::topics::<E, B>(event, builder)
                    }
                    _ => {
                        ::core::panicking::panic_fmt(
                            format_args!("Event does not exist!"),
                        );
                    }
                }
            }
        }
    };
    impl ::ink::codegen::EventLenTopics for Transfer {
        type LenTopics = ::ink::codegen::EventTopics<2usize>;
    }
    const _: () = ::ink::codegen::utils::consume_type::<
        ::ink::codegen::EventRespectsTopicLimit<
            Transfer,
            {
                <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::MAX_EVENT_TOPICS
            },
        >,
    >();
    impl ::ink::codegen::EventLenTopics for Approval {
        type LenTopics = ::ink::codegen::EventTopics<2usize>;
    }
    const _: () = ::ink::codegen::utils::consume_type::<
        ::ink::codegen::EventRespectsTopicLimit<
            Approval,
            {
                <<Erc20 as ::ink::env::ContractEnv>::Env as ::ink::env::Environment>::MAX_EVENT_TOPICS
            },
        >,
    >();
    pub struct Transfer {
        from: Option<AccountId>,
        to: Option<AccountId>,
        value: Balance,
    }
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Encode for Transfer {
            fn size_hint(&self) -> usize {
                0_usize
                    .saturating_add(::scale::Encode::size_hint(&self.from))
                    .saturating_add(::scale::Encode::size_hint(&self.to))
                    .saturating_add(::scale::Encode::size_hint(&self.value))
            }
            fn encode_to<__CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __codec_dest_edqy: &mut __CodecOutputEdqy,
            ) {
                ::scale::Encode::encode_to(&self.from, __codec_dest_edqy);
                ::scale::Encode::encode_to(&self.to, __codec_dest_edqy);
                ::scale::Encode::encode_to(&self.value, __codec_dest_edqy);
            }
        }
        #[automatically_derived]
        impl ::scale::EncodeLike for Transfer {}
    };
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Decode for Transfer {
            fn decode<__CodecInputEdqy: ::scale::Input>(
                __codec_input_edqy: &mut __CodecInputEdqy,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                ::core::result::Result::Ok(Transfer {
                    from: {
                        let __codec_res_edqy = <Option<
                            AccountId,
                        > as ::scale::Decode>::decode(__codec_input_edqy);
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Transfer::from`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                    to: {
                        let __codec_res_edqy = <Option<
                            AccountId,
                        > as ::scale::Decode>::decode(__codec_input_edqy);
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Transfer::to`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                    value: {
                        let __codec_res_edqy = <Balance as ::scale::Decode>::decode(
                            __codec_input_edqy,
                        );
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Transfer::value`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                })
            }
        }
    };
    pub struct Approval {
        from: AccountId,
        to: AccountId,
        value: Balance,
    }
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Encode for Approval {
            fn size_hint(&self) -> usize {
                0_usize
                    .saturating_add(::scale::Encode::size_hint(&self.from))
                    .saturating_add(::scale::Encode::size_hint(&self.to))
                    .saturating_add(::scale::Encode::size_hint(&self.value))
            }
            fn encode_to<__CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __codec_dest_edqy: &mut __CodecOutputEdqy,
            ) {
                ::scale::Encode::encode_to(&self.from, __codec_dest_edqy);
                ::scale::Encode::encode_to(&self.to, __codec_dest_edqy);
                ::scale::Encode::encode_to(&self.value, __codec_dest_edqy);
            }
        }
        #[automatically_derived]
        impl ::scale::EncodeLike for Approval {}
    };
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Decode for Approval {
            fn decode<__CodecInputEdqy: ::scale::Input>(
                __codec_input_edqy: &mut __CodecInputEdqy,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                ::core::result::Result::Ok(Approval {
                    from: {
                        let __codec_res_edqy = <AccountId as ::scale::Decode>::decode(
                            __codec_input_edqy,
                        );
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Approval::from`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                    to: {
                        let __codec_res_edqy = <AccountId as ::scale::Decode>::decode(
                            __codec_input_edqy,
                        );
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Approval::to`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                    value: {
                        let __codec_res_edqy = <Balance as ::scale::Decode>::decode(
                            __codec_input_edqy,
                        );
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Approval::value`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                })
            }
        }
    };
    const _: () = {
        impl ::ink::env::Topics for Transfer {
            type RemainingTopics = [::ink::env::topics::state::HasRemainingTopics; 3usize];
            fn topics<E, B>(
                &self,
                builder: ::ink::env::topics::TopicsBuilder<
                    ::ink::env::topics::state::Uninit,
                    E,
                    B,
                >,
            ) -> <B as ::ink::env::topics::TopicsBuilderBackend<E>>::Output
            where
                E: ::ink::env::Environment,
                B: ::ink::env::topics::TopicsBuilderBackend<E>,
            {
                builder
                    .build::<Self>()
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<[u8; 15usize]>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: b"Erc20::Transfer",
                            prefix: b"",
                        },
                    )
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<Option<AccountId>>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: &self.from,
                            prefix: b"Erc20::Transfer::from",
                        },
                    )
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<Option<AccountId>>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: &self.to,
                            prefix: b"Erc20::Transfer::to",
                        },
                    )
                    .finish()
            }
        }
    };
    const _: () = {
        impl ::ink::env::Topics for Approval {
            type RemainingTopics = [::ink::env::topics::state::HasRemainingTopics; 3usize];
            fn topics<E, B>(
                &self,
                builder: ::ink::env::topics::TopicsBuilder<
                    ::ink::env::topics::state::Uninit,
                    E,
                    B,
                >,
            ) -> <B as ::ink::env::topics::TopicsBuilderBackend<E>>::Output
            where
                E: ::ink::env::Environment,
                B: ::ink::env::topics::TopicsBuilderBackend<E>,
            {
                builder
                    .build::<Self>()
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<[u8; 15usize]>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: b"Erc20::Approval",
                            prefix: b"",
                        },
                    )
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<AccountId>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: &self.from,
                            prefix: b"Erc20::Approval::from",
                        },
                    )
                    .push_topic::<
                        ::ink::env::topics::PrefixedValue<AccountId>,
                    >(
                        &::ink::env::topics::PrefixedValue {
                            value: &self.to,
                            prefix: b"Erc20::Approval::to",
                        },
                    )
                    .finish()
            }
        }
    };
    impl ::ink::reflect::DispatchableConstructorInfo<0x9BAE9D5E_u32> for Erc20 {
        type Input = Balance;
        type Output = Self;
        type Storage = Erc20;
        type Error = <::ink::reflect::ConstructorOutputValue<
            Self,
        > as ::ink::reflect::ConstructorOutput<Erc20>>::Error;
        const IS_RESULT: ::core::primitive::bool = <::ink::reflect::ConstructorOutputValue<
            Self,
        > as ::ink::reflect::ConstructorOutput<Erc20>>::IS_RESULT;
        const CALLABLE: fn(Self::Input) -> Self::Output = |__ink_binding_0| {
            Erc20::new(__ink_binding_0)
        };
        const PAYABLE: ::core::primitive::bool = false;
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0x9B_u8,
            0xAE_u8,
            0x9D_u8,
            0x5E_u8,
        ];
        const LABEL: &'static ::core::primitive::str = "new";
    }
    impl ::ink::reflect::DispatchableMessageInfo<0xDB6375A8_u32> for Erc20 {
        type Input = ();
        type Output = Balance;
        type Storage = Erc20;
        const CALLABLE: fn(&mut Self::Storage, Self::Input) -> Self::Output = |
            storage,
            _|
        { Erc20::total_supply(storage) };
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0xDB_u8,
            0x63_u8,
            0x75_u8,
            0xA8_u8,
        ];
        const PAYABLE: ::core::primitive::bool = false;
        const MUTATES: ::core::primitive::bool = false;
        const LABEL: &'static ::core::primitive::str = "total_supply";
    }
    impl ::ink::reflect::DispatchableMessageInfo<0x0F755A56_u32> for Erc20 {
        type Input = AccountId;
        type Output = Balance;
        type Storage = Erc20;
        const CALLABLE: fn(&mut Self::Storage, Self::Input) -> Self::Output = |
            storage,
            __ink_binding_0|
        { Erc20::balance_of(storage, __ink_binding_0) };
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0x0F_u8,
            0x75_u8,
            0x5A_u8,
            0x56_u8,
        ];
        const PAYABLE: ::core::primitive::bool = false;
        const MUTATES: ::core::primitive::bool = false;
        const LABEL: &'static ::core::primitive::str = "balance_of";
    }
    impl ::ink::reflect::DispatchableMessageInfo<0x84A15DA1_u32> for Erc20 {
        type Input = (AccountId, Balance);
        type Output = Result<()>;
        type Storage = Erc20;
        const CALLABLE: fn(&mut Self::Storage, Self::Input) -> Self::Output = |
            storage,
            (__ink_binding_0, __ink_binding_1)|
        { Erc20::transfer(storage, __ink_binding_0, __ink_binding_1) };
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0x84_u8,
            0xA1_u8,
            0x5D_u8,
            0xA1_u8,
        ];
        const PAYABLE: ::core::primitive::bool = false;
        const MUTATES: ::core::primitive::bool = true;
        const LABEL: &'static ::core::primitive::str = "transfer";
    }
    impl ::ink::reflect::DispatchableMessageInfo<0x0B396F18_u32> for Erc20 {
        type Input = (AccountId, AccountId, Balance);
        type Output = Result<()>;
        type Storage = Erc20;
        const CALLABLE: fn(&mut Self::Storage, Self::Input) -> Self::Output = |
            storage,
            (__ink_binding_0, __ink_binding_1, __ink_binding_2)|
        {
            Erc20::transfer_from(
                storage,
                __ink_binding_0,
                __ink_binding_1,
                __ink_binding_2,
            )
        };
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0x0B_u8,
            0x39_u8,
            0x6F_u8,
            0x18_u8,
        ];
        const PAYABLE: ::core::primitive::bool = false;
        const MUTATES: ::core::primitive::bool = true;
        const LABEL: &'static ::core::primitive::str = "transfer_from";
    }
    impl ::ink::reflect::DispatchableMessageInfo<0x681266A0_u32> for Erc20 {
        type Input = (AccountId, Balance);
        type Output = Result<()>;
        type Storage = Erc20;
        const CALLABLE: fn(&mut Self::Storage, Self::Input) -> Self::Output = |
            storage,
            (__ink_binding_0, __ink_binding_1)|
        { Erc20::approve(storage, __ink_binding_0, __ink_binding_1) };
        const SELECTOR: [::core::primitive::u8; 4usize] = [
            0x68_u8,
            0x12_u8,
            0x66_u8,
            0xA0_u8,
        ];
        const PAYABLE: ::core::primitive::bool = false;
        const MUTATES: ::core::primitive::bool = true;
        const LABEL: &'static ::core::primitive::str = "approve";
    }
    const _: () = {
        #[allow(non_camel_case_types)]
        pub enum __ink_ConstructorDecoder {
            Constructor0(
                <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                    0x9BAE9D5E_u32,
                >>::Input,
            ),
        }
        impl ::ink::reflect::DecodeDispatch for __ink_ConstructorDecoder {
            fn decode_dispatch<I>(
                input: &mut I,
            ) -> ::core::result::Result<Self, ::ink::reflect::DispatchError>
            where
                I: ::scale::Input,
            {
                const CONSTRUCTOR_0: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                    0x9BAE9D5E_u32,
                >>::SELECTOR;
                match <[::core::primitive::u8; 4usize] as ::scale::Decode>::decode(input)
                    .map_err(|_| ::ink::reflect::DispatchError::InvalidSelector)?
                {
                    CONSTRUCTOR_0 => {
                        ::core::result::Result::Ok(
                            Self::Constructor0(
                                <<Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                    0x9BAE9D5E_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    _invalid => {
                        ::core::result::Result::Err(
                            ::ink::reflect::DispatchError::UnknownSelector,
                        )
                    }
                }
            }
        }
        impl ::scale::Decode for __ink_ConstructorDecoder {
            fn decode<I>(input: &mut I) -> ::core::result::Result<Self, ::scale::Error>
            where
                I: ::scale::Input,
            {
                <Self as ::ink::reflect::DecodeDispatch>::decode_dispatch(input)
                    .map_err(::core::convert::Into::into)
            }
        }
        impl ::ink::reflect::ExecuteDispatchable for __ink_ConstructorDecoder {
            #[allow(clippy::nonminimal_bool)]
            fn execute_dispatchable(
                self,
            ) -> ::core::result::Result<(), ::ink::reflect::DispatchError> {
                match self {
                    Self::Constructor0(input) => {
                        if {
                            false
                                || {
                                    let constructor_0 = false;
                                    let constructor_0 = <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                        0x9BAE9D5E_u32,
                                    >>::PAYABLE;
                                    constructor_0
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                0x9BAE9D5E_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                            0x9BAE9D5E_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                            0x9BAE9D5E_u32,
                        >>::CALLABLE(input);
                        let output_value = ::ink::reflect::ConstructorOutputValue::new(
                            result,
                        );
                        let output_result = <::ink::reflect::ConstructorOutputValue<
                            <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                0x9BAE9D5E_u32,
                            >>::Output,
                        > as ::ink::reflect::ConstructorOutput<
                            Erc20,
                        >>::as_result(&output_value);
                        if let ::core::result::Result::Ok(contract)
                            = output_result.as_ref()
                        {
                            ::ink::env::set_contract_storage::<
                                ::ink::primitives::Key,
                                Erc20,
                            >(
                                &<Erc20 as ::ink::storage::traits::StorageKey>::KEY,
                                contract,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::ConstructorResult<
                                ::core::result::Result<
                                    (),
                                    &<::ink::reflect::ConstructorOutputValue<
                                        <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                            0x9BAE9D5E_u32,
                                        >>::Output,
                                    > as ::ink::reflect::ConstructorOutput<Erc20>>::Error,
                                >,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(
                                output_result.is_err(),
                            ),
                            &::ink::ConstructorResult::Ok(output_result.map(|_| ())),
                        );
                    }
                }
            }
        }
        impl ::ink::reflect::ContractConstructorDecoder for Erc20 {
            type Type = __ink_ConstructorDecoder;
        }
    };
    const _: () = {
        #[allow(non_camel_case_types)]
        pub enum __ink_MessageDecoder {
            Message0(
                <Erc20 as ::ink::reflect::DispatchableMessageInfo<0xDB6375A8_u32>>::Input,
            ),
            Message1(
                <Erc20 as ::ink::reflect::DispatchableMessageInfo<0x0F755A56_u32>>::Input,
            ),
            Message2(
                <Erc20 as ::ink::reflect::DispatchableMessageInfo<0x84A15DA1_u32>>::Input,
            ),
            Message3(
                <Erc20 as ::ink::reflect::DispatchableMessageInfo<0x0B396F18_u32>>::Input,
            ),
            Message4(
                <Erc20 as ::ink::reflect::DispatchableMessageInfo<0x681266A0_u32>>::Input,
            ),
        }
        impl ::ink::reflect::DecodeDispatch for __ink_MessageDecoder {
            fn decode_dispatch<I>(
                input: &mut I,
            ) -> ::core::result::Result<Self, ::ink::reflect::DispatchError>
            where
                I: ::scale::Input,
            {
                const MESSAGE_0: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                    0xDB6375A8_u32,
                >>::SELECTOR;
                const MESSAGE_1: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                    0x0F755A56_u32,
                >>::SELECTOR;
                const MESSAGE_2: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                    0x84A15DA1_u32,
                >>::SELECTOR;
                const MESSAGE_3: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                    0x0B396F18_u32,
                >>::SELECTOR;
                const MESSAGE_4: [::core::primitive::u8; 4usize] = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                    0x681266A0_u32,
                >>::SELECTOR;
                match <[::core::primitive::u8; 4usize] as ::scale::Decode>::decode(input)
                    .map_err(|_| ::ink::reflect::DispatchError::InvalidSelector)?
                {
                    MESSAGE_0 => {
                        ::core::result::Result::Ok(
                            Self::Message0(
                                <<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0xDB6375A8_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    MESSAGE_1 => {
                        ::core::result::Result::Ok(
                            Self::Message1(
                                <<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0F755A56_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    MESSAGE_2 => {
                        ::core::result::Result::Ok(
                            Self::Message2(
                                <<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x84A15DA1_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    MESSAGE_3 => {
                        ::core::result::Result::Ok(
                            Self::Message3(
                                <<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0B396F18_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    MESSAGE_4 => {
                        ::core::result::Result::Ok(
                            Self::Message4(
                                <<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x681266A0_u32,
                                >>::Input as ::scale::Decode>::decode(input)
                                    .map_err(|_| {
                                        ::ink::reflect::DispatchError::InvalidParameters
                                    })?,
                            ),
                        )
                    }
                    _invalid => {
                        ::core::result::Result::Err(
                            ::ink::reflect::DispatchError::UnknownSelector,
                        )
                    }
                }
            }
        }
        impl ::scale::Decode for __ink_MessageDecoder {
            fn decode<I>(input: &mut I) -> ::core::result::Result<Self, ::scale::Error>
            where
                I: ::scale::Input,
            {
                <Self as ::ink::reflect::DecodeDispatch>::decode_dispatch(input)
                    .map_err(::core::convert::Into::into)
            }
        }
        fn push_contract(contract: ::core::mem::ManuallyDrop<Erc20>, mutates: bool) {
            if mutates {
                ::ink::env::set_contract_storage::<
                    ::ink::primitives::Key,
                    Erc20,
                >(&<Erc20 as ::ink::storage::traits::StorageKey>::KEY, &contract);
            }
        }
        impl ::ink::reflect::ExecuteDispatchable for __ink_MessageDecoder {
            #[allow(clippy::nonminimal_bool, clippy::let_unit_value)]
            fn execute_dispatchable(
                self,
            ) -> ::core::result::Result<(), ::ink::reflect::DispatchError> {
                let key = <Erc20 as ::ink::storage::traits::StorageKey>::KEY;
                let mut contract: ::core::mem::ManuallyDrop<Erc20> = ::core::mem::ManuallyDrop::new(
                    match ::ink::env::get_contract_storage(&key) {
                        ::core::result::Result::Ok(
                            ::core::option::Option::Some(value),
                        ) => value,
                        ::core::result::Result::Ok(::core::option::Option::None) => {
                            ::core::panicking::panic_fmt(
                                format_args!("storage entry was empty"),
                            );
                        }
                        ::core::result::Result::Err(_) => {
                            ::core::panicking::panic_fmt(
                                format_args!("could not properly decode storage entry"),
                            );
                        }
                    },
                );
                match self {
                    Self::Message0(input) => {
                        if {
                            false
                                || {
                                    let message_0 = false;
                                    let message_0 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0xDB6375A8_u32,
                                    >>::PAYABLE;
                                    message_0
                                }
                                || {
                                    let message_1 = false;
                                    let message_1 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0F755A56_u32,
                                    >>::PAYABLE;
                                    message_1
                                }
                                || {
                                    let message_2 = false;
                                    let message_2 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x84A15DA1_u32,
                                    >>::PAYABLE;
                                    message_2
                                }
                                || {
                                    let message_3 = false;
                                    let message_3 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0B396F18_u32,
                                    >>::PAYABLE;
                                    message_3
                                }
                                || {
                                    let message_4 = false;
                                    let message_4 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x681266A0_u32,
                                    >>::PAYABLE;
                                    message_4
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                0xDB6375A8_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0xDB6375A8_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0xDB6375A8_u32,
                        >>::CALLABLE(&mut contract, input);
                        let is_reverted = {
                            #[allow(unused_imports)]
                            use ::ink::result_info::IsResultTypeFallback as _;
                            ::ink::result_info::IsResultType::<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0xDB6375A8_u32,
                                >>::Output,
                            >::VALUE
                        }
                            && {
                                #[allow(unused_imports)]
                                use ::ink::result_info::IsResultErrFallback as _;
                                ::ink::result_info::IsResultErr(&result).value()
                            };
                        if !is_reverted {
                            push_contract(
                                contract,
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0xDB6375A8_u32,
                                >>::MUTATES,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::MessageResult<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0xDB6375A8_u32,
                                >>::Output,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(is_reverted),
                            &::ink::MessageResult::Ok(result),
                        )
                    }
                    Self::Message1(input) => {
                        if {
                            false
                                || {
                                    let message_0 = false;
                                    let message_0 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0xDB6375A8_u32,
                                    >>::PAYABLE;
                                    message_0
                                }
                                || {
                                    let message_1 = false;
                                    let message_1 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0F755A56_u32,
                                    >>::PAYABLE;
                                    message_1
                                }
                                || {
                                    let message_2 = false;
                                    let message_2 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x84A15DA1_u32,
                                    >>::PAYABLE;
                                    message_2
                                }
                                || {
                                    let message_3 = false;
                                    let message_3 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0B396F18_u32,
                                    >>::PAYABLE;
                                    message_3
                                }
                                || {
                                    let message_4 = false;
                                    let message_4 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x681266A0_u32,
                                    >>::PAYABLE;
                                    message_4
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                0x0F755A56_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x0F755A56_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x0F755A56_u32,
                        >>::CALLABLE(&mut contract, input);
                        let is_reverted = {
                            #[allow(unused_imports)]
                            use ::ink::result_info::IsResultTypeFallback as _;
                            ::ink::result_info::IsResultType::<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0F755A56_u32,
                                >>::Output,
                            >::VALUE
                        }
                            && {
                                #[allow(unused_imports)]
                                use ::ink::result_info::IsResultErrFallback as _;
                                ::ink::result_info::IsResultErr(&result).value()
                            };
                        if !is_reverted {
                            push_contract(
                                contract,
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0F755A56_u32,
                                >>::MUTATES,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::MessageResult<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0F755A56_u32,
                                >>::Output,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(is_reverted),
                            &::ink::MessageResult::Ok(result),
                        )
                    }
                    Self::Message2(input) => {
                        if {
                            false
                                || {
                                    let message_0 = false;
                                    let message_0 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0xDB6375A8_u32,
                                    >>::PAYABLE;
                                    message_0
                                }
                                || {
                                    let message_1 = false;
                                    let message_1 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0F755A56_u32,
                                    >>::PAYABLE;
                                    message_1
                                }
                                || {
                                    let message_2 = false;
                                    let message_2 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x84A15DA1_u32,
                                    >>::PAYABLE;
                                    message_2
                                }
                                || {
                                    let message_3 = false;
                                    let message_3 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0B396F18_u32,
                                    >>::PAYABLE;
                                    message_3
                                }
                                || {
                                    let message_4 = false;
                                    let message_4 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x681266A0_u32,
                                    >>::PAYABLE;
                                    message_4
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                0x84A15DA1_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x84A15DA1_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x84A15DA1_u32,
                        >>::CALLABLE(&mut contract, input);
                        let is_reverted = {
                            #[allow(unused_imports)]
                            use ::ink::result_info::IsResultTypeFallback as _;
                            ::ink::result_info::IsResultType::<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x84A15DA1_u32,
                                >>::Output,
                            >::VALUE
                        }
                            && {
                                #[allow(unused_imports)]
                                use ::ink::result_info::IsResultErrFallback as _;
                                ::ink::result_info::IsResultErr(&result).value()
                            };
                        if !is_reverted {
                            push_contract(
                                contract,
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x84A15DA1_u32,
                                >>::MUTATES,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::MessageResult<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x84A15DA1_u32,
                                >>::Output,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(is_reverted),
                            &::ink::MessageResult::Ok(result),
                        )
                    }
                    Self::Message3(input) => {
                        if {
                            false
                                || {
                                    let message_0 = false;
                                    let message_0 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0xDB6375A8_u32,
                                    >>::PAYABLE;
                                    message_0
                                }
                                || {
                                    let message_1 = false;
                                    let message_1 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0F755A56_u32,
                                    >>::PAYABLE;
                                    message_1
                                }
                                || {
                                    let message_2 = false;
                                    let message_2 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x84A15DA1_u32,
                                    >>::PAYABLE;
                                    message_2
                                }
                                || {
                                    let message_3 = false;
                                    let message_3 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0B396F18_u32,
                                    >>::PAYABLE;
                                    message_3
                                }
                                || {
                                    let message_4 = false;
                                    let message_4 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x681266A0_u32,
                                    >>::PAYABLE;
                                    message_4
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                0x0B396F18_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x0B396F18_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x0B396F18_u32,
                        >>::CALLABLE(&mut contract, input);
                        let is_reverted = {
                            #[allow(unused_imports)]
                            use ::ink::result_info::IsResultTypeFallback as _;
                            ::ink::result_info::IsResultType::<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0B396F18_u32,
                                >>::Output,
                            >::VALUE
                        }
                            && {
                                #[allow(unused_imports)]
                                use ::ink::result_info::IsResultErrFallback as _;
                                ::ink::result_info::IsResultErr(&result).value()
                            };
                        if !is_reverted {
                            push_contract(
                                contract,
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0B396F18_u32,
                                >>::MUTATES,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::MessageResult<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x0B396F18_u32,
                                >>::Output,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(is_reverted),
                            &::ink::MessageResult::Ok(result),
                        )
                    }
                    Self::Message4(input) => {
                        if {
                            false
                                || {
                                    let message_0 = false;
                                    let message_0 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0xDB6375A8_u32,
                                    >>::PAYABLE;
                                    message_0
                                }
                                || {
                                    let message_1 = false;
                                    let message_1 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0F755A56_u32,
                                    >>::PAYABLE;
                                    message_1
                                }
                                || {
                                    let message_2 = false;
                                    let message_2 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x84A15DA1_u32,
                                    >>::PAYABLE;
                                    message_2
                                }
                                || {
                                    let message_3 = false;
                                    let message_3 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x0B396F18_u32,
                                    >>::PAYABLE;
                                    message_3
                                }
                                || {
                                    let message_4 = false;
                                    let message_4 = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                        0x681266A0_u32,
                                    >>::PAYABLE;
                                    message_4
                                }
                        }
                            && !<Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                0x681266A0_u32,
                            >>::PAYABLE
                        {
                            ::ink::codegen::deny_payment::<
                                <Erc20 as ::ink::env::ContractEnv>::Env,
                            >()?;
                        }
                        let result: <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x681266A0_u32,
                        >>::Output = <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                            0x681266A0_u32,
                        >>::CALLABLE(&mut contract, input);
                        let is_reverted = {
                            #[allow(unused_imports)]
                            use ::ink::result_info::IsResultTypeFallback as _;
                            ::ink::result_info::IsResultType::<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x681266A0_u32,
                                >>::Output,
                            >::VALUE
                        }
                            && {
                                #[allow(unused_imports)]
                                use ::ink::result_info::IsResultErrFallback as _;
                                ::ink::result_info::IsResultErr(&result).value()
                            };
                        if !is_reverted {
                            push_contract(
                                contract,
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x681266A0_u32,
                                >>::MUTATES,
                            );
                        }
                        ::ink::env::return_value::<
                            ::ink::MessageResult<
                                <Erc20 as ::ink::reflect::DispatchableMessageInfo<
                                    0x681266A0_u32,
                                >>::Output,
                            >,
                        >(
                            ::ink::env::ReturnFlags::new_with_reverted(is_reverted),
                            &::ink::MessageResult::Ok(result),
                        )
                    }
                };
            }
        }
        impl ::ink::reflect::ContractMessageDecoder for Erc20 {
            type Type = __ink_MessageDecoder;
        }
    };
    const _: () = {
        use ::ink::codegen::{Env as _, StaticEnv as _};
        use ::ink::codegen::EmitEvent as _;
        const _: ::ink::codegen::utils::IsSameType<Erc20> = ::ink::codegen::utils::IsSameType::<
            Erc20,
        >::new();
        impl Erc20 {
            /// Constructor that initializes the `bool` value to the given `init_value`.
            #[cfg(not(feature = "__ink_dylint_Constructor"))]
            pub fn new(total_supply: Balance) -> Self {
                let mut balances = Mapping::new();
                balances.insert(Self::env().caller(), &total_supply);
                Self::env()
                    .emit_event(Transfer {
                        from: None,
                        to: Some(Self::env().caller()),
                        value: total_supply,
                    });
                Self {
                    total_supply,
                    balances,
                    ..Default::default()
                }
            }
            pub fn total_supply(&self) -> Balance {
                self.total_supply
            }
            pub fn balance_of(&self, who: AccountId) -> Balance {
                self.balances.get(&who).unwrap_or_default()
            }
            pub fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()> {
                let sender = self.env().caller();
                self.transfer_helper(&sender, &to, value)
            }
            pub fn transfer_from(
                &mut self,
                from: AccountId,
                to: AccountId,
                value: Balance,
            ) -> Result<()> {
                let sender = self.env().caller();
                let allowance = self.allowances.get(&(from, sender)).unwrap_or_default();
                if allowance < value {
                    return Err(Error::AllowanceTooLow);
                }
                self.allowances.insert(&(from, sender), &(allowance - value));
                self.transfer_helper(&from, &to, value)
            }
            pub fn approve(&mut self, to: AccountId, value: Balance) -> Result<()> {
                let sender = self.env().caller();
                self.allowances.insert(&(sender, to), &value);
                self.env()
                    .emit_event(Approval {
                        from: sender,
                        to,
                        value,
                    });
                Ok(())
            }
            pub fn transfer_helper(
                &mut self,
                from: &AccountId,
                to: &AccountId,
                value: Balance,
            ) -> Result<()> {
                let balance_from = self.balance_of(*from);
                let balance_to = self.balance_of(*to);
                if value > balance_from {
                    return Err(Error::BalanceTooLow);
                }
                self.balances.insert(from, &(balance_from - value));
                self.balances.insert(to, &(balance_to + value));
                self.env()
                    .emit_event(Transfer {
                        from: Some(*from),
                        to: Some(*to),
                        value,
                    });
                Ok(())
            }
        }
        const _: () = {
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchOutput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<AccountId>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchOutput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<AccountId>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchOutput<Result<()>>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<AccountId>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<AccountId>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchOutput<Result<()>>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<AccountId>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchInput<Balance>,
            >();
            ::ink::codegen::utils::consume_type::<
                ::ink::codegen::DispatchOutput<Result<()>>,
            >();
        };
    };
    const _: () = {
        /// The ink! smart contract's call builder.
        ///
        /// Implements the underlying on-chain calling of the ink! smart contract
        /// messages and trait implementations in a type safe way.
        #[repr(transparent)]
        pub struct CallBuilder {
            account_id: AccountId,
        }
        #[automatically_derived]
        impl ::core::fmt::Debug for CallBuilder {
            #[inline]
            fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
                ::core::fmt::Formatter::debug_struct_field1_finish(
                    f,
                    "CallBuilder",
                    "account_id",
                    &&self.account_id,
                )
            }
        }
        #[allow(deprecated)]
        const _: () = {
            #[automatically_derived]
            impl ::scale::Encode for CallBuilder {
                fn size_hint(&self) -> usize {
                    ::scale::Encode::size_hint(&&self.account_id)
                }
                fn encode_to<
                    __CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized,
                >(&self, __codec_dest_edqy: &mut __CodecOutputEdqy) {
                    ::scale::Encode::encode_to(&&self.account_id, __codec_dest_edqy)
                }
                fn encode(&self) -> ::scale::alloc::vec::Vec<::core::primitive::u8> {
                    ::scale::Encode::encode(&&self.account_id)
                }
                fn using_encoded<
                    __CodecOutputReturn,
                    __CodecUsingEncodedCallback: ::core::ops::FnOnce(
                            &[::core::primitive::u8],
                        ) -> __CodecOutputReturn,
                >(&self, f: __CodecUsingEncodedCallback) -> __CodecOutputReturn {
                    ::scale::Encode::using_encoded(&&self.account_id, f)
                }
            }
            #[automatically_derived]
            impl ::scale::EncodeLike for CallBuilder {}
        };
        #[allow(deprecated)]
        const _: () = {
            #[automatically_derived]
            impl ::scale::Decode for CallBuilder {
                fn decode<__CodecInputEdqy: ::scale::Input>(
                    __codec_input_edqy: &mut __CodecInputEdqy,
                ) -> ::core::result::Result<Self, ::scale::Error> {
                    ::core::result::Result::Ok(CallBuilder {
                        account_id: {
                            let __codec_res_edqy = <AccountId as ::scale::Decode>::decode(
                                __codec_input_edqy,
                            );
                            match __codec_res_edqy {
                                ::core::result::Result::Err(e) => {
                                    return ::core::result::Result::Err(
                                        e.chain("Could not decode `CallBuilder::account_id`"),
                                    );
                                }
                                ::core::result::Result::Ok(__codec_res_edqy) => {
                                    __codec_res_edqy
                                }
                            }
                        },
                    })
                }
                fn decode_into<__CodecInputEdqy: ::scale::Input>(
                    __codec_input_edqy: &mut __CodecInputEdqy,
                    dst_: &mut ::core::mem::MaybeUninit<Self>,
                ) -> ::core::result::Result<::scale::DecodeFinished, ::scale::Error> {
                    match (
                        &::core::mem::size_of::<AccountId>(),
                        &::core::mem::size_of::<Self>(),
                    ) {
                        (left_val, right_val) => {
                            if !(*left_val == *right_val) {
                                let kind = ::core::panicking::AssertKind::Eq;
                                ::core::panicking::assert_failed(
                                    kind,
                                    &*left_val,
                                    &*right_val,
                                    ::core::option::Option::None,
                                );
                            }
                        }
                    };
                    if !(if ::core::mem::size_of::<AccountId>() > 0 { 1 } else { 0 }
                        <= 1)
                    {
                        ::core::panicking::panic(
                            "assertion failed: if ::core::mem::size_of::<AccountId>() > 0 { 1 } else { 0 } <= 1",
                        )
                    }
                    {
                        let dst_: &mut ::core::mem::MaybeUninit<Self> = dst_;
                        let dst_: &mut ::core::mem::MaybeUninit<AccountId> = unsafe {
                            &mut *dst_
                                .as_mut_ptr()
                                .cast::<::core::mem::MaybeUninit<AccountId>>()
                        };
                        <AccountId as ::scale::Decode>::decode_into(
                            __codec_input_edqy,
                            dst_,
                        )?;
                    }
                    unsafe {
                        ::core::result::Result::Ok(
                            ::scale::DecodeFinished::assert_decoding_finished(),
                        )
                    }
                }
            }
        };
        #[automatically_derived]
        impl ::core::hash::Hash for CallBuilder {
            #[inline]
            fn hash<__H: ::core::hash::Hasher>(&self, state: &mut __H) -> () {
                ::core::hash::Hash::hash(&self.account_id, state)
            }
        }
        #[automatically_derived]
        impl ::core::marker::StructuralPartialEq for CallBuilder {}
        #[automatically_derived]
        impl ::core::cmp::PartialEq for CallBuilder {
            #[inline]
            fn eq(&self, other: &CallBuilder) -> bool {
                self.account_id == other.account_id
            }
        }
        #[automatically_derived]
        impl ::core::marker::StructuralEq for CallBuilder {}
        #[automatically_derived]
        impl ::core::cmp::Eq for CallBuilder {
            #[inline]
            #[doc(hidden)]
            #[coverage(off)]
            fn assert_receiver_is_total_eq(&self) -> () {
                let _: ::core::cmp::AssertParamIsEq<AccountId>;
            }
        }
        #[automatically_derived]
        impl ::core::clone::Clone for CallBuilder {
            #[inline]
            fn clone(&self) -> CallBuilder {
                CallBuilder {
                    account_id: ::core::clone::Clone::clone(&self.account_id),
                }
            }
        }
        #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
        const _: () = {
            impl ::scale_info::TypeInfo for CallBuilder {
                type Identity = Self;
                fn type_info() -> ::scale_info::Type {
                    ::scale_info::Type::builder()
                        .path(
                            ::scale_info::Path::new_with_replace(
                                "CallBuilder",
                                "erc20::erc20",
                                &[],
                            ),
                        )
                        .type_params(::alloc::vec::Vec::new())
                        .docs(
                            &[
                                "The ink! smart contract's call builder.",
                                "",
                                "Implements the underlying on-chain calling of the ink! smart contract",
                                "messages and trait implementations in a type safe way.",
                            ],
                        )
                        .composite(
                            ::scale_info::build::Fields::named()
                                .field(|f| {
                                    f
                                        .ty::<AccountId>()
                                        .name("account_id")
                                        .type_name("AccountId")
                                }),
                        )
                }
            }
        };
        const _: () = {
            impl ::ink::storage::traits::StorageLayout for CallBuilder {
                fn layout(
                    __key: &::ink::primitives::Key,
                ) -> ::ink::metadata::layout::Layout {
                    ::ink::metadata::layout::Layout::Struct(
                        ::ink::metadata::layout::StructLayout::new(
                            "CallBuilder",
                            [
                                ::ink::metadata::layout::FieldLayout::new(
                                    "account_id",
                                    <AccountId as ::ink::storage::traits::StorageLayout>::layout(
                                        __key,
                                    ),
                                ),
                            ],
                        ),
                    )
                }
            }
        };
        const _: () = {
            impl ::ink::codegen::ContractCallBuilder for Erc20 {
                type Type = CallBuilder;
            }
            impl ::ink::env::ContractEnv for CallBuilder {
                type Env = <Erc20 as ::ink::env::ContractEnv>::Env;
            }
        };
        impl ::ink::env::call::FromAccountId<Environment> for CallBuilder {
            #[inline]
            fn from_account_id(account_id: AccountId) -> Self {
                Self { account_id }
            }
        }
        impl ::ink::ToAccountId<Environment> for CallBuilder {
            #[inline]
            fn to_account_id(&self) -> AccountId {
                <AccountId as ::core::clone::Clone>::clone(&self.account_id)
            }
        }
        impl ::core::convert::AsRef<AccountId> for CallBuilder {
            fn as_ref(&self) -> &AccountId {
                &self.account_id
            }
        }
        impl ::core::convert::AsMut<AccountId> for CallBuilder {
            fn as_mut(&mut self) -> &mut AccountId {
                &mut self.account_id
            }
        }
        impl CallBuilder {
            #[allow(clippy::type_complexity)]
            #[inline]
            pub fn total_supply(
                &self,
            ) -> ::ink::env::call::CallBuilder<
                Environment,
                ::ink::env::call::utils::Set<::ink::env::call::Call<Environment>>,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::ExecutionInput<
                        ::ink::env::call::utils::EmptyArgumentList,
                    >,
                >,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::utils::ReturnType<Balance>,
                >,
            > {
                ::ink::env::call::build_call::<Environment>()
                    .call(::ink::ToAccountId::to_account_id(self))
                    .exec_input(
                        ::ink::env::call::ExecutionInput::new(
                            ::ink::env::call::Selector::new([
                                0xDB_u8,
                                0x63_u8,
                                0x75_u8,
                                0xA8_u8,
                            ]),
                        ),
                    )
                    .returns::<Balance>()
            }
            #[allow(clippy::type_complexity)]
            #[inline]
            pub fn balance_of(
                &self,
                __ink_binding_0: AccountId,
            ) -> ::ink::env::call::CallBuilder<
                Environment,
                ::ink::env::call::utils::Set<::ink::env::call::Call<Environment>>,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::ExecutionInput<
                        ::ink::env::call::utils::ArgumentList<
                            ::ink::env::call::utils::Argument<AccountId>,
                            ::ink::env::call::utils::EmptyArgumentList,
                        >,
                    >,
                >,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::utils::ReturnType<Balance>,
                >,
            > {
                ::ink::env::call::build_call::<Environment>()
                    .call(::ink::ToAccountId::to_account_id(self))
                    .exec_input(
                        ::ink::env::call::ExecutionInput::new(
                                ::ink::env::call::Selector::new([
                                    0x0F_u8,
                                    0x75_u8,
                                    0x5A_u8,
                                    0x56_u8,
                                ]),
                            )
                            .push_arg(__ink_binding_0),
                    )
                    .returns::<Balance>()
            }
            #[allow(clippy::type_complexity)]
            #[inline]
            pub fn transfer(
                &mut self,
                __ink_binding_0: AccountId,
                __ink_binding_1: Balance,
            ) -> ::ink::env::call::CallBuilder<
                Environment,
                ::ink::env::call::utils::Set<::ink::env::call::Call<Environment>>,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::ExecutionInput<
                        ::ink::env::call::utils::ArgumentList<
                            ::ink::env::call::utils::Argument<Balance>,
                            ::ink::env::call::utils::ArgumentList<
                                ::ink::env::call::utils::Argument<AccountId>,
                                ::ink::env::call::utils::EmptyArgumentList,
                            >,
                        >,
                    >,
                >,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::utils::ReturnType<Result<()>>,
                >,
            > {
                ::ink::env::call::build_call::<Environment>()
                    .call(::ink::ToAccountId::to_account_id(self))
                    .exec_input(
                        ::ink::env::call::ExecutionInput::new(
                                ::ink::env::call::Selector::new([
                                    0x84_u8,
                                    0xA1_u8,
                                    0x5D_u8,
                                    0xA1_u8,
                                ]),
                            )
                            .push_arg(__ink_binding_0)
                            .push_arg(__ink_binding_1),
                    )
                    .returns::<Result<()>>()
            }
            #[allow(clippy::type_complexity)]
            #[inline]
            pub fn transfer_from(
                &mut self,
                __ink_binding_0: AccountId,
                __ink_binding_1: AccountId,
                __ink_binding_2: Balance,
            ) -> ::ink::env::call::CallBuilder<
                Environment,
                ::ink::env::call::utils::Set<::ink::env::call::Call<Environment>>,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::ExecutionInput<
                        ::ink::env::call::utils::ArgumentList<
                            ::ink::env::call::utils::Argument<Balance>,
                            ::ink::env::call::utils::ArgumentList<
                                ::ink::env::call::utils::Argument<AccountId>,
                                ::ink::env::call::utils::ArgumentList<
                                    ::ink::env::call::utils::Argument<AccountId>,
                                    ::ink::env::call::utils::EmptyArgumentList,
                                >,
                            >,
                        >,
                    >,
                >,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::utils::ReturnType<Result<()>>,
                >,
            > {
                ::ink::env::call::build_call::<Environment>()
                    .call(::ink::ToAccountId::to_account_id(self))
                    .exec_input(
                        ::ink::env::call::ExecutionInput::new(
                                ::ink::env::call::Selector::new([
                                    0x0B_u8,
                                    0x39_u8,
                                    0x6F_u8,
                                    0x18_u8,
                                ]),
                            )
                            .push_arg(__ink_binding_0)
                            .push_arg(__ink_binding_1)
                            .push_arg(__ink_binding_2),
                    )
                    .returns::<Result<()>>()
            }
            #[allow(clippy::type_complexity)]
            #[inline]
            pub fn approve(
                &mut self,
                __ink_binding_0: AccountId,
                __ink_binding_1: Balance,
            ) -> ::ink::env::call::CallBuilder<
                Environment,
                ::ink::env::call::utils::Set<::ink::env::call::Call<Environment>>,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::ExecutionInput<
                        ::ink::env::call::utils::ArgumentList<
                            ::ink::env::call::utils::Argument<Balance>,
                            ::ink::env::call::utils::ArgumentList<
                                ::ink::env::call::utils::Argument<AccountId>,
                                ::ink::env::call::utils::EmptyArgumentList,
                            >,
                        >,
                    >,
                >,
                ::ink::env::call::utils::Set<
                    ::ink::env::call::utils::ReturnType<Result<()>>,
                >,
            > {
                ::ink::env::call::build_call::<Environment>()
                    .call(::ink::ToAccountId::to_account_id(self))
                    .exec_input(
                        ::ink::env::call::ExecutionInput::new(
                                ::ink::env::call::Selector::new([
                                    0x68_u8,
                                    0x12_u8,
                                    0x66_u8,
                                    0xA0_u8,
                                ]),
                            )
                            .push_arg(__ink_binding_0)
                            .push_arg(__ink_binding_1),
                    )
                    .returns::<Result<()>>()
            }
        }
    };
    pub struct Erc20Ref {
        inner: <Erc20 as ::ink::codegen::ContractCallBuilder>::Type,
    }
    #[automatically_derived]
    impl ::core::fmt::Debug for Erc20Ref {
        #[inline]
        fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
            ::core::fmt::Formatter::debug_struct_field1_finish(
                f,
                "Erc20Ref",
                "inner",
                &&self.inner,
            )
        }
    }
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Encode for Erc20Ref {
            fn size_hint(&self) -> usize {
                ::scale::Encode::size_hint(&&self.inner)
            }
            fn encode_to<__CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __codec_dest_edqy: &mut __CodecOutputEdqy,
            ) {
                ::scale::Encode::encode_to(&&self.inner, __codec_dest_edqy)
            }
            fn encode(&self) -> ::scale::alloc::vec::Vec<::core::primitive::u8> {
                ::scale::Encode::encode(&&self.inner)
            }
            fn using_encoded<
                __CodecOutputReturn,
                __CodecUsingEncodedCallback: ::core::ops::FnOnce(
                        &[::core::primitive::u8],
                    ) -> __CodecOutputReturn,
            >(&self, f: __CodecUsingEncodedCallback) -> __CodecOutputReturn {
                ::scale::Encode::using_encoded(&&self.inner, f)
            }
        }
        #[automatically_derived]
        impl ::scale::EncodeLike for Erc20Ref {}
    };
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Decode for Erc20Ref {
            fn decode<__CodecInputEdqy: ::scale::Input>(
                __codec_input_edqy: &mut __CodecInputEdqy,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                ::core::result::Result::Ok(Erc20Ref {
                    inner: {
                        let __codec_res_edqy = <<Erc20 as ::ink::codegen::ContractCallBuilder>::Type as ::scale::Decode>::decode(
                            __codec_input_edqy,
                        );
                        match __codec_res_edqy {
                            ::core::result::Result::Err(e) => {
                                return ::core::result::Result::Err(
                                    e.chain("Could not decode `Erc20Ref::inner`"),
                                );
                            }
                            ::core::result::Result::Ok(__codec_res_edqy) => {
                                __codec_res_edqy
                            }
                        }
                    },
                })
            }
        }
    };
    #[automatically_derived]
    impl ::core::hash::Hash for Erc20Ref {
        #[inline]
        fn hash<__H: ::core::hash::Hasher>(&self, state: &mut __H) -> () {
            ::core::hash::Hash::hash(&self.inner, state)
        }
    }
    #[automatically_derived]
    impl ::core::marker::StructuralPartialEq for Erc20Ref {}
    #[automatically_derived]
    impl ::core::cmp::PartialEq for Erc20Ref {
        #[inline]
        fn eq(&self, other: &Erc20Ref) -> bool {
            self.inner == other.inner
        }
    }
    #[automatically_derived]
    impl ::core::marker::StructuralEq for Erc20Ref {}
    #[automatically_derived]
    impl ::core::cmp::Eq for Erc20Ref {
        #[inline]
        #[doc(hidden)]
        #[coverage(off)]
        fn assert_receiver_is_total_eq(&self) -> () {
            let _: ::core::cmp::AssertParamIsEq<
                <Erc20 as ::ink::codegen::ContractCallBuilder>::Type,
            >;
        }
    }
    #[automatically_derived]
    impl ::core::clone::Clone for Erc20Ref {
        #[inline]
        fn clone(&self) -> Erc20Ref {
            Erc20Ref {
                inner: ::core::clone::Clone::clone(&self.inner),
            }
        }
    }
    #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
    const _: () = {
        impl ::scale_info::TypeInfo for Erc20Ref {
            type Identity = Self;
            fn type_info() -> ::scale_info::Type {
                ::scale_info::Type::builder()
                    .path(
                        ::scale_info::Path::new_with_replace(
                            "Erc20Ref",
                            "erc20::erc20",
                            &[],
                        ),
                    )
                    .type_params(::alloc::vec::Vec::new())
                    .composite(
                        ::scale_info::build::Fields::named()
                            .field(|f| {
                                f
                                    .ty::<
                                        <Erc20 as ::ink::codegen::ContractCallBuilder>::Type,
                                    >()
                                    .name("inner")
                                    .type_name(
                                        "<Erc20 as::ink::codegen::ContractCallBuilder>::Type",
                                    )
                            }),
                    )
            }
        }
    };
    const _: () = {
        impl ::ink::storage::traits::StorageLayout for Erc20Ref {
            fn layout(
                __key: &::ink::primitives::Key,
            ) -> ::ink::metadata::layout::Layout {
                ::ink::metadata::layout::Layout::Struct(
                    ::ink::metadata::layout::StructLayout::new(
                        "Erc20Ref",
                        [
                            ::ink::metadata::layout::FieldLayout::new(
                                "inner",
                                <<Erc20 as ::ink::codegen::ContractCallBuilder>::Type as ::ink::storage::traits::StorageLayout>::layout(
                                    __key,
                                ),
                            ),
                        ],
                    ),
                )
            }
        }
    };
    const _: () = {
        impl ::ink::env::ContractReference for Erc20 {
            type Type = Erc20Ref;
        }
        impl ::ink::env::call::ConstructorReturnType<Erc20Ref> for Erc20 {
            type Output = Erc20Ref;
            type Error = ();
            fn ok(value: Erc20Ref) -> Self::Output {
                value
            }
        }
        impl<E> ::ink::env::call::ConstructorReturnType<Erc20Ref>
        for ::core::result::Result<Erc20, E>
        where
            E: ::scale::Decode,
        {
            const IS_RESULT: bool = true;
            type Output = ::core::result::Result<Erc20Ref, E>;
            type Error = E;
            fn ok(value: Erc20Ref) -> Self::Output {
                ::core::result::Result::Ok(value)
            }
            fn err(err: Self::Error) -> ::core::option::Option<Self::Output> {
                ::core::option::Option::Some(::core::result::Result::Err(err))
            }
        }
        impl ::ink::env::ContractEnv for Erc20Ref {
            type Env = <Erc20 as ::ink::env::ContractEnv>::Env;
        }
    };
    impl Erc20Ref {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[inline]
        #[allow(clippy::type_complexity)]
        pub fn new(
            __ink_binding_0: Balance,
        ) -> ::ink::env::call::CreateBuilder<
            Environment,
            Self,
            ::ink::env::call::utils::Unset<Hash>,
            ::ink::env::call::utils::Unset<u64>,
            ::ink::env::call::utils::Unset<Balance>,
            ::ink::env::call::utils::Set<
                ::ink::env::call::ExecutionInput<
                    ::ink::env::call::utils::ArgumentList<
                        ::ink::env::call::utils::Argument<Balance>,
                        ::ink::env::call::utils::EmptyArgumentList,
                    >,
                >,
            >,
            ::ink::env::call::utils::Unset<::ink::env::call::state::Salt>,
            ::ink::env::call::utils::Set<::ink::env::call::utils::ReturnType<Self>>,
        > {
            ::ink::env::call::build_create::<Self>()
                .exec_input(
                    ::ink::env::call::ExecutionInput::new(
                            ::ink::env::call::Selector::new([
                                0x9B_u8,
                                0xAE_u8,
                                0x9D_u8,
                                0x5E_u8,
                            ]),
                        )
                        .push_arg(__ink_binding_0),
                )
                .returns::<Self>()
        }
        #[inline]
        pub fn total_supply(&self) -> Balance {
            self.try_total_supply()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "total_supply", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn try_total_supply(&self) -> ::ink::MessageResult<Balance> {
            <Self as ::ink::codegen::TraitCallBuilder>::call(self)
                .total_supply()
                .try_invoke()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "total_supply", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn balance_of(&self, who: AccountId) -> Balance {
            self.try_balance_of(who)
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "balance_of", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn try_balance_of(&self, who: AccountId) -> ::ink::MessageResult<Balance> {
            <Self as ::ink::codegen::TraitCallBuilder>::call(self)
                .balance_of(who)
                .try_invoke()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "balance_of", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()> {
            self.try_transfer(to, value)
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "transfer", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn try_transfer(
            &mut self,
            to: AccountId,
            value: Balance,
        ) -> ::ink::MessageResult<Result<()>> {
            <Self as ::ink::codegen::TraitCallBuilder>::call_mut(self)
                .transfer(to, value)
                .try_invoke()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "transfer", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            value: Balance,
        ) -> Result<()> {
            self.try_transfer_from(from, to, value)
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "transfer_from", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn try_transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            value: Balance,
        ) -> ::ink::MessageResult<Result<()>> {
            <Self as ::ink::codegen::TraitCallBuilder>::call_mut(self)
                .transfer_from(from, to, value)
                .try_invoke()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "transfer_from", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn approve(&mut self, to: AccountId, value: Balance) -> Result<()> {
            self.try_approve(to, value)
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "approve", error
                        ),
                    );
                })
        }
        #[inline]
        pub fn try_approve(
            &mut self,
            to: AccountId,
            value: Balance,
        ) -> ::ink::MessageResult<Result<()>> {
            <Self as ::ink::codegen::TraitCallBuilder>::call_mut(self)
                .approve(to, value)
                .try_invoke()
                .unwrap_or_else(|error| {
                    ::core::panicking::panic_fmt(
                        format_args!(
                            "encountered error while calling {0}::{1}: {2:?}", "Erc20",
                            "approve", error
                        ),
                    );
                })
        }
    }
    const _: () = {
        impl ::ink::codegen::TraitCallBuilder for Erc20Ref {
            type Builder = <Erc20 as ::ink::codegen::ContractCallBuilder>::Type;
            #[inline]
            fn call(&self) -> &Self::Builder {
                &self.inner
            }
            #[inline]
            fn call_mut(&mut self) -> &mut Self::Builder {
                &mut self.inner
            }
        }
    };
    impl ::ink::env::call::FromAccountId<Environment> for Erc20Ref {
        #[inline]
        fn from_account_id(account_id: AccountId) -> Self {
            Self {
                inner: <<Erc20 as ::ink::codegen::ContractCallBuilder>::Type as ::ink::env::call::FromAccountId<
                    Environment,
                >>::from_account_id(account_id),
            }
        }
    }
    impl ::ink::ToAccountId<Environment> for Erc20Ref {
        #[inline]
        fn to_account_id(&self) -> AccountId {
            <<Erc20 as ::ink::codegen::ContractCallBuilder>::Type as ::ink::ToAccountId<
                Environment,
            >>::to_account_id(&self.inner)
        }
    }
    impl ::core::convert::AsRef<AccountId> for Erc20Ref {
        fn as_ref(&self) -> &AccountId {
            <_ as ::core::convert::AsRef<AccountId>>::as_ref(&self.inner)
        }
    }
    impl ::core::convert::AsMut<AccountId> for Erc20Ref {
        fn as_mut(&mut self) -> &mut AccountId {
            <_ as ::core::convert::AsMut<AccountId>>::as_mut(&mut self.inner)
        }
    }
    #[cfg(feature = "std")]
    #[cfg(not(feature = "ink-as-dependency"))]
    const _: () = {
        #[no_mangle]
        pub fn __ink_generate_metadata() -> ::ink::metadata::InkProject {
            let layout = ::ink::metadata::layout::Layout::Root(
                ::ink::metadata::layout::RootLayout::new(
                    <::ink::metadata::layout::LayoutKey as ::core::convert::From<
                        ::ink::primitives::Key,
                    >>::from(<Erc20 as ::ink::storage::traits::StorageKey>::KEY),
                    <Erc20 as ::ink::storage::traits::StorageLayout>::layout(
                        &<Erc20 as ::ink::storage::traits::StorageKey>::KEY,
                    ),
                ),
            );
            ::ink::metadata::layout::ValidateLayout::validate(&layout)
                .unwrap_or_else(|error| {
                    {
                        ::core::panicking::panic_fmt(
                            format_args!("metadata ink! generation failed: {0}", error),
                        );
                    }
                });
            ::ink::metadata::InkProject::new(
                layout,
                ::ink::metadata::ContractSpec::new()
                    .constructors([
                        ::ink::metadata::ConstructorSpec::from_label("new")
                            .selector([0x9B_u8, 0xAE_u8, 0x9D_u8, 0x5E_u8])
                            .args([
                                ::ink::metadata::MessageParamSpec::new("total_supply")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                            ])
                            .payable(false)
                            .default(false)
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    if <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                        2611912030u32,
                                    >>::IS_RESULT {
                                        ::core::option::Option::Some(
                                            ::ink::metadata::TypeSpec::with_name_str::<
                                                ::ink::ConstructorResult<
                                                    ::core::result::Result<
                                                        (),
                                                        <Erc20 as ::ink::reflect::DispatchableConstructorInfo<
                                                            2611912030u32,
                                                        >>::Error,
                                                    >,
                                                >,
                                            >("ink_primitives::ConstructorResult"),
                                        )
                                    } else {
                                        ::core::option::Option::Some(
                                            ::ink::metadata::TypeSpec::with_name_str::<
                                                ::ink::ConstructorResult<()>,
                                            >("ink_primitives::ConstructorResult"),
                                        )
                                    },
                                ),
                            )
                            .docs([
                                " Constructor that initializes the `bool` value to the given `init_value`.",
                            ])
                            .done(),
                    ])
                    .messages([
                        ::ink::metadata::MessageSpec::from_label("total_supply")
                            .selector([0xDB_u8, 0x63_u8, 0x75_u8, 0xA8_u8])
                            .args([])
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    ::ink::metadata::TypeSpec::with_name_segs::<
                                        ::ink::MessageResult<Balance>,
                                        _,
                                    >(
                                        ::core::iter::Iterator::map(
                                            ::core::iter::IntoIterator::into_iter([
                                                "ink",
                                                "MessageResult",
                                            ]),
                                            ::core::convert::AsRef::as_ref,
                                        ),
                                    ),
                                ),
                            )
                            .mutates(false)
                            .payable(false)
                            .default(false)
                            .docs([])
                            .done(),
                        ::ink::metadata::MessageSpec::from_label("balance_of")
                            .selector([0x0F_u8, 0x75_u8, 0x5A_u8, 0x56_u8])
                            .args([
                                ::ink::metadata::MessageParamSpec::new("who")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                            ])
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    ::ink::metadata::TypeSpec::with_name_segs::<
                                        ::ink::MessageResult<Balance>,
                                        _,
                                    >(
                                        ::core::iter::Iterator::map(
                                            ::core::iter::IntoIterator::into_iter([
                                                "ink",
                                                "MessageResult",
                                            ]),
                                            ::core::convert::AsRef::as_ref,
                                        ),
                                    ),
                                ),
                            )
                            .mutates(false)
                            .payable(false)
                            .default(false)
                            .docs([])
                            .done(),
                        ::ink::metadata::MessageSpec::from_label("transfer")
                            .selector([0x84_u8, 0xA1_u8, 0x5D_u8, 0xA1_u8])
                            .args([
                                ::ink::metadata::MessageParamSpec::new("to")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                                ::ink::metadata::MessageParamSpec::new("value")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                            ])
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    ::ink::metadata::TypeSpec::with_name_segs::<
                                        ::ink::MessageResult<Result<()>>,
                                        _,
                                    >(
                                        ::core::iter::Iterator::map(
                                            ::core::iter::IntoIterator::into_iter([
                                                "ink",
                                                "MessageResult",
                                            ]),
                                            ::core::convert::AsRef::as_ref,
                                        ),
                                    ),
                                ),
                            )
                            .mutates(true)
                            .payable(false)
                            .default(false)
                            .docs([])
                            .done(),
                        ::ink::metadata::MessageSpec::from_label("transfer_from")
                            .selector([0x0B_u8, 0x39_u8, 0x6F_u8, 0x18_u8])
                            .args([
                                ::ink::metadata::MessageParamSpec::new("from")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                                ::ink::metadata::MessageParamSpec::new("to")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                                ::ink::metadata::MessageParamSpec::new("value")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                            ])
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    ::ink::metadata::TypeSpec::with_name_segs::<
                                        ::ink::MessageResult<Result<()>>,
                                        _,
                                    >(
                                        ::core::iter::Iterator::map(
                                            ::core::iter::IntoIterator::into_iter([
                                                "ink",
                                                "MessageResult",
                                            ]),
                                            ::core::convert::AsRef::as_ref,
                                        ),
                                    ),
                                ),
                            )
                            .mutates(true)
                            .payable(false)
                            .default(false)
                            .docs([])
                            .done(),
                        ::ink::metadata::MessageSpec::from_label("approve")
                            .selector([0x68_u8, 0x12_u8, 0x66_u8, 0xA0_u8])
                            .args([
                                ::ink::metadata::MessageParamSpec::new("to")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                                ::ink::metadata::MessageParamSpec::new("value")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .done(),
                            ])
                            .returns(
                                ::ink::metadata::ReturnTypeSpec::new(
                                    ::ink::metadata::TypeSpec::with_name_segs::<
                                        ::ink::MessageResult<Result<()>>,
                                        _,
                                    >(
                                        ::core::iter::Iterator::map(
                                            ::core::iter::IntoIterator::into_iter([
                                                "ink",
                                                "MessageResult",
                                            ]),
                                            ::core::convert::AsRef::as_ref,
                                        ),
                                    ),
                                ),
                            )
                            .mutates(true)
                            .payable(false)
                            .default(false)
                            .docs([])
                            .done(),
                    ])
                    .events([
                        ::ink::metadata::EventSpec::new("Transfer")
                            .args([
                                ::ink::metadata::EventParamSpec::new("from")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Option<AccountId>,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Option"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(true)
                                    .docs([])
                                    .done(),
                                ::ink::metadata::EventParamSpec::new("to")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Option<AccountId>,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Option"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(true)
                                    .docs([])
                                    .done(),
                                ::ink::metadata::EventParamSpec::new("value")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(false)
                                    .docs([])
                                    .done(),
                            ])
                            .docs([])
                            .done(),
                        ::ink::metadata::EventSpec::new("Approval")
                            .args([
                                ::ink::metadata::EventParamSpec::new("from")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(true)
                                    .docs([])
                                    .done(),
                                ::ink::metadata::EventParamSpec::new("to")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            AccountId,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(true)
                                    .docs([])
                                    .done(),
                                ::ink::metadata::EventParamSpec::new("value")
                                    .of_type(
                                        ::ink::metadata::TypeSpec::with_name_segs::<
                                            Balance,
                                            _,
                                        >(
                                            ::core::iter::Iterator::map(
                                                ::core::iter::IntoIterator::into_iter(["Balance"]),
                                                ::core::convert::AsRef::as_ref,
                                            ),
                                        ),
                                    )
                                    .indexed(false)
                                    .docs([])
                                    .done(),
                            ])
                            .docs([])
                            .done(),
                    ])
                    .docs([])
                    .lang_error(
                        ::ink::metadata::TypeSpec::with_name_segs::<
                            ::ink::LangError,
                            _,
                        >(
                            ::core::iter::Iterator::map(
                                ::core::iter::IntoIterator::into_iter(["ink", "LangError"]),
                                ::core::convert::AsRef::as_ref,
                            ),
                        ),
                    )
                    .environment(
                        ::ink::metadata::EnvironmentSpec::new()
                            .account_id(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    AccountId,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["AccountId"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .balance(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    Balance,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["Balance"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .hash(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    Hash,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["Hash"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .timestamp(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    Timestamp,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["Timestamp"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .block_number(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    BlockNumber,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["BlockNumber"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .chain_extension(
                                ::ink::metadata::TypeSpec::with_name_segs::<
                                    ChainExtension,
                                    _,
                                >(
                                    ::core::iter::Iterator::map(
                                        ::core::iter::IntoIterator::into_iter(["ChainExtension"]),
                                        ::core::convert::AsRef::as_ref,
                                    ),
                                ),
                            )
                            .max_event_topics(MAX_EVENT_TOPICS)
                            .done(),
                    )
                    .done(),
            )
        }
    };
    use ink::storage::Mapping;
    pub enum Error {
        BalanceTooLow,
        AllowanceTooLow,
    }
    #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
    const _: () = {
        impl ::scale_info::TypeInfo for Error {
            type Identity = Self;
            fn type_info() -> ::scale_info::Type {
                ::scale_info::Type::builder()
                    .path(
                        ::scale_info::Path::new_with_replace(
                            "Error",
                            "erc20::erc20",
                            &[],
                        ),
                    )
                    .type_params(::alloc::vec::Vec::new())
                    .variant(
                        ::scale_info::build::Variants::new()
                            .variant(
                                "BalanceTooLow",
                                |v| v.index(0usize as ::core::primitive::u8),
                            )
                            .variant(
                                "AllowanceTooLow",
                                |v| v.index(1usize as ::core::primitive::u8),
                            ),
                    )
            }
        }
    };
    #[automatically_derived]
    impl ::core::fmt::Debug for Error {
        #[inline]
        fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
            ::core::fmt::Formatter::write_str(
                f,
                match self {
                    Error::BalanceTooLow => "BalanceTooLow",
                    Error::AllowanceTooLow => "AllowanceTooLow",
                },
            )
        }
    }
    #[automatically_derived]
    impl ::core::marker::StructuralPartialEq for Error {}
    #[automatically_derived]
    impl ::core::cmp::PartialEq for Error {
        #[inline]
        fn eq(&self, other: &Error) -> bool {
            let __self_tag = ::core::intrinsics::discriminant_value(self);
            let __arg1_tag = ::core::intrinsics::discriminant_value(other);
            __self_tag == __arg1_tag
        }
    }
    #[automatically_derived]
    impl ::core::marker::StructuralEq for Error {}
    #[automatically_derived]
    impl ::core::cmp::Eq for Error {
        #[inline]
        #[doc(hidden)]
        #[coverage(off)]
        fn assert_receiver_is_total_eq(&self) -> () {}
    }
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Encode for Error {
            fn size_hint(&self) -> usize {
                1_usize
                    + match *self {
                        Error::BalanceTooLow => 0_usize,
                        Error::AllowanceTooLow => 0_usize,
                        _ => 0_usize,
                    }
            }
            fn encode_to<__CodecOutputEdqy: ::scale::Output + ?::core::marker::Sized>(
                &self,
                __codec_dest_edqy: &mut __CodecOutputEdqy,
            ) {
                match *self {
                    Error::BalanceTooLow => {
                        #[allow(clippy::unnecessary_cast)]
                        __codec_dest_edqy.push_byte(0usize as ::core::primitive::u8);
                    }
                    Error::AllowanceTooLow => {
                        #[allow(clippy::unnecessary_cast)]
                        __codec_dest_edqy.push_byte(1usize as ::core::primitive::u8);
                    }
                    _ => {}
                }
            }
        }
        #[automatically_derived]
        impl ::scale::EncodeLike for Error {}
    };
    #[allow(deprecated)]
    const _: () = {
        #[automatically_derived]
        impl ::scale::Decode for Error {
            fn decode<__CodecInputEdqy: ::scale::Input>(
                __codec_input_edqy: &mut __CodecInputEdqy,
            ) -> ::core::result::Result<Self, ::scale::Error> {
                match __codec_input_edqy
                    .read_byte()
                    .map_err(|e| {
                        e.chain("Could not decode `Error`, failed to read variant byte")
                    })?
                {
                    #[allow(clippy::unnecessary_cast)]
                    __codec_x_edqy if __codec_x_edqy
                        == 0usize as ::core::primitive::u8 => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Ok(Error::BalanceTooLow)
                        })();
                    }
                    #[allow(clippy::unnecessary_cast)]
                    __codec_x_edqy if __codec_x_edqy
                        == 1usize as ::core::primitive::u8 => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Ok(Error::AllowanceTooLow)
                        })();
                    }
                    _ => {
                        #[allow(clippy::redundant_closure_call)]
                        return (move || {
                            ::core::result::Result::Err(
                                <_ as ::core::convert::Into<
                                    _,
                                >>::into("Could not decode `Error`, variant doesn't exist"),
                            )
                        })();
                    }
                }
            }
        }
    };
    type Result<T> = core::result::Result<T, Error>;
}
