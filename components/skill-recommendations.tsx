import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Lightbulb, ArrowRight, Star } from "lucide-react"

export function SkillRecommendations() {
  const trendingSkills = [
    {
      skill: "Artificial Intelligence",
      category: "Technology",
      demand: "High",
      growth: "+35%",
      internships: 245,
      difficulty: "Advanced",
    },
    {
      skill: "Data Analytics",
      category: "Analytics",
      demand: "Very High",
      growth: "+28%",
      internships: 312,
      difficulty: "Intermediate",
    },
    {
      skill: "Digital Marketing",
      category: "Marketing",
      demand: "High",
      growth: "+22%",
      internships: 189,
      difficulty: "Beginner",
    },
    {
      skill: "Cloud Computing",
      category: "Technology",
      demand: "High",
      growth: "+31%",
      internships: 156,
      difficulty: "Intermediate",
    },
    {
      skill: "UI/UX Design",
      category: "Design",
      demand: "Medium",
      growth: "+18%",
      internships: 134,
      difficulty: "Intermediate",
    },
    {
      skill: "Cybersecurity",
      category: "Security",
      demand: "Very High",
      growth: "+42%",
      internships: 98,
      difficulty: "Advanced",
    },
  ]

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Very High":
        return "bg-destructive text-destructive-foreground"
      case "High":
        return "bg-primary text-primary-foreground"
      case "Medium":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-chart-2 text-white"
      case "Intermediate":
        return "bg-chart-1 text-white"
      case "Advanced":
        return "bg-chart-3 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-primary" />
            <Badge variant="secondary">AI-Powered Recommendations</Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Skills & Opportunities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most in-demand skills based on recent internship postings and industry trends. Get personalized
            recommendations to boost your career prospects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trendingSkills.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{item.skill}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{item.growth}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Demand Level</span>
                  <Badge className={`text-xs ${getDemandColor(item.demand)}`}>{item.demand}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>{item.difficulty}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Internships</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-sm font-semibold">{item.internships}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View Opportunities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Get Personalized Recommendations</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Register as a student to receive AI-powered skill recommendations based on your profile, interests, and
                current market trends.
              </p>
              <Button size="lg" className="px-8">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
