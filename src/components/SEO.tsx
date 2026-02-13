import { useEffect } from 'react'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
}

function ensureMeta(selector: string, createTag: () => HTMLElement) {
  let el = document.querySelector(selector) as HTMLElement | null
  if (!el) {
    el = createTag()
    document.head.appendChild(el)
  }
  return el
}

export function SEO({
  title,
  description,
  image = '/techscube-seo-logo.svg',
  url = 'https://techscube.in/',
}: Props) {
  useEffect(() => {
    const prevTitle = document.title
    const fullTitle = title ? `${title} • TECH S-CUBE` : 'TECH S-CUBE — Future‑Ready Skills & Practical Training'
    document.title = fullTitle

    const prev: Array<{ el: Element; attr: string; prevValue: string | null }> = []

    const setMeta = (selector: string, attr: string, value: string, createTag: () => HTMLElement) => {
      const el = ensureMeta(selector, createTag)
      const prevValue = el.getAttribute(attr)
      prev.push({ el, attr, prevValue })
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description || 'TECH S-CUBE empowers learners with practical, industry-relevant training — web development, design, cloud, AI and more.', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    })

    setMeta('meta[name="keywords"]', 'content', 'TechSCube, TECH S-CUBE, Tech S Cube, Salem IT company, IT training Salem, web development Salem', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'keywords')
      return m
    })

    setMeta('meta[property="og:title"]', 'content', fullTitle, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:title')
      return m
    })

    setMeta('meta[property="og:description"]', 'content', description || '', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:description')
      return m
    })

    setMeta('meta[property="og:image"]', 'content', image, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:image')
      return m
    })

    setMeta('meta[property="og:url"]', 'content', url, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:url')
      return m
    })

    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:card')
      return m
    })

    setMeta('meta[name="twitter:title"]', 'content', fullTitle, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:title')
      return m
    })

    setMeta('meta[name="twitter:description"]', 'content', description || '', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:description')
      return m
    })

    setMeta('meta[name="twitter:image"]', 'content', image, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'twitter:image')
      return m
    })

    // canonical link
    const linkSelector = 'link[rel="canonical"]'
    let canonical = document.querySelector(linkSelector) as HTMLLinkElement | null
    let createdCanonical = false
    let prevCanonical: string | null = null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
      createdCanonical = true
    }
    prevCanonical = canonical.getAttribute('href')
    canonical.setAttribute('href', url)

    return () => {
      document.title = prevTitle
      // restore previous meta attributes
      for (const p of prev) {
        if (p.prevValue === null) p.el.removeAttribute(p.attr)
        else p.el.setAttribute(p.attr, p.prevValue)
      }
      if (createdCanonical && canonical) canonical.remove()
      else if (canonical && prevCanonical !== null) canonical.setAttribute('href', prevCanonical)
    }
  }, [title, description, image, url])

  return null
}

export default SEO
