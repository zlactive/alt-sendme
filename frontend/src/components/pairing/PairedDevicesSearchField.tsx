import type { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from '../../i18n/react-i18next-compat'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

type SearchNamespace = 'sender' | 'settings'

interface PairedDevicesSearchFieldProps {
	value: string
	onChange: (value: string) => void
	namespace?: SearchNamespace
	className?: string
}

export function PairedDevicesSearchField({
	value,
	onChange,
	namespace = 'sender',
	className,
}: PairedDevicesSearchFieldProps) {
	const { t } = useTranslation()
	const translationPrefix =
		namespace === 'settings'
			? 'common:settings.devices'
			: 'common:sender.sharingActive.devices'

	return (
		<div className={className}>
			<InputGroup>
				<InputGroupAddon align="inline-start">
					<Search className="h-4 w-4 text-muted-foreground" />
				</InputGroupAddon>
				<InputGroupInput
					type="search"
					value={value}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						onChange(event.target.value)
					}
					placeholder={t(`${translationPrefix}.searchPlaceholder`)}
					aria-label={t(`${translationPrefix}.searchPlaceholder`)}
				/>
			</InputGroup>
		</div>
	)
}
