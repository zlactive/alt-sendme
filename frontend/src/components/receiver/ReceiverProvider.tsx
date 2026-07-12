import { createContext, useContext } from 'react'
import { useReceiver, type UseReceiverReturn } from '@/hooks/useReceiver'

const ReceiverContext = createContext<UseReceiverReturn | null>(null)

/** Keeps receive handlers alive across routes (e.g. settings) so paired invites can be accepted globally. */
export function ReceiverProvider({ children }: { children: React.ReactNode }) {
	const receiver = useReceiver()
	return (
		<ReceiverContext.Provider value={receiver}>
			{children}
		</ReceiverContext.Provider>
	)
}

export function useReceiverContext(): UseReceiverReturn {
	const context = useContext(ReceiverContext)
	if (!context) {
		throw new Error('useReceiverContext must be used within ReceiverProvider')
	}
	return context
}
