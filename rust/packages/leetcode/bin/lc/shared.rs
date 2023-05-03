use std::path::PathBuf;

pub(crate) static DIR_PATH: tokio::sync::OnceCell<PathBuf> = tokio::sync::OnceCell::const_new();
