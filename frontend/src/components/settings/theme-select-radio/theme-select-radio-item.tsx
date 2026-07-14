import type React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'
import { LazyIcon } from '../../icons'
import {
	DARK_BASE_THEMES,
	THEME_LABELS,
	isNamedTheme,
	type AppTheme,
} from '../../../types/app'
import { AnimatePresence } from 'framer-motion'

export type Props = {
	theme: AppTheme
	onSelect: (value: AppTheme) => void
	isSelected: boolean
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'>

function previewUsesDarkClass(theme: AppTheme) {
	return DARK_BASE_THEMES.has(theme)
}

export function ThemeSelectRadioItem(props: Props) {
	const { theme, onSelect, isSelected, className, ...rest } = props
	const named = isNamedTheme(theme)

	return (
		<div
			data-selected={isSelected}
			className={cn(
				'relative flex flex-col items-center gap-3 cursor-pointer group',
				className
			)}
			onClick={() => onSelect(theme)}
			{...rest}
		>
			<div
				className={cn(
					'bg-card shadow-sm sm:size-32 lg:size-36 xl:size-40 size-28 overflow-hidden border rounded-xl border-border transition-all',
					'hover:border-input outline-2 outline-transparent',
					isSelected && 'outline-success outline-offset-2',
					previewUsesDarkClass(theme) && 'dark'
				)}
				{...(named ? { 'data-theme': theme } : {})}
				style={
					theme === 'light'
						? ({
								'--card': '#f5f5f5',
								'--border': '#e5e7eb',
							} as React.CSSProperties)
						: {}
				}
			>
				{/* Drawn larger, then scaled down so skeleton chrome stays readable */}
				<div
					className={cn(
						'relative flex size-[148%] origin-top-left scale-[0.68] gap-2 p-3',
						theme === 'auto' && 'z-10'
					)}
				>
					{/* Left Panel Preview */}
					<div
						className="relative flex min-w-0 flex-1 flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm"
						style={
							theme === 'auto'
								? ({
										'--card': '#f5f5f5',
										'--card-foreground': '#0f172a',
										'--primary': '#0f172a',
									} as React.CSSProperties)
								: {}
						}
					>
						<div className="flex-1 p-0">
							<div className="divide-y divide-border">
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: no better key available
										key={i}
										className="flex items-center gap-2 p-2.5"
									>
										<div className="size-2.5 shrink-0 rounded-xs bg-muted-foreground/40"></div>
										<div className="h-1.5 flex-1 rounded-full bg-muted-foreground/40"></div>
										<div className="h-1.5 flex-1 rounded-full bg-muted-foreground/20"></div>
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Right Panel Preview */}
					<div
						className="relative flex h-full w-[34%] shrink-0 flex-col rounded-xl border border-border bg-card text-card-foreground shadow-sm"
						style={
							theme === 'auto'
								? ({
										'--card': '#161616',
										'--card-foreground': '#f8f8f8',
										'--primary': 'white',
									} as React.CSSProperties)
								: {}
						}
					>
						<div className="flex flex-1 flex-col gap-3 p-3">
							<div className="flex flex-1 flex-col gap-2">
								<div className="h-1.5 w-[60%] rounded-full bg-muted-foreground/40"></div>
								<div className="h-1.5 rounded-full bg-muted-foreground/20"></div>
								<div className="h-1.5 w-[75%] rounded-full bg-muted-foreground/20"></div>
							</div>
							<div className="flex items-center justify-end">
								<div className="h-3.5 w-7 rounded-xs bg-primary"></div>
							</div>
						</div>
					</div>
				</div>

				<AnimatePresence>
					{isSelected && (
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.5,
								filter: 'blur(4px)',
							}}
							animate={{
								opacity: 1,
								scale: 1,
								filter: 'blur(0px)',
							}}
							exit={{
								opacity: 0,
								scale: 0.5,
								filter: 'blur(4px)',
							}}
							transition={{ duration: 0.325, ease: 'easeInOut' }}
							className="absolute -top-3 -right-3 rounded-full border-card border-2 bg-card"
						>
							<LazyIcon
								name="CheckCircle"
								weight="fill"
								className="text-success size-6"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<span
				className={cn(
					'text-sm font-medium',
					isSelected ? 'text-foreground' : 'text-muted-foreground'
				)}
			>
				{THEME_LABELS[theme]}
			</span>
		</div>
	)
}
