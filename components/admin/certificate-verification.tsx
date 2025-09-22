"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function CertificateVerification() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const pendingCertificates = [
    {
      id: "CERT-2025-001",
      studentName: "Rahul Sharma",
      university: "IIT Delhi",
      certificateName: "Python Programming Certification",
      issuer: "Coursera",
      submittedDate: "2025-01-15",
      priority: "High",
      aiConfidence: 87,
      status: "Pending Review",
    },
    {
      id: "CERT-2025-002",
      studentName: "Priya Patel",
      university: "NIT Trichy",
      certificateName: "Data Science Fundamentals",
      issuer: "edX",
      submittedDate: "2025-01-14",
      priority: "Medium",
      aiConfidence: 92,
      status: "AI Verified",
    },
    {
      id: "CERT-2025-003",
      studentName: "Ankit Kumar",
      university: "BITS Pilani",
      certificateName: "Machine Learning Specialization",
      issuer: "Coursera",
      submittedDate: "2025-01-13",
      priority: "Low",
      aiConfidence: 45,
      status: "Manual Review Required",
    },
  ]

  const verificationStats = {
    totalSubmitted: 1403,
    aiVerified: 1247,
    manualReview: 156,
    rejected: 23,
    averageProcessingTime: "2.3 hours",
    aiAccuracy: "94.2%",
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground"
      case "Medium":
        return "bg-secondary text-secondary-foreground"
      case "Low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AI Verified":
        return "bg-chart-2 text-white"
      case "Pending Review":
        return "bg-secondary text-secondary-foreground"
      case "Manual Review Required":
        return "bg-accent text-accent-foreground"
      case "Rejected":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-chart-2"
    if (confidence >= 70) return "text-secondary"
    return "text-destructive"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate Verification System</h1>
        <p className="text-muted-foreground">
          AI-powered certificate authentication ensuring skill verification integrity
        </p>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">Verification Queue</TabsTrigger>
          <TabsTrigger value="review">Manual Review</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{verificationStats.totalSubmitted}</div>
                <div className="text-xs text-muted-foreground">Total Submitted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-chart-2">{verificationStats.aiVerified}</div>
                <div className="text-xs text-muted-foreground">AI Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">{verificationStats.manualReview}</div>
                <div className="text-xs text-muted-foreground">Manual Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{verificationStats.rejected}</div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">{verificationStats.averageProcessingTime}</div>
                <div className="text-xs text-muted-foreground">Avg Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-chart-1">{verificationStats.aiAccuracy}</div>
                <div className="text-xs text-muted-foreground">AI Accuracy</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by student name, certificate, or ID..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ai-verified">AI Verified</SelectItem>
                    <SelectItem value="manual">Manual Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Queue */}
          <div className="grid gap-4">
            {pendingCertificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{cert.studentName}</h4>
                        <Badge className={`text-xs ${getPriorityColor(cert.priority)}`}>{cert.priority}</Badge>
                        <Badge className={`text-xs ${getStatusColor(cert.status)}`}>{cert.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">University:</span>
                          <div className="font-medium">{cert.university}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Certificate:</span>
                          <div className="font-medium">{cert.certificateName}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Issuer:</span>
                          <div className="font-medium">{cert.issuer}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submitted:</span>
                          <div className="font-medium">{cert.submittedDate}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">AI Confidence</span>
                        <div className={`text-2xl font-bold ${getConfidenceColor(cert.aiConfidence)}`}>
                          {cert.aiConfidence}%
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button
                          className="px-3 py-1 bg-chart-2 text-white rounded text-sm hover:bg-chart-2/90"
                          onClick={() => setSelectedCertificate(cert)}
                        >
                          Review
                        </button>
                        <button className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Manual Review Required</h3>
              <p className="text-muted-foreground mb-4">
                Certificates flagged by AI for manual verification due to low confidence scores or suspicious patterns.
              </p>
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">🔍</div>
                <p>No certificates currently require manual review</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Verification Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Daily Submissions</span>
                    <span className="font-semibold">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Success Rate</span>
                    <span className="font-semibold text-chart-2">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Speed</span>
                    <span className="font-semibold">-15% faster</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Certificate Issuers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Coursera</span>
                    <span className="font-semibold">342 certs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>edX</span>
                    <span className="font-semibold">298 certs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Udemy</span>
                    <span className="font-semibold">187 certs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">AI Verification Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Confidence Threshold</label>
                  <div className="mt-1">
                    <input type="range" min="50" max="95" defaultValue="75" className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>50%</span>
                      <span>Current: 75%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Auto-approve above</label>
                  <div className="mt-1">
                    <input type="range" min="80" max="99" defaultValue="90" className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>80%</span>
                      <span>Current: 90%</span>
                      <span>99%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
