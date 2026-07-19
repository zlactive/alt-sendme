//! Native filesystem blob store creation.

use crate::types::AutoCleanupDir;
use anyhow::Context;
use data_encoding::HEXLOWER;
use iroh_blobs::store::fs::FsStore;
use rand::RngExt;
use std::path::{Path, PathBuf};

/// Returns the base temp directory for sendme store files.
///
/// On Android, the app sets `ALT_SENDME_TEMP_DIR` to the app's cache dir
/// (`/data/data/com.altsendme/cache/`) because `std::env::temp_dir()` returns
/// the unwritable `/data/local/tmp/`. Desktop platforms fall back to the
/// standard system temp directory.
fn sendme_temp_dir() -> PathBuf {
    std::env::var("ALT_SENDME_TEMP_DIR")
        .map(PathBuf::from)
        .unwrap_or_else(|_| std::env::temp_dir())
}

pub fn new_send_blobs_dir() -> PathBuf {
    let suffix = rand::rng().random::<[u8; 16]>();
    sendme_temp_dir().join(format!(".sendme-send-{}", HEXLOWER.encode(&suffix)))
}

pub async fn create_send_store(dir: &Path) -> anyhow::Result<FsStore> {
    tokio::fs::create_dir_all(dir)
        .await
        .with_context(|| format!("failed to create send store dir {}", dir.display()))?;
    FsStore::load(dir)
        .await
        .with_context(|| format!("failed to load send store at {}", dir.display()))
}

pub async fn create_recv_store(hash_hex: &str) -> anyhow::Result<(FsStore, PathBuf)> {
    let dir_name = format!(".sendme-recv-{}", hash_hex);
    let path = sendme_temp_dir().join(dir_name);
    let store = FsStore::load(&path)
        .await
        .with_context(|| format!("failed to load recv store at {}", path.display()))?;
    Ok((store, path))
}

pub fn recv_cleanup_guard(path: PathBuf) -> AutoCleanupDir {
    AutoCleanupDir::new(path)
}
