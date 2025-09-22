import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Briefcase, CheckCircle, Clock, Target, MapPin, Award } from "lucide-react"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Internships Posted",
      value: "2,847",
      change: "+12%",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      title: "Students Registered",
      value: "45,623",
      change: "+8%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Active Internships",
      value: "1,234",
      change: "+15%",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Successful Matches",
      value: "38,901",
      change: "+22%",
      icon: Target,
      color: "text-chart-1",
    },
    {
      title: "Completion Rate",
      value: "94.2%",
      change: "+3%",
      icon: CheckCircle,
      color: "text-chart-2",
    },
    {
      title: "States Covered",
      value: "28/28",
      change: "100%",
      icon: MapPin,
      color: "text-chart-3",
    },
  ]

  const skillDemand = [
    { skill: "Data Science", demand: 85, growth: "+15%" },
    { skill: "Web Development", demand: 78, growth: "+12%" },
    { skill: "Digital Marketing", demand: 72, growth: "+8%" },
    { skill: "AI/ML", demand: 68, growth: "+25%" },
    { skill: "Cloud Computing", demand: 65, growth: "+18%" },
  ]

  return (
    <section id="analytics" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Analytics Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track internship allocation performance, student engagement, and success metrics across the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Top Skills in Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillDemand.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.growth}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.demand}%</span>
                    </div>
                  </div>
                  <Progress value={item.demand} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">North India</span>
                  <span className="text-primary font-semibold">28%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">South India</span>
                  <span className="text-secondary font-semibold">24%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">West India</span>
                  <span className="text-accent font-semibold">22%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">East India</span>
                  <span className="text-chart-1 font-semibold">18%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Northeast India</span>
                  <span className="text-chart-2 font-semibold">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
