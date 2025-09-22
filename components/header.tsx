"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Building2, Shield, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">InterNeX</h1>
                <p className="text-sm text-muted-foreground">Smart Internship Platform</p>
              </div>
            </Link>
            <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
              Ministry of Corporate Affairs
            </Badge>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#analytics" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <a href="#skills" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Skills Trends
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/employer/login">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent hover:bg-primary/10"
              >
                <Building2 className="w-4 h-4" />
                Employer Login
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent hover:bg-primary/10"
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </Button>
            </Link>
            <Link href="/student/login">
              <Button
                size="sm"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
              >
                <GraduationCap className="w-4 h-4" />
                Student Portal
              </Button>
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/student/login" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600">
                  <GraduationCap className="w-4 h-4" />
                  Student Portal
                </Button>
              </Link>
              <Link href="/employer/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2 bg-transparent">
                  <Building2 className="w-4 h-4" />
                  Employer Login
                </Button>
              </Link>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2 bg-transparent">
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
