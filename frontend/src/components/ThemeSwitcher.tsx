import { useThemeStore } from '../store'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Toggle } from './ui/toggle'

export function ThemeSwitcher() {
	const { setTheme, isDark } = useThemeStore()
	const setChecked = (checked: boolean) => {
		setTheme(checked ? 'dark' : 'light')
	}
	return (
		<div>
			<Toggle
				aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
				className="group data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
				onPressedChange={() => setChecked(!isDark)}
				data-state={isDark ? 'on' : 'off'}
				pressed={isDark}
				size="sm"
			>
				<MoonIcon
					aria-hidden="true"
					className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
					size={16}
				/>
				<SunIcon
					aria-hidden="true"
					className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
					size={16}
				/>
			</Toggle>
		</div>
	)
}
