"use client"

import { UserButton, useAuth } from "@clerk/nextjs"
import { Zap, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Header = () => {
  const { isSignedIn } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <nav className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="flex items-center gap-1 text-xl font-semibold tracking-tight">
                <span className="hidden text-primary sm:inline">Prox</span>
                <span className="hidden text-muted-foreground sm:inline">AI</span>
              </span>
            </div>
          </Link>
          
          <div className="hidden items-center gap-3 border-l border-muted pl-6 lg:flex">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                Video Generator
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="h-4 w-px bg-border/50" /> {/* Divider */}
          {isSignedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <div className="h-4 w-px bg-border/50" />
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header