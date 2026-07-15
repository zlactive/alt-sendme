use serde::{Deserialize, Serialize};
use tauri::ipc::Channel;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SelectDonwloadFolderResponse {
    pub uri: String,
    pub path: String,
}

#[derive(Serialize)]
pub struct SelectItemArgs {
    pub channel: Channel,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AsyncJob {
    pub channel_id: i64,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExportToTreeArgs {
    pub tree_uri: String,
    pub source_dir: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OpenDownloadFolderArgs {
    pub tree_uri: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExportToTreeConflict {
    pub original: String,
    pub resolved: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExportToTreeResult {
    pub exported_count: u32,
    pub conflicts: Vec<ExportToTreeConflict>,
}

/// Temporary diagnostic snapshot of the Android share-intent state, surfaced
/// directly in the app UI when device logs aren't available for debugging.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ShareDebugSnapshot {
    pub action: Option<String>,
    #[serde(rename = "type")]
    pub mime_type: Option<String>,
    pub has_stream: bool,
    pub has_clip_data: bool,
    pub data_string: Option<String>,
    pub extracted_uri: Option<String>,
    pub pending_uri_present: bool,
}
