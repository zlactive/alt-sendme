import { useState } from 'react'
import { useTranslation } from '../../i18n/react-i18next-compat'
import type { SharingControlsProps } from '../../types/sender'
import { IS_DESKTOP } from '@/lib/platform'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetPanel,
	SheetTitle,
} from '../ui/sheet'
import { PairedDevicesPanel } from './PairedDevicesPanel'
import { ShareLinkPanel } from './ShareLinkPanel'

export function SharingActiveCard({
	selectedPaths,
	selectedPath,
	ticket,
	copySuccess,
	transferProgress,
	isTransporting,
	isCompleted,
	isBroadcastMode,
	activeConnectionCount = 0,
	pairedDevices = [],
	isNodeReady = false,
	pairedInviteStatus = {},
	onInvitePairedDevice,
	onCopyTicket,
	onStopSharing,
	onSetBroadcast,
}: SharingControlsProps) {
	const { t } = useTranslation()
	const [devicesOpen, setDevicesOpen] = useState(false)

	return (
		<>
			<ShareLinkPanel
				selectedPaths={selectedPaths}
				selectedPath={selectedPath}
				ticket={ticket}
				copySuccess={copySuccess}
				isTransporting={isTransporting}
				isCompleted={isCompleted}
				isBroadcastMode={isBroadcastMode}
				activeConnectionCount={activeConnectionCount}
				transferProgress={transferProgress}
				onCopyTicket={onCopyTicket}
				onSetBroadcast={onSetBroadcast}
				onStopSharing={onStopSharing}
				showPairedDevicesOption={IS_DESKTOP}
				onOpenPairedDevices={() => setDevicesOpen(true)}
			/>

			{IS_DESKTOP ? (
				<Sheet open={devicesOpen} onOpenChange={setDevicesOpen}>
					<SheetContent side="right" inset className="sm:max-w-md">
						<SheetHeader>
							<SheetTitle>
								{t('common:sender.sharingActive.devices.title')}
							</SheetTitle>
							<SheetDescription>
								{t('common:sender.sharingActive.devices.hint')}
							</SheetDescription>
						</SheetHeader>
						<SheetPanel className="min-h-0 flex-1">
							<PairedDevicesPanel
								pairedDevices={pairedDevices}
								pairedInviteStatus={pairedInviteStatus}
								isNodeReady={isNodeReady}
								hasTicket={Boolean(ticket)}
								onInvitePairedDevice={onInvitePairedDevice}
								showHeader={false}
								showSearch
								isOpen={devicesOpen}
							/>
						</SheetPanel>
					</SheetContent>
				</Sheet>
			) : null}
		</>
	)
}
