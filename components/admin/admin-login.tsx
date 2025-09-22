"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, Lock, ArrowRight, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    secureNetwork: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.email || !formData.password || !formData.otp) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    if (!formData.secureNetwork) {
      setError("You must confirm access from a secure government network")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, accept specific credentials
      if (formData.email === "admin@mca.gov.in" && formData.password === "admin123" && formData.otp === "123456") {
        localStorage.setItem("adminAuth", "true")
        router.push("/admin")
      } else {
        setError("Invalid credentials or OTP")
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-destructive-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Government Admin Login</h1>
        <p className="text-muted-foreground">Secure access to InterNeX allocation system</p>
        <Badge variant="destructive" className="mt-2">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Restricted Access
        </Badge>
      </div>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle>Ministry of Corporate Affairs</CardTitle>
          <p className="text-sm text-muted-foreground">Authorized personnel only</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Government Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mca.gov.in"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Secure Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter secure password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Two-Factor Authentication Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="secure"
                checked={formData.secureNetwork}
                onCheckedChange={(checked) => setFormData({ ...formData, secureNetwork: checked as boolean })}
              />
              <Label htmlFor="secure" className="text-sm">
                I am accessing from a secure government network
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-destructive hover:bg-destructive/90"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Secure Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-4 border-t mt-4">
            <p className="text-xs text-muted-foreground">
              This system is monitored and logged. Unauthorized access is prohibited.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          For technical support, contact IT Helpdesk at{" "}
          <Link href="mailto:support@mca.gov.in" className="text-primary hover:underline">
            support@mca.gov.in
          </Link>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Demo credentials: admin@mca.gov.in / admin123 / OTP: 123456
        </p>
      </div>
    </div>
  )
}
