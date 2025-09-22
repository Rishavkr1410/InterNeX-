import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  MapPin,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  FileCheck,
  Settings,
} from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const systemStats = {
    totalStudents: 45623,
    totalEmployers: 1247,
    activeInternships: 1234,
    completedAllocations: 38901,
    pendingVerifications: 156,
    systemUptime: "99.8%",
  }

  const allocationMetrics = [
    { state: "Maharashtra", allocated: 4521, target: 4800, percentage: 94 },
    { state: "Karnataka", allocated: 3892, target: 4200, percentage: 93 },
    { state: "Tamil Nadu", allocated: 3654, target: 3900, percentage: 94 },
    { state: "Delhi", allocated: 2987, target: 3200, percentage: 93 },
    { state: "Uttar Pradesh", allocated: 5234, target: 5600, percentage: 93 },
  ]

  const recentActivities = [
    {
      type: "allocation",
      message: "Smart allocation completed for 245 students",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      type: "verification",
      message: "Certificate verification pending for 23 students",
      timestamp: "15 minutes ago",
      status: "warning",
    },
    {
      type: "employer",
      message: "New employer registration: Tech Mahindra",
      timestamp: "1 hour ago",
      status: "info",
    },
    {
      type: "system",
      message: "AI matching algorithm updated successfully",
      timestamp: "3 hours ago",
      status: "success",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "allocation":
        return <Zap className="w-4 h-4" />
      case "verification":
        return <FileCheck className="w-4 h-4" />
      case "employer":
        return <Building2 className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-chart-2"
      case "warning":
        return "text-secondary"
      case "info":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Government Admin Panel</h1>
            <p className="text-muted-foreground">Ministry of Corporate Affairs - PM Internship Smart Allocation</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/smart-allocation">
              <Button variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Smart Allocation
              </Button>
            </Link>
            <Link href="/admin/certificate-verification">
              <Button>
                <FileCheck className="w-4 h-4 mr-2" />
                Certificate Verification
              </Button>
            </Link>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{systemStats.totalStudents.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Building2 className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">{systemStats.totalEmployers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Employers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{systemStats.activeInternships.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active Internships</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-chart-2" />
              <div className="text-2xl font-bold">{systemStats.completedAllocations.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-chart-1" />
              <div className="text-2xl font-bold">{systemStats.pendingVerifications}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-chart-3" />
              <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* State-wise Allocation Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  State-wise Allocation Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allocationMetrics.map((state, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{state.state}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">
                          {state.allocated.toLocaleString()} / {state.target.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {state.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={state.percentage} className="h-2" />
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View Detailed Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent System Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent System Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`mt-0.5 ${getStatusColor(activity.status)}`}>{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/smart-allocation">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <Zap className="w-6 h-6" />
                    <span className="text-sm">Run Smart Allocation</span>
                  </Button>
                </Link>
                <Link href="/admin/certificate-verification">
                  <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                    <FileCheck className="w-6 h-6" />
                    <span className="text-sm">Verify Certificates</span>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Award className="w-6 h-6" />
                  <span className="text-sm">Generate Reports</span>
                </Button>
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Settings className="w-6 h-6" />
                  <span className="text-sm">System Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Smart Allocation Engine Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">94.2%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-secondary">2.3s</div>
                      <div className="text-sm text-muted-foreground">Avg Processing</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-accent">245</div>
                      <div className="text-sm text-muted-foreground">Last Batch</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Skill Matching Algorithm</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Geographic Distribution</span>
                        <Badge variant="secondary">Optimized</Badge>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Affirmative Action Compliance</span>
                        <Badge variant="secondary">Compliant</Badge>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>

                  <Link href="/admin/smart-allocation">
                    <Button className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Access Smart Allocation Engine
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Allocation Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Batch #2025-001</p>
                      <p className="text-sm text-muted-foreground">156 students</p>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">Processing</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Batch #2025-002</p>
                      <p className="text-sm text-muted-foreground">89 students</p>
                    </div>
                    <Badge variant="outline">Queued</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Batch #2025-003</p>
                      <p className="text-sm text-muted-foreground">203 students</p>
                    </div>
                    <Badge variant="outline">Queued</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  View Full Queue
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Certificate Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">1,247</div>
                    <div className="text-sm text-muted-foreground">Verified</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-secondary">156</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Verification Rate</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Manual Review Required</span>
                    <span className="font-semibold">13%</span>
                  </div>
                  <Progress value={13} className="h-2" />
                </div>

                <Link href="/admin/certificate-verification">
                  <Button className="w-full">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Access Verification Panel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Rahul Sharma",
                    certificate: "Python Programming",
                    university: "IIT Delhi",
                    priority: "High",
                  },
                  {
                    name: "Priya Patel",
                    certificate: "Data Science",
                    university: "NIT Trichy",
                    priority: "Medium",
                  },
                  {
                    name: "Ankit Kumar",
                    certificate: "Machine Learning",
                    university: "BITS Pilani",
                    priority: "Low",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.certificate}</p>
                      <p className="text-xs text-muted-foreground">{item.university}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "destructive"
                            : item.priority === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs mb-2"
                      >
                        {item.priority}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Allocation Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">94.2%</div>
                  <div className="text-sm text-muted-foreground">Overall Success Rate</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Perfect Matches</span>
                    <span>67%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good Matches</span>
                    <span>27%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Acceptable Matches</span>
                    <span>6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diversity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gender Balance</span>
                    <Badge variant="secondary">48% F / 52% M</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Social Category</span>
                    <Badge variant="secondary">Compliant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Geographic Spread</span>
                    <Badge variant="secondary">28/28 States</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">University Diversity</span>
                    <Badge variant="secondary">456 Institutions</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Response Time</span>
                    <span className="font-semibold">245ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Queries/sec</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Sessions</span>
                    <span className="font-semibold">3,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Load</span>
                    <Badge variant="secondary">Normal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">AI Matching Algorithm</p>
                      <p className="text-sm text-muted-foreground">Version 2.1.3</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Certificate Verification AI</p>
                      <p className="text-sm text-muted-foreground">Version 1.8.2</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Blockchain Integration</p>
                      <p className="text-sm text-muted-foreground">Hyperledger Fabric</p>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Update System Components
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-chart-2 text-white">AES-256</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Authentication</span>
                    <Badge className="bg-chart-2 text-white">Multi-Factor</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audit Logging</span>
                    <Badge className="bg-chart-2 text-white">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GDPR Compliance</span>
                    <Badge className="bg-chart-2 text-white">Compliant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Security Scan</span>
                    <span className="text-sm font-semibold">2 hours ago</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Run Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
