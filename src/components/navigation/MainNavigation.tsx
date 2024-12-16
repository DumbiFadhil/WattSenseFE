'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/data-analyzer', label: 'Data Analyzer' },
    { href: '/ai-consultant', label: 'AI Consultant' }
  ]

  return (
    <nav className="bg-primary/60 text-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-bg-tertiary">Watt</span>
          <span className="text-bg-secondary">Sense</span>
        </Link>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-3 py-2 rounded 
                ${pathname === item.href
                  ? 'bg-tertiary text-white'
                  : 'hover:bg-tertiary hover:text-white'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}