"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Calendar, Users, Plus, X, Sparkles, Eye } from "lucide-react"

export function PostInternship() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [benefits, setBenefits] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const toggleBenefit = (benefit: string) => {
    setBenefits((prev) => (prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]))
  }

  const availableBenefits = [
    "Stipend",
    "Certificate",
    "Letter of Recommendation",
    "Mentorship",
    "Flexible Hours",
    "Work from Home",
    "Learning & Development",
    "Pre-placement Offer",
  ]

  const handlePreviewPosting = () => {
    setShowPreview(true)
  }

  const handlePublishInternship = async () => {
    setIsPublishing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Internship posted successfully! It will be reviewed and published within 24 hours.")
    setIsPublishing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post New Internship</h1>
        <p className="text-muted-foreground">
          Create a detailed internship posting to attract the best talent through our AI-powered matching system
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Internship Title *</Label>
                <Input id="title" placeholder="e.g., Software Development Intern" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Internship Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what the intern will learn"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Duration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="e.g., Mumbai, Maharashtra" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workMode">Work Mode *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 month</SelectItem>
                      <SelectItem value="2">2 months</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="5">5 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="6+">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                  <Input id="applicationDeadline" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Skills & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Required Skills *</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a required skill"
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCgpa">Minimum CGPA</Label>
                    <Input id="minCgpa" placeholder="e.g., 7.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eligibleCourses">Eligible Courses</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="business">Business/Management</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibleYears">Eligible Academic Years</Label>
                  <div className="flex flex-wrap gap-2">
                    {["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"].map((year) => (
                      <div key={year} className="flex items-center space-x-2">
                        <Checkbox id={year} />
                        <Label htmlFor={year} className="text-sm">
                          {year}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                  <Textarea
                    id="additionalRequirements"
                    placeholder="Any specific requirements, certifications, or qualifications"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Compensation & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stipend">Monthly Stipend</Label>
                  <Input id="stipend" placeholder="e.g., ₹15,000 or Unpaid" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions *</Label>
                  <Input id="positions" type="number" placeholder="e.g., 5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Benefits & Perks</Label>
                <div className="grid md:grid-cols-2 gap-2">
                  {availableBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <Checkbox
                        id={benefit}
                        checked={benefits.includes(benefit)}
                        onCheckedChange={() => toggleBenefit(benefit)}
                      />
                      <Label htmlFor={benefit} className="text-sm">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalBenefits">Additional Benefits</Label>
                <Textarea
                  id="additionalBenefits"
                  placeholder="Describe any other benefits, learning opportunities, or perks"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Matching Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">85%</div>
                <div className="text-sm text-muted-foreground">Expected Match Quality</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated Applications</span>
                  <span className="font-semibold">40-60</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Top Skills Match</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Location Preference</span>
                  <span className="font-semibold">78%</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full bg-transparent" onClick={handlePreviewPosting}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Posting
                </Button>
                <Button className="w-full" onClick={handlePublishInternship} disabled={isPublishing}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isPublishing ? "Publishing..." : "Publish Internship"}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Your posting will be reviewed and published within 24 hours
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Internship Posting Preview</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Software Development Intern</h4>
                <p className="text-muted-foreground mb-2">Engineering Department • Mumbai • Full-time</p>
                <p className="text-sm mb-3">6 months duration • Starting March 2025</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  This is a preview of how your internship posting will appear to students.
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close Preview
              </Button>
              <Button
                onClick={() => {
                  setShowPreview(false)
                  handlePublishInternship()
                }}
              >
                Publish Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
