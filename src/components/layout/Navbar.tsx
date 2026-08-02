import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Search, X } from 'lucide-react'

const MENU = ['คอนโดมิเนียม', 'บ้าน', 'ทาวน์โฮม']

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-ananda-blue text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 40 24" className="h-6 w-10 fill-white" aria-hidden="true">
            <path d="M2 12 L12 4 L14 8 L6 13 Z M14 14 L24 6 L26 10 L18 15 Z M26 4 L38 12 L26 20 L28 12 Z" />
          </svg>
          <span className="text-xl font-bold tracking-[0.25em]">ANANDA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {MENU.map((item) => (
            <a
              key={item}
              href="#units"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={pathname === '/admin' ? '/' : '/admin'}
            className="hidden rounded-full border border-white/40 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-white/10 sm:block"
          >
            {pathname === '/admin' ? 'หน้าลูกค้า' : 'หน้า Admin'}
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/10 sm:flex"
          >
            ไทย <ChevronDown size={14} />
          </button>
          <button type="button" aria-label="ค้นหา" className="p-1.5 hover:opacity-80">
            <Search size={20} />
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={mobileOpen}
            className="p-1.5 hover:opacity-80 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/20 bg-ananda-blue px-4 pb-4 md:hidden">
          {MENU.map((item) => (
            <a
              key={item}
              href="#units"
              className="block border-b border-white/10 py-3 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to={pathname === '/admin' ? '/' : '/admin'}
            className="block py-3 text-sm font-semibold text-ananda-yellow"
            onClick={() => setMobileOpen(false)}
          >
            {pathname === '/admin' ? 'ไปหน้าลูกค้า' : 'ไปหน้า Admin'}
          </Link>
        </nav>
      )}
    </header>
  )
}
