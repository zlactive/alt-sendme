//! Temporary verbose tracing for the desktop pairing feature.
//! Grep terminal output with `pairing-dev`. Safe to delete when pairing stabilizes.

#[macro_export]
macro_rules! pairing_dev {
    ($step:literal $(, $($rest:tt)*)?) => {
        tracing::info!(target: "pairing-dev", step = $step $(, $($rest)*)?, "pairing-dev")
    };
}

#[macro_export]
macro_rules! pairing_dev_warn {
    ($step:literal $(, $($rest:tt)*)?) => {
        tracing::warn!(target: "pairing-dev", step = $step $(, $($rest)*)?, "pairing-dev")
    };
}
