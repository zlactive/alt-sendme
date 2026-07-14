const STORAGE_KEY = 'altsendme-paired-send-counts'

export type PairedSendCounts = Record<string, number>

function normalizeId(endpointId: string): string {
	return endpointId.toLowerCase()
}

export function getPairedSendCounts(): PairedSendCounts {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return {}
		const parsed = JSON.parse(raw) as unknown
		if (!parsed || typeof parsed !== 'object') return {}
		const counts: PairedSendCounts = {}
		for (const [key, value] of Object.entries(parsed)) {
			if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
				counts[normalizeId(key)] = Math.floor(value)
			}
		}
		return counts
	} catch {
		return {}
	}
}

export function getPairedSendCount(endpointId: string): number {
	return getPairedSendCounts()[normalizeId(endpointId)] ?? 0
}

export function incrementPairedSendCount(endpointId: string): number {
	const id = normalizeId(endpointId)
	const counts = getPairedSendCounts()
	const next = (counts[id] ?? 0) + 1
	counts[id] = next
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))
	} catch {
		// Ignore quota / private-mode failures; ranking just won't persist.
	}
	return next
}
