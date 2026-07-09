import { useTranslation } from '@/i18n'
import { handleExternalLinkClick } from '@/lib/openExternalUrl'
import {
	COMMUNITY_LINK,
	COMPARE_PAGE_LINK,
	DONATE_LINK,
	DOWNLOAD_PAGE_LINK,
	GITHUB_REPO_LINK,
	WEBSITE_LINK,
} from '@/lib/version'
import { cn } from '@/lib/utils'

const linkClassName = cn(
	'text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4',
	'transition-colors hover:text-foreground hover:decoration-foreground/50'
)

const links = [
	{ href: DOWNLOAD_PAGE_LINK, labelKey: 'webPromo.download' },
	{ href: WEBSITE_LINK, labelKey: 'webPromo.website' },
	{ href: COMPARE_PAGE_LINK, labelKey: 'webPromo.compare' },
	{ href: COMMUNITY_LINK, labelKey: 'webPromo.community' },
	{ href: GITHUB_REPO_LINK, labelKey: 'webPromo.github' },
	{ href: DONATE_LINK, labelKey: 'webPromo.buyMeACoffee' },
] as const

const bodyTextClassName =
	'w-full max-w-full text-[11px] leading-snug text-muted-foreground'

export function WebPromoPanel() {
	const { t } = useTranslation('common')

	return (
		<aside className="web-promo-panel flex-col gap-2 pt-1">
			<p className={bodyTextClassName}>{t('webPromo.notice')}</p>
			<nav
				className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
				aria-label={t('webPromo.linksLabel')}
			>
				{links.map(({ href, labelKey }) => (
					<a
						key={href}
						href={href}
						onClick={(event) => handleExternalLinkClick(event, href)}
						target="_blank"
						rel="noopener noreferrer"
						className={linkClassName}
					>
						{t(labelKey)}
					</a>
				))}
			</nav>
		</aside>
	)
}
