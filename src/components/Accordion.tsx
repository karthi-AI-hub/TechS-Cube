import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/ui'

type Item = { title: string; content: string }

export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number }) {
	const [open, setOpen] = useState<number>(defaultOpen)
	const baseId = useId()
	const refs = useRef<Array<HTMLDivElement | null>>([])
	const heights = useMemo(() => items.map(() => 0), [items.length])

	useEffect(() => {
		// Measure content heights once on mount and on resize.
		const measure = () => {
			refs.current.forEach((el, idx) => {
				if (!el) return
				;(heights as number[])[idx] = el.scrollHeight
			})
		}
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	}, [heights])

	return (
		<div className="space-y-3">
			{items.map((it, idx) => {
				const isOpen = open === idx
				const panelId = `${baseId}-panel-${idx}`
				const btnId = `${baseId}-btn-${idx}`
				return (
					<div key={it.title} className="rounded-2xl border border-brandS/10 bg-white shadow-soft">
						<button
							id={btnId}
							className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
							onClick={() => setOpen(isOpen ? -1 : idx)}
							aria-expanded={isOpen}
							aria-controls={panelId}
						>
							<span className="text-sm font-semibold text-brandS">{it.title}</span>
							<span
								className={cn(
									'inline-flex h-8 w-8 items-center justify-center rounded-full border text-brandS transition',
									isOpen ? 'rotate-45 border-brand3 bg-brand3 text-white' : 'border-brandS/15 bg-white',
								)}
								aria-hidden="true"
							>
								+
							</span>
						</button>

						<div
							id={panelId}
							role="region"
							aria-labelledby={btnId}
							className="overflow-hidden px-5"
							style={{
								maxHeight: isOpen ? (heights[idx] ?? 999) : 0,
								transition: 'max-height 380ms ease',
							}}
						>
							<div
								ref={(el) => {
									refs.current[idx] = el
								}}
								className="pb-5 text-sm leading-6 text-brandS/70"
							>
								{it.content}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
