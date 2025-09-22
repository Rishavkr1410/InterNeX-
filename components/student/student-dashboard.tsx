"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, TrendingUp, MapPin, Award, CheckCircle, AlertCircle, FileText, Upload, Eye } from "lucide-react"

export function StudentDashboard() {
  const [showApplicationDetails, setShowApplicationDetails] = useState<number | null>(null)
  const [showAllApplications, setShowAllApplications] = useState(false)

  const studentProfile = {
    name: "Rahul Sharma",
    email: "rahul.sharma@university.edu",
    cgpa: "8.7",
    university: "Delhi University",
    course: "Computer Science Engineering",
    year: "3rd Year",
    location: "Delhi",
    skills: ["Python", "React", "Data Science", "Machine Learning"],
    certificates: 3,
    applications: 5,
    matches: 12,
  }

  const applications = [
    {
      company: "Tech Mahindra",
      position: "Data Science Intern",
      status: "Under Review",
      appliedDate: "2025-01-15",
      matchScore: 92,
    },
    {
      company: "Infosys",
      position: "Software Development Intern",
      status: "Shortlisted",
      appliedDate: "2025-01-12",
      matchScore: 88,
    },
    {
      company: "TCS",
      position: "AI/ML Intern",
      status: "Interview Scheduled",
      appliedDate: "2025-01-10",
      matchScore: 85,
    },
  ]

  const recommendations = [
    {
      company: "Microsoft",
      position: "Cloud Computing Intern",
      matchScore: 94,
      location: "Bangalore",
      skills: ["Azure", "Python", "DevOps"],
    },
    {
      company: "Amazon",
      position: "Data Analytics Intern",
      matchScore: 91,
      location: "Hyderabad",
      skills: ["SQL", "Python", "Tableau"],
    },
    {
      company: "Google",
      position: "Software Engineering Intern",
      matchScore: 89,
      location: "Mumbai",
      skills: ["Java", "React", "System Design"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-chart-2 text-white"
      case "Interview Scheduled":
        return "bg-primary text-primary-foreground"
      case "Under Review":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleViewApplicationDetails = (index: number) => {
    setShowApplicationDetails(index)
  }

  const handleApplyToInternship = (company: string, position: string) => {
    // Simulate application submission
    alert(`Application submitted to ${company} for ${position} position!`)
  }

  const handleCompleteProfile = () => {
    window.location.href = "/student/register"
  }

  const handleEditProfile = () => {
    alert("Profile editing functionality - redirecting to profile edit page")
  }

  const handleUploadCertificate = () => {
    alert("Certificate upload functionality - opening file picker")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {studentProfile.name}!</h1>
            <p className="text-muted-foreground">Track your internship applications and discover new opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCompleteProfile}>
              Complete Profile
            </Button>
            <Button onClick={() => setShowAllApplications(true)}>Browse Internships</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{studentProfile.applications}</div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{studentProfile.matches}</div>
              <div className="text-sm text-muted-foreground">AI Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{studentProfile.certificates}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-chart-1">{studentProfile.cgpa}</div>
              <div className="text-sm text-muted-foreground">CGPA</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.slice(0, 3).map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{app.company}</h4>
                      <p className="text-sm text-muted-foreground">{app.position}</p>
                      <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={`text-xs ${getStatusColor(app.status)}`}>{app.status}</Badge>
                      <div className="text-xs text-muted-foreground">Match: {app.matchScore}%</div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setShowAllApplications(true)}
                >
                  View All Applications
                </Button>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Strength</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-chart-2" />
                    <span>Basic Information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-chart-2" />
                    <span>Skills & Certificates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-secondary" />
                    <span>Portfolio/Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-secondary" />
                    <span>Preferences</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" onClick={handleCompleteProfile}>
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{app.company}</h4>
                        <Badge className={`text-xs ${getStatusColor(app.status)}`}>{app.status}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-1">{app.position}</p>
                      <p className="text-sm text-muted-foreground">Applied: {app.appliedDate}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-lg font-bold text-primary">{app.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">AI Match Score</div>
                      <Button variant="outline" size="sm" onClick={() => handleViewApplicationDetails(index)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{rec.company}</h4>
                        <p className="text-muted-foreground">{rec.position}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {rec.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{rec.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {rec.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleApplyToInternship(rec.company, rec.position)}
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-muted-foreground">{studentProfile.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{studentProfile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">University</label>
                    <p className="text-muted-foreground">{studentProfile.university}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Course</label>
                    <p className="text-muted-foreground">{studentProfile.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Year</label>
                    <p className="text-muted-foreground">{studentProfile.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">CGPA</label>
                    <p className="text-muted-foreground">{studentProfile.cgpa}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Skills & Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {studentProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Certificates</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Python Programming Certificate</span>
                      <Badge variant="outline" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Data Science Fundamentals</span>
                      <Badge variant="outline" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Machine Learning Basics</span>
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" onClick={handleUploadCertificate}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal for application details */}
      {showApplicationDetails !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowApplicationDetails(null)}
        >
          <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Application Details</h3>
            {applications[showApplicationDetails] && (
              <div className="space-y-3">
                <p>
                  <strong>Company:</strong> {applications[showApplicationDetails].company}
                </p>
                <p>
                  <strong>Position:</strong> {applications[showApplicationDetails].position}
                </p>
                <p>
                  <strong>Status:</strong> {applications[showApplicationDetails].status}
                </p>
                <p>
                  <strong>Applied Date:</strong> {applications[showApplicationDetails].appliedDate}
                </p>
                <p>
                  <strong>Match Score:</strong> {applications[showApplicationDetails].matchScore}%
                </p>
              </div>
            )}
            <Button className="w-full mt-4" onClick={() => setShowApplicationDetails(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
