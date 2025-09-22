import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { SkillRecommendations } from "@/components/skill-recommendations"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AnalyticsDashboard />
        <SkillRecommendations />
      </main>
      <Footer />
    </div>
  )
}
