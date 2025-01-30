'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <nav className="flex items-center justify-between h-16 px-4 md:px-8 bg-white border-b border-gray-200">
      <Link href="/" className="text-lg font-bold text-primary">Sign Language Translator</Link>

      <div className="hidden md:flex gap-8 items-center">
        <Link
          href="/"
          className={cn(
            "text-md font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        <Link
          href="/sign-to-text"
          className={cn(
            "text-md font-medium transition-colors hover:text-primary",
            pathname === "/sign-to-text" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Sign to Text
        </Link>
        <Link
          href="/text-to-sign"
          className={cn(
            "text-md font-medium transition-colors hover:text-primary",
            pathname === "/text-to-sign" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Text to Sign
        </Link>
        {/* <Link
          href="/certificate"
          className={cn(
            "text-md font-medium transition-colors hover:text-primary",
            pathname === "/certificate" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Certificate
        </Link> */}
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 md:hidden z-10">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="/sign-to-text"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/sign-to-text" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Sign to Text
            </Link>
            <Link
              href="/text-to-sign"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/text-to-sign" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Text to Sign
            </Link>
            <Link
              href="/certificate"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-md font-medium transition-colors hover:text-primary",
                pathname === "/certificate" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Certificate
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
