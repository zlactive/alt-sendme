import { useEffect } from 'react'
import {
	SettingSidebarContent,
	SettingSidebarCore,
	SettingSidebarFooter,
	SettingSidebarHeader,
	SettingSidebarRoot,
	SettingSidebarTitle,
} from './setting-sidebar'
import { SettingSidebarUpdateAlert } from './setting-sidebar-update-alert'
import { IS_WEB } from '@/lib/platform'
import { cn } from '@/lib/utils'
import { useSidebar } from '../ui/sidebar'

export default function SettingSidebar() {
	const { isMobile, setOpenMobile } = useSidebar()

	// On mobile, open the nav sheet as soon as settings is entered so users
	// land on navigation rather than a settings section behind a closed panel.
	useEffect(() => {
		if (isMobile) {
			setOpenMobile(true)
		}
	}, [isMobile, setOpenMobile])

	return (
		<SettingSidebarRoot
			className={cn(IS_WEB ? 'h-full' : 'h-[calc(100svh)]')}
			variant="floating"
		>
			<SettingSidebarHeader className="border-b">
				<SettingSidebarTitle prev="/" />
			</SettingSidebarHeader>
			<SettingSidebarContent>
				<SettingSidebarCore />
			</SettingSidebarContent>
			<SettingSidebarUpdateAlert />
			<SettingSidebarFooter />
		</SettingSidebarRoot>
	)
}
