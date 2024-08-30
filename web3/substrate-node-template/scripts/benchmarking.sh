./target/release/node-template benchmark pallet \
--chain dev \
--wasm-execution compiled \
--pallet pallet_poe  \
--extrinsic "*" \
--steps 20 \
--repeat 10 \
--json-file=raw.json \
--output ./pallets/poe/src/weights.rs \
--template .maintain/frame-weight-template.hbs