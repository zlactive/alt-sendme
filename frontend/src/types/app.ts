export type AppTheme =
	| 'auto'
	| 'light'
	| 'dark'
	| 'midnight'
	| 'paper'
	| 'ocean'
	| 'forest'
	| 'high-contrast'

export const APP_THEMES: AppTheme[] = [
	'auto',
	'light',
	'dark',
	'midnight',
	'paper',
	'ocean',
	'forest',
	'high-contrast',
]

export const NAMED_THEMES = [
	'midnight',
	'paper',
	'ocean',
	'forest',
	'high-contrast',
] as const satisfies readonly AppTheme[]

export type NamedTheme = (typeof NAMED_THEMES)[number]

/** Themes that use the dark surface base (`.dark` class). */
export const DARK_BASE_THEMES = new Set<AppTheme>([
	'dark',
	'midnight',
	'ocean',
	'high-contrast',
])

export const THEME_LABELS: Record<AppTheme, string> = {
	auto: 'Auto',
	light: 'Light',
	dark: 'Dark',
	midnight: 'Midnight',
	paper: 'Paper',
	ocean: 'Ocean',
	forest: 'Forest',
	'high-contrast': 'High Contrast',
}

export function isNamedTheme(theme: AppTheme): theme is NamedTheme {
	return (NAMED_THEMES as readonly string[]).includes(theme)
}

export function resolveColorMode(
	theme: AppTheme,
	prefersDark = false
): 'dark' | 'light' {
	if (theme === 'auto') {
		return prefersDark ? 'dark' : 'light'
	}
	return DARK_BASE_THEMES.has(theme) ? 'dark' : 'light'
}
