"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Target, Users, Award } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Smart Allocation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            <span className="text-primary">InterNeX</span> - Smart Internship{" "}
            <span className="text-primary">Allocation</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Ensuring fairness, inclusivity, and optimal allocation across all states and universities through advanced
            AI matching, real-time analytics, and blockchain-verified certificates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student/register">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
              >
                Get Started as Student
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent hover:bg-primary/10"
              onClick={() => {
                const aboutSection = document.getElementById("about")
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart AI Matching</h3>
              <p className="text-muted-foreground text-sm">
                Advanced algorithms consider skills, CGPA, location preferences, and affirmative action for optimal
                allocation with fairness and inclusivity
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fair Distribution</h3>
              <p className="text-muted-foreground text-sm">
                Ensures equitable opportunities across all states, universities, and social categories with industry
                capacity consideration
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Blockchain Certificates</h3>
              <p className="text-muted-foreground text-sm">
                Secure, verifiable certificates upon internship completion using blockchain technology
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
