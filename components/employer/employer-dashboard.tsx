import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Briefcase, TrendingUp, Eye, Plus, Calendar, MapPin, Star } from "lucide-react"
import Link from "next/link"

export function EmployerDashboard() {
  const companyProfile = {
    name: "Tech Mahindra Ltd.",
    industry: "Information Technology",
    location: "Mumbai, Maharashtra",
    size: "10,000+ employees",
    activeInternships: 8,
    totalApplications: 245,
    shortlisted: 32,
    hired: 15,
  }

  const internships = [
    {
      id: 1,
      title: "Data Science Intern",
      department: "Analytics",
      location: "Bangalore",
      type: "Full-time",
      duration: "6 months",
      applications: 45,
      shortlisted: 8,
      status: "Active",
      postedDate: "2025-01-10",
      skills: ["Python", "Machine Learning", "SQL"],
    },
    {
      id: 2,
      title: "Software Development Intern",
      department: "Engineering",
      location: "Pune",
      type: "Full-time",
      duration: "4 months",
      applications: 67,
      shortlisted: 12,
      status: "Active",
      postedDate: "2025-01-08",
      skills: ["Java", "Spring Boot", "React"],
    },
    {
      id: 3,
      title: "Digital Marketing Intern",
      department: "Marketing",
      location: "Mumbai",
      type: "Part-time",
      duration: "3 months",
      applications: 23,
      shortlisted: 5,
      status: "Closed",
      postedDate: "2025-01-05",
      skills: ["SEO", "Social Media", "Analytics"],
    },
  ]

  const candidates = [
    {
      name: "Priya Sharma",
      university: "IIT Delhi",
      course: "Computer Science",
      cgpa: "9.2",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      appliedFor: "Data Science Intern",
      matchScore: 94,
      status: "Shortlisted",
      location: "Delhi",
    },
    {
      name: "Rahul Kumar",
      university: "NIT Trichy",
      course: "Information Technology",
      cgpa: "8.8",
      skills: ["Java", "Spring Boot", "MySQL"],
      appliedFor: "Software Development Intern",
      matchScore: 91,
      status: "Under Review",
      location: "Tamil Nadu",
    },
    {
      name: "Ananya Patel",
      university: "BITS Pilani",
      course: "Computer Science",
      cgpa: "9.0",
      skills: ["React", "Node.js", "MongoDB"],
      appliedFor: "Software Development Intern",
      matchScore: 89,
      status: "Interview Scheduled",
      location: "Rajasthan",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-chart-2 text-white"
      case "Closed":
        return "bg-muted text-muted-foreground"
      case "Shortlisted":
        return "bg-primary text-primary-foreground"
      case "Interview Scheduled":
        return "bg-secondary text-secondary-foreground"
      case "Under Review":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {companyProfile.name}</h1>
            <p className="text-muted-foreground">Manage your internship programs and find the best talent</p>
          </div>
          <div className="flex gap-3">
            <Link href="/employer/register">
              <Button variant="outline">Update Profile</Button>
            </Link>
            <Link href="/employer/post-internship">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Internship
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{companyProfile.activeInternships}</div>
              <div className="text-sm text-muted-foreground">Active Internships</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{companyProfile.totalApplications}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{companyProfile.shortlisted}</div>
              <div className="text-sm text-muted-foreground">Shortlisted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-chart-1">{companyProfile.hired}</div>
              <div className="text-sm text-muted-foreground">Hired</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="internships">My Internships</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Internships */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Recent Internships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {internships.slice(0, 3).map((internship) => (
                  <div key={internship.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{internship.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {internship.department} • {internship.location}
                      </p>
                      <p className="text-xs text-muted-foreground">Posted: {internship.postedDate}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={`text-xs ${getStatusColor(internship.status)}`}>{internship.status}</Badge>
                      <div className="text-xs text-muted-foreground">{internship.applications} applications</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Internships
                </Button>
              </CardContent>
            </Card>

            {/* Application Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Application Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Applications</span>
                    <span className="font-semibold">245</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Under Review</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Shortlisted</span>
                    <span className="font-semibold">32</span>
                  </div>
                  <Progress value={13} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hired</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="internships" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">My Internships</h3>
            <Link href="/employer/post-internship">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Internship
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {internships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{internship.title}</h4>
                        <Badge className={`text-xs ${getStatusColor(internship.status)}`}>{internship.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {internship.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {internship.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {internship.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {internship.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Applications: </span>
                        <span className="font-semibold">{internship.applications}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shortlisted: </span>
                        <span className="font-semibold">{internship.shortlisted}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Posted: </span>
                        <span className="font-semibold">{internship.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Applications
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Candidate Applications</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort by Match Score
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {candidates.map((candidate, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{candidate.name}</h4>
                        <Badge className={`text-xs ${getStatusColor(candidate.status)}`}>{candidate.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">University: {candidate.university}</p>
                          <p className="text-sm text-muted-foreground">Course: {candidate.course}</p>
                          <p className="text-sm text-muted-foreground">CGPA: {candidate.cgpa}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Applied for: {candidate.appliedFor}</p>
                          <p className="text-sm text-muted-foreground">Location: {candidate.location}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {candidate.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="text-lg font-bold text-primary">{candidate.matchScore}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">AI Match Score</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Shortlist</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Application Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-semibold text-primary">+24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Month</span>
                    <span className="font-semibold">156 applications</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per posting</span>
                    <span className="font-semibold">31 applications</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Skills Demanded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Python", "Java", "React", "Machine Learning", "SQL"].map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{skill}</span>
                      <Badge variant="secondary" className="text-xs">
                        {85 - index * 5}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { region: "South India", percentage: 35 },
                    { region: "North India", percentage: 28 },
                    { region: "West India", percentage: 22 },
                    { region: "East India", percentage: 15 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.region}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
