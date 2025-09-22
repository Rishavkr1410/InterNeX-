"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Building2, User, FileText, Upload, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export function EmployerRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [documents, setDocuments] = useState<File[]>([])

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setDocuments([...documents, ...Array.from(files)])
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Employer Registration</h1>
            <p className="text-muted-foreground">
              Register your company to access top talent through our AI-powered matching system
            </p>
          </div>
          <Link href="/employer/login">
            <Button variant="outline">Already registered?</Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 1 && (
              <>
                <Building2 className="w-5 h-5" />
                Company Information
              </>
            )}
            {currentStep === 2 && (
              <>
                <User className="w-5 h-5" />
                Contact Person Details
              </>
            )}
            {currentStep === 3 && (
              <>
                <FileText className="w-5 h-5" />
                Verification & Documents
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" placeholder="Enter your company name" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                      <SelectItem value="small">Small (51-200 employees)</SelectItem>
                      <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                      <SelectItem value="large">Large (1001-5000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (5000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input id="website" placeholder="https://www.company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters Location *</Label>
                <Input id="headquarters" placeholder="City, State" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your company, its mission, and what you do"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input id="gstNumber" placeholder="Enter GST number (if applicable)" />
              </div>
            </div>
          )}

          {/* Step 2: Contact Person Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactFirstName">Contact Person First Name *</Label>
                  <Input id="contactFirstName" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactLastName">Contact Person Last Name *</Label>
                  <Input id="contactLastName" placeholder="Enter last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input id="designation" placeholder="e.g., HR Manager, Talent Acquisition Lead" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Official Email Address *</Label>
                  <Input id="contactEmail" type="email" placeholder="hr@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input id="contactPhone" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternateEmail">Alternate Email</Label>
                <Input id="alternateEmail" type="email" placeholder="alternate@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                <Input id="linkedinProfile" placeholder="https://linkedin.com/in/profile" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Create Password *</Label>
                <Input id="password" type="password" placeholder="Create a strong password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
              </div>
            </div>
          )}

          {/* Step 3: Verification & Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Company Verification Documents</Label>
                <p className="text-sm text-muted-foreground">
                  Upload documents to verify your company. This helps build trust with students and ensures platform
                  security.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certificate of Incorporation</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-2">PDF, JPG, PNG (Max 5MB)</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="incorporation-upload"
                      />
                      <Label htmlFor="incorporation-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm">
                          Upload Document
                        </Button>
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>GST Certificate (if applicable)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-2">PDF, JPG, PNG (Max 5MB)</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="gst-upload"
                      />
                      <Label htmlFor="gst-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm">
                          Upload Document
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Uploaded Documents:</Label>
                    {documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{file.name}</span>
                        <CheckCircle className="w-4 h-4 text-chart-2" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Internship Program Details</Label>
                <div className="space-y-2">
                  <Label htmlFor="internshipTypes">Types of Internships You Offer</Label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Software Development",
                      "Data Science",
                      "Digital Marketing",
                      "Finance",
                      "Human Resources",
                      "Operations",
                      "Design",
                      "Sales",
                      "Research",
                      "Content Writing",
                      "Business Development",
                      "Other",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expectedInterns">Expected Number of Interns per Year</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 interns</SelectItem>
                        <SelectItem value="6-15">6-15 interns</SelectItem>
                        <SelectItem value="16-30">16-30 interns</SelectItem>
                        <SelectItem value="31-50">31-50 interns</SelectItem>
                        <SelectItem value="50+">50+ interns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipDuration">Typical Internship Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 months</SelectItem>
                        <SelectItem value="3-4">3-4 months</SelectItem>
                        <SelectItem value="5-6">5-6 months</SelectItem>
                        <SelectItem value="6+">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms & Conditions, Privacy Policy, and confirm that all information provided is
                  accurate *
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Registration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
