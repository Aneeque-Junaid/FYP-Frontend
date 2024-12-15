'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex mx-auto gap-8 items-center h-16 justify-center">
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
    </nav>
  )
}