export function cn(...parts: Array<string | false | null | undefined>) {
	return parts.filter(Boolean).join(' ')
}

export function smoothScrollToHash(hash: string) {
	const id = hash.replace('#', '')
	const el = document.getElementById(id)
	if (!el) return
	el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
