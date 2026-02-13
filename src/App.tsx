import { useEffect, useMemo, useRef, useState } from 'react'
import { Accordion } from './components/Accordion'
import { CountUpNumber } from './components/CountUpNumber'
import { smoothScrollToHash } from './lib/ui'

type CourseCategory = 'Technical' | 'Basic' | 'Graphic Designing' | 'Non-Technical'

const BRAND = {
  name: 'TECH S-CUBE',
  tagline: 'Enterprise IT Solutions & Digital Innovation',
  primary: 'rgb(0 46 70)',
  accent: 'rgb(221 130 47)',
}

const technicalCourses = [
  'Full Stack Development',
  'Enterprise Application Development',
  'Cloud Computing & DevOps',
  'Python & Data Engineering',
  'Data Science & Analytics',
  'Artificial Intelligence & ML',
  'Cybersecurity Solutions',
  'Blockchain Technology',
  'IoT & Edge Computing',
  'Microservices Architecture',
]

const basicCourses = ['IT Fundamentals & Programming', 'Database Management Systems', 'Network Administration']

const graphicCourses = ['UI/UX Design & Prototyping', 'Digital Design & Branding', 'Motion Graphics & Animation']

const nonTechnicalCourses = [
  'Digital Marketing & SEO',
  'Business Analysis & Strategy',
  'Project Management (Agile/Scrum)',
  'IT Service Management',
  'Cloud Solutions Architecture',
]

const services = [
  {
    title: 'Custom Software Development',
    desc: 'Tailored enterprise solutions built with cutting-edge technologies to meet your unique business requirements.',
    icon: 'code',
  },
  {
    title: 'Cloud Solutions & Infrastructure',
    desc: 'Scalable cloud architecture, migration services, and managed cloud infrastructure for modern enterprises.',
    icon: 'cloud',
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation, predictive analytics, and AI-powered solutions to transform your business operations.',
    icon: 'ai',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications with seamless user experience and robust performance.',
    icon: 'mobile',
  },
  {
    title: 'Digital Transformation',
    desc: 'End-to-end digital transformation consulting to modernize processes and accelerate business growth.',
    icon: 'transform',
  },
  {
    title: 'IT Consulting & Strategy',
    desc: 'Strategic technology consulting to align IT investments with business objectives and industry best practices.',
    icon: 'strategy',
  },
]

const contact = {
  phone: '+91 98656 82992',
  addressLine1: '43/3, Rani Anna Nagar,',
  addressLine2: 'Chinnathirupathi, Salem - 636 008.',
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

function useRevealOnScroll() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window) || els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.revealed = 'true'
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [reduced])
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-current/25 bg-white/15 px-3 py-1 text-xs font-medium text-current">
      {children}
    </span>
  )
}

