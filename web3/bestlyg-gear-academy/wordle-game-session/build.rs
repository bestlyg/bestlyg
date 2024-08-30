use wordle_game_session_io::WordleSessionMetadata as Metadata;

fn main() {
    gear_wasm_builder::build_with_metadata::<Metadata>();
}
