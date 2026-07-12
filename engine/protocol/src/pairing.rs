//! Pairing session constants and helpers.

pub const PAIRING_VOTE_TIMEOUT_SECS: u64 = 120;

/// How often the node probes paired devices for reachability.
pub const PRESENCE_INTERVAL_SECS: u64 = 45;

/// Connect timeout for a single presence probe.
pub const PRESENCE_CONNECT_TIMEOUT_SECS: u64 = 8;

/// When `ttl_secs` is [`None`], the pairing host stays open until explicitly stopped
/// (e.g. during an active share session). `Some(n)` starts a timed window.
pub fn pairing_host_is_persistent(ttl_secs: Option<u64>) -> bool {
    ttl_secs.is_none()
}
