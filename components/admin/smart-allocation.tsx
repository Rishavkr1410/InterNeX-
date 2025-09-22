"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Settings,
  BarChart3,
  Users,
  MapPin,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Shield,
  Target,
} from "lucide-react"
import { FairnessAlgorithm, defaultAllocationConfig, type AllocationConfig } from "@/lib/fairness-algorithm"

export function SmartAllocation() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [skillWeight, setSkillWeight] = useState([defaultAllocationConfig.skillWeight])
  const [cgpaWeight, setCgpaWeight] = useState([defaultAllocationConfig.cgpaWeight])
  const [locationWeight, setLocationWeight] = useState([defaultAllocationConfig.locationWeight])
  const [diversityWeight, setDiversityWeight] = useState([defaultAllocationConfig.diversityWeight])
  const [allocationResults, setAllocationResults] = useState<any>(null)

  const currentResults = {
    totalProcessed: 1247,
    successful: 1174,
    pending: 73,
    failed: 0,
    averageMatchScore: 87.3,
    averageFairnessScore: 92.1,
    processingTime: "2.4 minutes",
  }

  const stateDistribution = [
    { state: "Maharashtra", allocated: 156, target: 160, percentage: 97.5, quota: 200 },
    { state: "Karnataka", allocated: 142, target: 150, percentage: 94.7, quota: 180 },
    { state: "Tamil Nadu", allocated: 138, target: 145, percentage: 95.2, quota: 170 },
    { state: "Delhi", allocated: 89, target: 95, percentage: 93.7, quota: 120 },
    { state: "Uttar Pradesh", allocated: 201, target: 210, percentage: 95.7, quota: 250 },
  ]

  const categoryDistribution = [
    { category: "General", allocated: 476, quota: 40.5, target: 505 },
    { category: "OBC", allocated: 317, quota: 27, target: 337 },
    { category: "SC", allocated: 176, quota: 15, target: 187 },
    { category: "ST", allocated: 88, quota: 7.5, target: 94 },
    { category: "EWS", allocated: 117, quota: 10, target: 125 },
  ]

  const runAllocation = async () => {
    setIsRunning(true)
    setProgress(0)

    const config: AllocationConfig = {
      ...defaultAllocationConfig,
      skillWeight: skillWeight[0],
      cgpaWeight: cgpaWeight[0],
      locationWeight: locationWeight[0],
      diversityWeight: diversityWeight[0],
    }

    const algorithm = new FairnessAlgorithm(config)

    // Simulate allocation process with realistic progress
    const steps = [
      "Initializing fairness algorithm...",
      "Loading student applications...",
      "Analyzing skill requirements...",
      "Calculating match scores...",
      "Applying diversity constraints...",
      "Optimizing state distribution...",
      "Validating quota compliance...",
      "Generating allocation results...",
      "Finalizing assignments...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setProgress(((i + 1) / steps.length) * 100)
    }

    // Simulate successful completion
    setAllocationResults({
      timestamp: new Date().toISOString(),
      config,
      totalProcessed: 1247,
      successful: 1174,
      fairnessScore: 94.2,
      diversityScore: 91.8,
    })

    setIsRunning(false)
  }

  const resetAllocation = () => {
    setProgress(0)
    setIsRunning(false)
    setAllocationResults(null)
  }

  const saveConfiguration = () => {
    const config = {
      skillWeight: skillWeight[0],
      cgpaWeight: cgpaWeight[0],
      locationWeight: locationWeight[0],
      diversityWeight: diversityWeight[0],
      timestamp: new Date().toISOString(),
    }

    // In a real app, this would save to backend
    localStorage.setItem("allocationConfig", JSON.stringify(config))
    alert("Configuration saved successfully!")
  }

  const downloadReport = () => {
    // Simulate report generation
    const report = {
      generatedAt: new Date().toISOString(),
      results: currentResults,
      stateDistribution,
      categoryDistribution,
      fairnessMetrics: {
        overallFairnessScore: 94.2,
        quotaCompliance: 98.5,
        genderDiversity: 34.2,
        geographicDistribution: 89.7,
      },
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `allocation-report-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Allocation Engine</h1>
        <p className="text-muted-foreground">
          AI-powered internship allocation ensuring fairness, diversity, and optimal matching with government compliance
        </p>
      </div>

      <Tabs defaultValue="control" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="control">Control Panel</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="fairness">Fairness Metrics</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="control" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Allocation Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Status Display */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">1,247</div>
                      <div className="text-sm text-muted-foreground">Students in Queue</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-secondary">456</div>
                      <div className="text-sm text-muted-foreground">Available Positions</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-accent">94.2%</div>
                      <div className="text-sm text-muted-foreground">Expected Fairness Score</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(isRunning || progress > 0) && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Allocation Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      {isRunning && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            Processing with fairness constraints... Estimated time remaining:{" "}
                            {Math.ceil(((100 - progress) / 100) * 2.4)} minutes
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Control Buttons */}
                  <div className="flex gap-3">
                    <Button onClick={runAllocation} disabled={isRunning} className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? "Running Allocation..." : "Start Fair Allocation"}
                    </Button>
                    <Button variant="outline" onClick={resetAllocation} disabled={isRunning}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button variant="outline" disabled={!isRunning}>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  </div>

                  {/* Algorithm Status */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Fairness Algorithm Components
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Skill Matching (AI)</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Quota Compliance</span>
                        <Badge className="bg-green-600 text-white">Enforced</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Diversity Optimization</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Geographic Distribution</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Processing Speed</span>
                    <span className="font-semibold">245/min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Match Accuracy</span>
                    <span className="font-semibold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fairness Score</span>
                    <Badge className="bg-green-600 text-white">92.1%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quota Compliance</span>
                    <Badge className="bg-green-600 text-white">98.5%</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-3">Recent Alerts</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                      <span>Quota compliance verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-secondary" />
                      <span>High demand for Data Science roles</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                      <span>Gender diversity target achieved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Algorithm Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Skill Match Weight: {skillWeight[0]}%</Label>
                    <Slider value={skillWeight} onValueChange={setSkillWeight} max={100} step={5} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">How much to prioritize skill alignment</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">CGPA Weight: {cgpaWeight[0]}%</Label>
                    <Slider value={cgpaWeight} onValueChange={setCgpaWeight} max={100} step={5} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">Academic performance consideration</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location Preference Weight: {locationWeight[0]}%</Label>
                    <Slider
                      value={locationWeight}
                      onValueChange={setLocationWeight}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Geographic preference matching</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Diversity Bonus Weight: {diversityWeight[0]}%</Label>
                    <Slider
                      value={diversityWeight}
                      onValueChange={setDiversityWeight}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Fairness and inclusion bonus</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">
                    Total Weight: {skillWeight[0] + cgpaWeight[0] + locationWeight[0] + diversityWeight[0]}%
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" onClick={saveConfiguration}>
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Fairness Constraints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minCgpa">Minimum CGPA Threshold</Label>
                  <Input id="minCgpa" placeholder="7.0" />
                </div>

                <div className="space-y-2">
                  <Label>Reservation Quotas (Government Guidelines)</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>SC:</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>ST:</span>
                      <span>7.5%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>OBC:</span>
                      <span>27%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded">
                      <span>EWS:</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genderTarget">Gender Diversity Target (%)</Label>
                  <Input id="genderTarget" placeholder="33" />
                  <p className="text-xs text-muted-foreground">Minimum representation for underrepresented gender</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batchSize">Processing Batch Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 students</SelectItem>
                      <SelectItem value="250">250 students</SelectItem>
                      <SelectItem value="500">500 students</SelectItem>
                      <SelectItem value="1000">1000 students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Configuration Notes</Label>
                  <Textarea id="notes" placeholder="Add notes about this configuration..." rows={3} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Allocation Results Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">{currentResults.successful}</div>
                    <div className="text-sm text-muted-foreground">Successful</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{currentResults.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold">
                      {((currentResults.successful / currentResults.totalProcessed) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Match Score</span>
                    <span className="font-semibold">{currentResults.averageMatchScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Fairness Score</span>
                    <Badge className="bg-green-600 text-white">{currentResults.averageFairnessScore}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Processing Time</span>
                    <span className="font-semibold">{currentResults.processingTime}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" onClick={downloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Detailed Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  State-wise Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stateDistribution.map((state, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{state.state}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">
                          {state.allocated} / {state.quota}
                        </span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {state.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(state.allocated / state.quota) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fairness" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Quota Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryDistribution.map((cat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{cat.category}</span>
                      <span>
                        {cat.allocated} / {cat.target}
                      </span>
                    </div>
                    <Progress value={(cat.allocated / cat.target) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Target: {cat.quota}% | Achieved: {((cat.allocated / cat.target) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Diversity Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Gender Diversity</span>
                  <Badge className="bg-green-600 text-white">34.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Geographic Spread</span>
                  <Badge variant="secondary">28 states</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">University Diversity</span>
                  <Badge variant="secondary">156 institutions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disability Inclusion</span>
                  <Badge variant="secondary">3.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rural Representation</span>
                  <Badge variant="secondary">18.7%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Fairness Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-700">94.2</div>
                  <div className="text-sm text-green-600">Overall Fairness Score</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Equal Opportunity</span>
                    <span className="font-semibold">96.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Merit Balance</span>
                    <span className="font-semibold">92.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bias Mitigation</span>
                    <span className="font-semibold">93.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transparency</span>
                    <span className="font-semibold">95.0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Registered</span>
                    <span className="font-semibold">45,623</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eligible for Allocation</span>
                    <span className="font-semibold">42,156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Successfully Allocated</span>
                    <span className="font-semibold">38,901</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Allocation Rate</span>
                    <Badge variant="secondary">92.3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Perfect Matches</span>
                    <span className="font-semibold">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Good Matches</span>
                    <span className="font-semibold">27%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Acceptable Matches</span>
                    <span className="font-semibold">6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Satisfaction</span>
                    <Badge variant="secondary">4.7/5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Response Time</span>
                    <Badge className="bg-chart-2 text-white">245ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Performance</span>
                    <Badge className="bg-chart-2 text-white">Optimal</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Model Accuracy</span>
                    <Badge className="bg-chart-2 text-white">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <Badge className="bg-chart-2 text-white">99.8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
