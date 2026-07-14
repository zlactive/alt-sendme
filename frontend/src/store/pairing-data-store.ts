import { create } from 'zustand'
import { IS_DESKTOP } from '@/lib/platform'
import {
	getDeviceInfo,
	listPairedDevices,
	type DeviceInfo,
	type PairedDevice,
} from '@/lib/pairing-api'
import { useNodeCapabilityStore } from '@/store/node-capability-store'

type PairingDataState = {
	devices: PairedDevice[]
	thisDevice: DeviceInfo | null
	/** True after the first hydrate attempt when the node is ready (or not desktop). */
	hasHydrated: boolean
	setDevices: (
		devices: PairedDevice[] | ((prev: PairedDevice[]) => PairedDevice[])
	) => void
	setThisDevice: (device: DeviceInfo | null) => void
	hydrate: () => Promise<void>
}

export const usePairingDataStore = create<PairingDataState>((set) => ({
	devices: [],
	thisDevice: null,
	hasHydrated: !IS_DESKTOP,
	setDevices: (devices) =>
		set((state) => ({
			devices:
				typeof devices === 'function' ? devices(state.devices) : devices,
		})),
	setThisDevice: (thisDevice) => set({ thisDevice }),
	hydrate: async () => {
		if (!IS_DESKTOP) {
			set({ devices: [], thisDevice: null, hasHydrated: true })
			return
		}

		const { nodeStatus, hasResolved } = useNodeCapabilityStore.getState()
		if (!hasResolved) return
		if (nodeStatus.status !== 'ready') {
			set({ devices: [], thisDevice: null, hasHydrated: true })
			return
		}

		try {
			const [devices, thisDevice] = await Promise.all([
				listPairedDevices(),
				getDeviceInfo(),
			])
			set({
				devices,
				thisDevice,
				hasHydrated: true,
			})
		} catch (error) {
			console.error('Failed to hydrate pairing data:', error)
			// Still mark hydrated so the UI can settle rather than spinning forever.
			set({ hasHydrated: true })
		}
	},
}))

/** Kick off node status + pairing preload without needing a mounted consumer. */
export async function preloadPairingData() {
	if (!IS_DESKTOP) return
	await useNodeCapabilityStore.getState().refresh()
	await usePairingDataStore.getState().hydrate()
}
