//! Thin WASM entry point for browser builds.
//! M1: smoke-test that iroh can bind an endpoint in wasm32.

use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn init() {
    console_error_panic_hook::set_once();
}

/// Bind a relay-only iroh endpoint and return its node id (smoke test).
#[wasm_bindgen]
pub async fn smoke_test_endpoint() -> Result<String, JsValue> {
    use iroh::endpoint::presets;
    use iroh::Endpoint;

    let endpoint = Endpoint::builder(presets::N0)
        .bind()
        .await
        .map_err(|e| JsValue::from_str(&format!("endpoint bind failed: {e}")))?;

    let id = endpoint.id().to_string();
    endpoint.close().await;
    Ok(id)
}
