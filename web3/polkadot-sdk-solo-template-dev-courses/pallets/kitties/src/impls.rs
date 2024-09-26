use frame_support::pallet_macros::pallet_section;

/// Define the implementation of the pallet, like helper functions.
#[pallet_section]
mod impls {
    use sp_runtime::offchain::{http, Duration};

    impl<T: Config> Pallet<T> {
        // get a random 256.
        // fn random_value(who: &T::AccountId) -> [u8; 16] {
        //     let nonce = frame_system::Pallet::<T>::account_nonce(&who);
        //     // let nonce_u32: u32 = nonce as u32;
        //     // generate a random value based on account and its nonce
        //     let nonce_u32: u32 = TryInto::try_into(nonce).ok().expect("nonce is u64; qed");
        //     let a: BlockNumberFor<T> = TryFrom::try_from(nonce_u32)
        //         .ok()
        //         .expect("nonce is u32; qed");
        //     payload.using_encoded(blake2_128)
        //     // [0_u8; 16]
        // }
        fn random_value(who: &T::AccountId) -> [u8; 16] {
            let nonce = frame_system::Pallet::<T>::account_nonce(&who);
            // let nonce_u32: u32 = nonce as u32;
            // generate a random value based on account and its nonce
            let nonce_u32: u32 = TryInto::try_into(nonce).ok().expect("nonce is u64; qed");
            let a: BlockNumberFor<T> = TryFrom::try_from(nonce_u32)
                .ok()
                .expect("nonce is u32; qed");
            let payload = (
                T::Randomness::random_seed(),
                &a,
                <frame_system::Pallet<T>>::extrinsic_index(),
            );
            payload.using_encoded(blake2_128)
        }

        fn get_next_id() -> Result<KittyId, DispatchError> {
            NextKittyId::<T>::try_mutate(|next_id| -> Result<KittyId, DispatchError> {
                let current_id = *next_id;
                *next_id = next_id
                    .checked_add(1)
                    .ok_or::<DispatchError>(Error::<T>::InvalidKittyId.into())?;
                Ok(current_id)
            })
        }

        /// Fetch current price and return the result in cents.
        fn fetch_price() -> Result<u32, http::Error> {
            // We want to keep the offchain worker execution time reasonable, so we set a hard-coded
            // deadline to 2s to complete the external call.
            // You can also wait indefinitely for the response, however you may still get a timeout
            // coming from the host machine.
            let deadline = sp_io::offchain::timestamp().add(Duration::from_millis(2_000));
            // Initiate an external HTTP GET request.
            // This is using high-level wrappers from `sp_runtime`, for the low-level calls that
            // you can find in `sp_io`. The API is trying to be similar to `request`, but
            // since we are running in a custom WASM execution environment we can't simply
            // import the library here.
            let request = http::Request::get(
                "https://min-api.cryptocompare.com/data/price?fsym=DOT&tsyms=USD",
            );
            // We set the deadline for sending of the request, note that awaiting response can
            // have a separate deadline. Next we send the request, before that it's also possible
            // to alter request headers or stream body content in case of non-GET requests.
            let pending = request
                .deadline(deadline)
                .send()
                .map_err(|_| http::Error::IoError)?;

            // The request is already being processed by the host, we are free to do anything
            // else in the worker (we can send multiple concurrent requests too).
            // At some point however we probably want to check the response though,
            // so we can block current thread and wait for it to finish.
            // Note that since the request is being driven by the host, we don't have to wait
            // for the request to have it complete, we will just not read the response.
            let response = pending
                .try_wait(deadline)
                .map_err(|_| http::Error::DeadlineReached)??;
            // Let's check the status code before we proceed to reading the response.
            if response.code != 200 {
                log::warn!("Unexpected status code: {}", response.code);
                return Err(http::Error::Unknown);
            }

            // Next we want to fully read the response body and collect it to a vector of bytes.
            // Note that the return object allows you to read the body in chunks as well
            // with a way to control the deadline.
            let body = response.body().collect::<Vec<u8>>();

            // Create a str slice from the body.
            let body_str = alloc::str::from_utf8(&body).map_err(|_| {
                log::warn!("No UTF8 body");
                http::Error::Unknown
            })?;

            let price = match Self::parse_price(body_str) {
                Some(price) => Ok(price),
                None => {
                    log::warn!("Unable to extract price from the response: {:?}", body_str);
                    Err(http::Error::Unknown)
                }
            }?;

            log::warn!("Got price: {} cents", price);

            Ok(price)
        }

        /// Parse the price from the given JSON string using `lite-json`.
        ///
        /// Returns `None` when parsing failed or `Some(price in cents)` when parsing is successful.
        fn parse_price(price_str: &str) -> Option<u32> {
            let val = lite_json::parse_json(price_str);
            let price = match val.ok()? {
                lite_json::json::JsonValue::Object(obj) => {
                    let (_, v) = obj
                        .into_iter()
                        .find(|(k, _)| k.iter().copied().eq("USD".chars()))?;
                    match v {
                        lite_json::json::JsonValue::Number(number) => number,
                        _ => return None,
                    }
                }
                _ => return None,
            };

            let exp = price.fraction_length.saturating_sub(2);
            Some(price.integer as u32 * 100 + (price.fraction / 10_u64.pow(exp)) as u32)
        }
    }
}
