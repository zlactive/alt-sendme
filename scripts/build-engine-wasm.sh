#!/usr/bin/env bash
# Build engine-wasm for the browser (wasm32-unknown-unknown).
#
# ring (iroh tls-ring) compiles C code for wasm32; Apple clang does not support
# that target. Use LLVM clang instead:
#   brew install llvm   # macOS
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${CC:-}" ]]; then
	if [[ -x /opt/homebrew/opt/llvm/bin/clang ]]; then
		export CC=/opt/homebrew/opt/llvm/bin/clang
	elif [[ -x /usr/local/opt/llvm/bin/clang ]]; then
		export CC=/usr/local/opt/llvm/bin/clang
	fi
fi

cd "$ROOT/engine-wasm"
exec cargo build --target wasm32-unknown-unknown "$@"
