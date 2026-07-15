const COMMANDS: &[&str] = &[
    "select_download_folder",
    "select_send_document",
    "select_send_folder",
    "consume_share_intent",
    "debug_share_snapshot",
    "cancel_job",
    "export_to_tree",
    "open_download_folder",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS)
        .android_path("android")
        .ios_path("ios")
        .build();
}