function Icon({ kind }: { kind: 'spark' | 'bolt' | 'cube' | 'chat' }) {
  const cls = 'h-5 w-5'
  switch (kind) {
    case 'spark':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.6 6.1L20 10l-6.4 1.9L12 18l-1.6-6.1L4 10l6.4-1.9L12 2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'bolt':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'cube':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l8 4v12l-8 4-8-4V6l8-4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 22V10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 6l-8 4-8-4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'chat':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5h16v10H7l-3 3V5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M7 9h10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 12h7" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
  }
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-xs font-semibold tracking-[0.22em] text-brand3/90">{kicker}</p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-brandS sm:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-sm leading-6 text-brandS/75">{desc}</p> : null}
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('Technical')
  const [mobileMenu, setMobileMenu] = useState(false)
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement | null>(null)
  useRevealOnScroll()

  const courseMap = useMemo(() => {
    return {
      Technical: technicalCourses,
      Basic: basicCourses,
      'Graphic Designing': graphicCourses,
      'Non-Technical': nonTechnicalCourses,
    } satisfies Record<CourseCategory, string[]>
  }, [])

  const faqs = [
    {
      title: 'What makes TECH S-CUBE different?',
      content:
        'We focus on practical, industry-relevant learning with an immersive workshop approach—so you build skills you can actually use.',
    },
    {
      title: 'Are courses beginner-friendly?',
      content:
        'Yes. We offer Basic courses (DCA/PGDCA, C/C++/Java) and progress into professional Technical tracks.',
    },
    {
      title: 'Do you provide project support?',
      content:
        'Yes—web hosting, domain registration, project work guidance, plus network troubleshooting & IT support services.',
    },
  ]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenu(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!heroRef.current || reduced) return
    const el = heroRef.current
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${Math.round(x * 100)}%`)
        el.style.setProperty('--py', `${Math.round(y * 100)}%`)
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div className="min-h-dvh bg-white text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-6 focus:py-3 focus:text-base focus:text-brandS focus:shadow-soft focus:outline-none focus:ring-4 focus:ring-brand3"
        tabIndex={0}
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-brandS/10 bg-white/80 backdrop-blur">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6" style={{ minHeight: '80px' }}>
          <div className="flex items-center gap-3">
            <img src="/techscube-seo-logo.svg" alt="TECH S-CUBE — Salem IT company | TechSCube | Karthi Nexgen" className="h-10 w-10 rounded-md" loading="eager" />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-tight text-brandS">{BRAND.name}</p>
              <p className="text-[11px] text-brandS/65">{BRAND.tagline}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <a
              className="text-brandS/80 hover:text-brandS"
              href="#courses"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollToHash('#courses')
              }}
            >
              Courses
            </a>
            <a
              className="text-brandS/80 hover:text-brandS"
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollToHash('#services')
              }}
            >
              Services
            </a>
            <a
              className="text-brandS/80 hover:text-brandS"
              href="#why"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollToHash('#why')
              }}
            >
              Why us
            </a>
            <a
              className="text-brandS/80 hover:text-brandS"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollToHash('#contact')
              }}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center justify-center rounded-full bg-brand3 px-4 py-2 text-xs font-semibold text-brand3 shadow-soft transition hover:brightness-95 sm:inline-flex"
              onClick={(e) => {
              e.preventDefault()
              smoothScrollToHash('#contact')
            }}
            >
              Register / Learn Now
            </a>
            <button
              onClick={() => setMobileMenu((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brandS/15 bg-white text-brandS shadow-soft/50 sm:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenu}
            >
              <span className="text-lg leading-none">☰</span>
            </button>
          </div>
        </div>

        {mobileMenu ? (
          <div className="border-t border-brandS/10 bg-white sm:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="grid gap-2 text-sm">
                <a
                  className="rounded-xl px-3 py-2 text-brandS/80 hover:bg-brandS/5 hover:text-brandS"
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenu(false)
                    smoothScrollToHash('#courses')
                  }}
                >
                  Courses
                </a>
                <a
                  className="rounded-xl px-3 py-2 text-brandS/80 hover:bg-brandS/5 hover:text-brandS"
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenu(false)
                    smoothScrollToHash('#services')
                  }}
                >
                  Services
                </a>
                <a
                  className="rounded-xl px-3 py-2 text-brandS/80 hover:bg-brandS/5 hover:text-brandS"
                  href="#why"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenu(false)
                    smoothScrollToHash('#why')
                  }}
                >
                  Why us
                </a>
                <a
                  className="rounded-xl px-3 py-2 text-brandS/80 hover:bg-brandS/5 hover:text-brandS"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenu(false)
                    smoothScrollToHash('#contact')
                  }}
                >
                  Contact
                </a>
                <a
                  href="#contact"
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand3 px-4 py-3 text-sm font-semibold text-white shadow-soft"
                  onClick={(e) => {
                  e.preventDefault()
                  setMobileMenu(false)
                  smoothScrollToHash('#contact')
                }}
                >
                  Register / Learn Now
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main" className="pb-20 sm:pb-0">
        {/* Stunning Hero Section with Gradients and Animations */}
        <section className="relative overflow-hidden bg-[#002e46]" ref={heroRef}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/4 -top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#dd822f]/20 blur-3xl" />
            <div className="absolute -right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-[#dd822f]/20 blur-3xl animation-delay-1000" />
            <div className="absolute bottom-0 left-1/2 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl animation-delay-2000" />
          </div>

          {/* Decorative Dot Pattern */}
          <div 
            className="absolute right-0 top-0 h-64 w-64 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgb(221 130 47) 2px, transparent 2px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-14 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left Content */}
              <div>
                <div data-reveal className="animate-fade-in">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#dd822f] px-4 py-2 shadow-lg ring-2 ring-white/20">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Trusted IT Partner</span>
                  </div>
                </div>

                <h1
                  data-reveal
                  className="mt-8 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  Transforming Businesses Through{' '}
                  <span className="relative inline-block">
                    <span className="text-[#dd822f]">
                      Technology Solutions
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                      <path d="M0 5C60 2 140 2 200 5" stroke="rgb(221 130 47)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                    </svg>
                  </span>
                </h1>

                <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-white">
                  Your trusted partner for <span className="font-semibold text-[#dd822f]">custom software development, IT consulting, and professional training</span>—delivering 
                  innovative solutions that drive business growth.
                </p>

                <div data-reveal className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault()
                      smoothScrollToHash('#services')
                    }}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#dd822f] px-8 py-4 font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[#dd822f]/50"
                  >
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-orange-400 to-[#dd822f] opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2 text-white">
                      Our Services
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      smoothScrollToHash('#contact')
                    }}
                    className="group inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-[#002e46]"
                  >
                    <span className="flex items-center gap-2">
                      Contact Us
                      <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* Floating Badges */}
                <div data-reveal className="mt-10 flex gap-3">
                  <div className="group flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-white/20">
                    <Icon kind="spark" />
                    <span className="text-sm font-medium">Enterprise-Grade</span>
                  </div>
                  <div className="group flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-white/20">
                    <Icon kind="bolt" />
                    <span className="text-sm font-medium">Global Standards</span>
                  </div>
                  <div className="group flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition hover:bg-white/20">
                    <Icon kind="cube" />
                    <span className="text-sm font-medium">24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Element */}
              <div data-reveal className="relative">
                <div className="relative z-10">
                  {/* Premium Enterprise Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 transition-all hover:scale-105 hover:shadow-brand3/30">
                    <div className="absolute right-4 top-4 inline-flex rounded-full bg-gradient-to-r from-[#dd822f] to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                      ⭐ ISO:2015 Certified
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <img src="/logo.png" alt="TECH S-CUBE" className="h-64 w-64 object-contain transition-transform group-hover:scale-110" />
                    </div>
        
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="font-display text-2xl font-bold text-[#dd822f]">
                          <CountUpNumber end={10} suffix="+" />
                        </p>
                        <p className="mt-1 text-xs font-medium text-brandS/70">Years</p>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-2xl font-bold text-[#dd822f]">
                          <CountUpNumber end={500} suffix="+" />
                        </p>
                        <p className="mt-1 text-xs font-medium text-brandS/70">Clients</p>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-2xl font-bold text-[#dd822f]">
                          <CountUpNumber end={200} suffix="+" />
                        </p>
                        <p className="mt-1 text-xs font-medium text-brandS/70">Experts</p>
                      </div>
                    </div>
                    
                    {/* Premium Badge at Bottom */}
                    <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brandS/5 to-brand3/5 py-3">
                      <svg className="h-5 w-5 text-[#dd822f]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-brandS">Trusted by Global Enterprises</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-brand3/30 to-orange-400/20 blur-3xl" />
                <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-gradient-to-br from-white/20 to-brandS/10 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div data-reveal className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-brandS/10 bg-white p-6 shadow-soft">
              <div className="inline-flex items-center gap-2 rounded-full bg-brandS/5 px-3 py-1 text-xs font-semibold text-brandS">
                <Icon kind="spark" />
                <span>Storytelling learning</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold text-brandS">You don't just learn. You create.</p>
              <p className="mt-2 text-sm leading-6 text-brandS/70">
                Every course is designed to move you from curiosity → confidence → real outcomes.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#002e46] p-6 text-white shadow-soft">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                <Icon kind="cube" />
                <span>Support + services</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold text-white">Launch with help.</p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Projects, hosting & domains, publication support, and IT troubleshooting.
              </p>
            </div>            
            <div className="rounded-[2rem] border border-brandS/10 bg-white p-6 shadow-soft">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand3/10 px-3 py-1 text-xs font-semibold text-brandS">
                <Icon kind="bolt" />
                <span>Practical first</span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold text-brandS">Built for the real world.</p>
              <p className="mt-2 text-sm leading-6 text-brandS/70">
                Industry-relevant learning with practice baked in, not sprinkled on top.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTitle
            kicker="WHO WE ARE"
            title="Leading the Digital Transformation Journey"
            desc="A globally recognized IT services company delivering innovative solutions that empower businesses to excel in the digital age."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div data-reveal className="rounded-3xl border border-brandS/10 bg-white p-8 shadow-lg lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl bg-gradient-to-br from-brandS/5 to-brandS/10 p-6 transition-all hover:shadow-lg">
                  <p className="text-xs font-bold tracking-[0.22em] text-brandS/60">OUR VISION</p>
                  <p className="mt-3 font-display text-xl font-bold text-brandS">Global Technology Leader</p>
                  <p className="mt-3 text-sm leading-relaxed text-brandS/70">
                    To be the most trusted partner for enterprises seeking innovative technology solutions and digital transformation excellence.
                  </p>
                </div>
                <div className="group rounded-2xl bg-gradient-to-br from-brand3/10 to-orange-400/10 p-6 transition-all hover:shadow-lg">
                  <p className="text-xs font-bold tracking-[0.22em] text-brandS/60">OUR MISSION</p>
                  <p className="mt-3 font-display text-xl font-bold text-brandS">Innovation & Excellence</p>
                  <p className="mt-3 text-sm leading-relaxed text-brandS/70">
                    Delivering world-class IT solutions through cutting-edge technology, industry expertise, and unwavering commitment to client success.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { k: 'Industries', v: '15+', d: 'Sectors Served Globally' },
                  { k: 'Approach', v: 'Agile', d: 'Modern Development Practices' },
                  { k: 'Support', v: '24/7', d: 'Enterprise-Grade Assistance' },
                ].map((s) => (
                  <div key={s.k} className="group rounded-xl border border-brandS/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                    <p className="text-xs font-semibold text-brandS/55">{s.k}</p>
                    <p className="mt-2 font-display text-2xl font-bold text-brandS transition-colors group-hover:text-brand3">{s.v}</p>
                    <p className="mt-2 text-xs leading-5 text-brandS/65">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="lg:col-span-5">
              <div className="rounded-3xl bg-[#002e46] p-8 text-white shadow-lg">
                <p className="text-xs font-bold tracking-[0.22em] text-white/70">WHY CHOOSE US</p>
                <div className="mt-6 space-y-4">
                  {[
                    { t: 'Industry Expertise', d: 'Certified professionals with deep domain knowledge across multiple industries and technologies.' },
                    { t: 'Scalable Solutions', d: 'Enterprise-grade infrastructure designed to grow with your business needs and requirements.' },
                    { t: 'Innovation First', d: 'Leveraging cutting-edge technologies like AI, cloud, and automation for competitive advantage.' },
                  ].map((x) => (
                    <div key={x.t} className="group rounded-2xl bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="font-bold text-white">{x.t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">{x.d}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                  e.preventDefault()
                  smoothScrollToHash('#contact')
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#002e46] shadow-soft transition-all hover:bg-[#dd822f] hover:text-white"
              >
                Schedule Consultation
              </a>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTitle
            kicker="COURSES"
            title="Choose a track. Build a story."
            desc="From foundational basics to advanced AI and cloud, pick the learning path that matches your goals—then make it real with hands-on practice."
          />

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2">
              {(['Technical', 'Basic', 'Graphic Designing', 'Non-Technical'] as CourseCategory[]).map((c) => {
                const active = c === activeCategory
                return (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={
                      'rounded-full px-4 py-2 text-xs font-semibold transition ' +
                      (active
                        ? 'border border-brandS/15 bg-[#002e46] text-white shadow-soft'
                        : 'border border-brandS/15 bg-white text-brandS hover:border-brandS/25')
                    }
                    aria-pressed={active}
                  >
                    {c}
                  </button>
                )
              })}
            </div>

            <div data-reveal className="mt-6 grid gap-3 sm:grid-cols-2">
              {courseMap[activeCategory].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-2xl border border-brandS/10 bg-white p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-brand3/30 hover:shadow-xl hover:shadow-brand3/5"
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand3/0 to-brand3/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <div className="relative">
                    <p className="text-sm font-bold text-brandS transition-colors group-hover:text-brand3">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-brandS/65">
                      Hands-on learning, guided practice, and real outcomes.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle
              kicker="ENTERPRISE SOLUTIONS"
              title="Comprehensive IT Services for Modern Enterprises"
              desc="Delivering world-class technology solutions that drive digital transformation and business excellence."
            />

            <div data-reveal className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand3/20 hover:ring-brand3/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Premium Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brandS/5 via-transparent to-brand3/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Decorative Corner Accent */}
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-brand3/20 to-brandS/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                  
                  <div className="relative">
                    {/* Icon Container */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#002e46] to-[#003d5c] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand3/30">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    
                    {/* Service Title */}
                    <h3 className="mb-3 font-display text-xl font-bold text-brandS transition-colors duration-300 group-hover:text-brand3">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-sm leading-relaxed text-gray-600">
                      {service.desc}
                    </p>
                    
                    {/* Learn More Link */}
                    {/* <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand3 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                      <span>Learn more</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div> */}
                  </div>

                  {/* Premium Border Highlight */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-brand3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div data-reveal className="mt-16 text-center">
              <p className="mb-6 text-sm font-medium text-gray-600">
                Ready to transform your business with cutting-edge technology?
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollToHash('#contact')
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#002e46] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#003d5c] hover:shadow-xl hover:shadow-brand3/30"
              >
                <span>Start Your Project</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTitle
            kicker="WHY US"
            title="A story-first learning experience"
            desc="Every learner starts somewhere. We help you turn that start into a portfolio-worthy story."
          />

          <div data-reveal className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl bg-[#002e46] p-7 text-white shadow-soft lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.24em] text-white/70">THE PROMISE</p>
              <p className="mt-4 font-display text-2xl font-semibold text-white">
                "Empowering you with future-ready skills."
              </p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Immersive workshops + practical learning + industry relevance—so your next step feels achievable and exciting.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Hands-on</Pill>
                <Pill>Mentored</Pill>
                <Pill>Outcome-driven</Pill>
              </div>
            </div>

            <div className="rounded-3xl border border-brandS/10 bg-white p-7 shadow-soft">
              <p className="text-xs font-semibold tracking-[0.24em] text-brandS/55">STUDY FLOW</p>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  { t: 'Pick a track', d: 'Choose courses that match your goal.' },
                  { t: 'Practice daily', d: 'Learn with projects and guidance.' },
                  { t: 'Ship something', d: 'Turn skills into real outcomes.' },
                ].map((s, idx) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand3 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-brandS">{s.t}</p>
                      <p className="text-xs leading-5 text-brandS/65">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <SectionTitle kicker="FAQ" title="Quick answers" desc="Everything you need to know before you start." />

          <div data-reveal className="mx-auto mt-8 max-w-3xl">
            <Accordion items={faqs} defaultOpen={0} />
          </div>
        </section>

        <section id="contact" className="bg-[#002e46]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-orange-400">CONTACT</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Let's build your next chapter.
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-200">
                  Call us, visit us, or register to learn now. We'll help you pick a track and start strong.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="group">
                    <p className="text-sm font-bold text-gray-300">Phone</p>
                    <a 
                      className="mt-2 inline-flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-[#dd822f]" 
                      href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    >
                      <svg className="h-5 w-5 text-[#dd822f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-300">Address</p>
                    <div className="mt-2 flex gap-3">
                      <svg className="mt-1 h-5 w-5 shrink-0 text-[#dd822f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="text-base leading-relaxed text-white">
                        <p>{contact.addressLine1}</p>
                        <p>{contact.addressLine2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="rounded-3xl bg-white p-6 text-brandS shadow-soft">
                <p className="text-xs font-semibold tracking-[0.22em] text-brandS/65">REGISTER</p>
                <p className="mt-2 font-display text-xl font-semibold">Get course details</p>
                <p className="mt-2 text-sm text-brandS/70">
                  Leave your details and we’ll send the right track options for you.
                </p>
                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Thanks! We will contact you soon.')
                  }}
                >
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-brandS/70">Name</span>
                    <input
                      required
                      className="h-11 rounded-xl border border-brandS/15 bg-white px-4 text-sm outline-none ring-brand3/30 focus:ring-4"
                      placeholder="Your name"
                      name="name"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-brandS/70">Phone</span>
                    <input
                      required
                      inputMode="tel"
                      className="h-11 rounded-xl border border-brandS/15 bg-white px-4 text-sm outline-none ring-brand3/30 focus:ring-4"
                      placeholder="+91"
                      name="phone"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-brandS/70">Interested in</span>
                    <select
                      name="interest"
                      className="h-11 rounded-xl border border-brandS/15 bg-white px-4 text-sm outline-none ring-brand3/30 focus:ring-4"
                      defaultValue={activeCategory}
                    >
                      {(['Technical', 'Basic', 'Graphic Designing', 'Non-Technical'] as CourseCategory[]).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-brand3 px-5 text-sm font-semibold text-white shadow-soft transition hover:brightness-95"
                  >
                    Send details
                  </button>
                  <p className="text-xs text-brandS/55">
                    This is a demo form. Hook it to WhatsApp/email/API anytime.
                  </p>
                </form>
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brandS/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="TECH S-CUBE" className="h-9 w-9 rounded-md" loading="lazy" />
              <div>
                <p className="font-display text-sm font-semibold text-brandS">{BRAND.name}</p>
                <p className="text-xs text-brandS/60">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="text-xs text-brandS/55">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-brandS/10 bg-white/90 px-3 py-3 shadow-soft backdrop-blur">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-brandS">Ready to start?</p>
            <p className="truncate text-[11px] text-brandS/60">Call {contact.phone}</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollToHash('#contact')
            }}
            className="shrink-0 rounded-xl bg-brand3 px-4 py-2 text-xs font-semibold text-white shadow-soft"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
