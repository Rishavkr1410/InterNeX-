"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Link, Copy, Download, ExternalLink, CheckCircle } from "lucide-react"

interface BlockchainCertificate {
  certificateId: string
  blockHash: string
  blockNumber: number
  transactionHash: string
  confirmations: number
  networkId: string
  smartContractAddress: string
  verificationUrl: string
  ipfsHash: string
  certificateData: any
  issuedAt: string
}

export function BlockchainCertificateGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCertificate, setGeneratedCertificate] = useState<BlockchainCertificate | null>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    internshipTitle: "",
    companyName: "",
    duration: "",
    completionDate: "",
    skills: "",
    mentorName: "",
    grade: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate blockchain generation steps
    const steps = [
      { message: "Validating certificate data...", progress: 20 },
      { message: "Creating blockchain transaction...", progress: 40 },
      { message: "Mining block...", progress: 60 },
      { message: "Confirming on network...", progress: 80 },
      { message: "Generating IPFS hash...", progress: 90 },
      { message: "Certificate created!", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(step.progress)
    }

    try {
      const response = await fetch("/api/blockchain/generate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        }),
      })

      const result = await response.json()
      if (result.success) {
        setGeneratedCertificate(result.data)
      }
    } catch (error) {
      console.error("Certificate generation failed:", error)
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCertificate = () => {
    if (!generatedCertificate) return

    const certificateData = {
      ...generatedCertificate,
      downloadedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(certificateData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `blockchain-certificate-${generatedCertificate.certificateId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Blockchain Certificate Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="student-name">Student Name</Label>
              <Input
                id="student-name"
                value={formData.studentName}
                onChange={(e) => setFormData((prev) => ({ ...prev, studentName: e.target.value }))}
                placeholder="Enter student name"
              />
            </div>
            <div>
              <Label htmlFor="student-id">Student ID</Label>
              <Input
                id="student-id"
                value={formData.studentId}
                onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <Label htmlFor="internship-title">Internship Title</Label>
              <Input
                id="internship-title"
                value={formData.internshipTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, internshipTitle: e.target.value }))}
                placeholder="Enter internship title"
              />
            </div>
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={formData.companyName}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 3 months"
              />
            </div>
            <div>
              <Label htmlFor="completion-date">Completion Date</Label>
              <Input
                id="completion-date"
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, completionDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="mentor-name">Mentor Name</Label>
              <Input
                id="mentor-name"
                value={formData.mentorName}
                onChange={(e) => setFormData((prev) => ({ ...prev, mentorName: e.target.value }))}
                placeholder="Enter mentor name"
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ (Outstanding)</SelectItem>
                  <SelectItem value="A">A (Excellent)</SelectItem>
                  <SelectItem value="B+">B+ (Very Good)</SelectItem>
                  <SelectItem value="B">B (Good)</SelectItem>
                  <SelectItem value="C">C (Satisfactory)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Skills Acquired (comma-separated)</Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
              placeholder="e.g., Product Strategy, Market Research, Data Analysis"
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={
              !formData.studentName ||
              !formData.studentId ||
              !formData.internshipTitle ||
              !formData.companyName ||
              !formData.completionDate ||
              isGenerating
            }
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                Generating Blockchain Certificate...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Generate Blockchain Certificate
              </>
            )}
          </Button>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Creating blockchain certificate...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="w-full" />
              <div className="text-xs text-muted-foreground text-center">
                {generationProgress < 40 && "Validating certificate data..."}
                {generationProgress >= 40 && generationProgress < 60 && "Creating blockchain transaction..."}
                {generationProgress >= 60 && generationProgress < 80 && "Mining block..."}
                {generationProgress >= 80 && generationProgress < 100 && "Confirming on network..."}
                {generationProgress === 100 && "Certificate created successfully!"}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Certificate */}
      {generatedCertificate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-chart-2" />
                Blockchain Certificate Generated
              </span>
              <Badge className="bg-chart-2 text-white">Confirmed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Certificate Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Certificate Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate ID:</span>
                    <span className="font-mono">{generatedCertificate.certificateId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student:</span>
                    <span className="font-medium">{generatedCertificate.certificateData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Internship:</span>
                    <span className="font-medium">{generatedCertificate.certificateData.internshipTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company:</span>
                    <span className="font-medium">{generatedCertificate.certificateData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade:</span>
                    <Badge variant="outline">{generatedCertificate.certificateData.grade}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Blockchain Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span className="font-mono">#{generatedCertificate.blockNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmations:</span>
                    <span className="font-medium text-chart-2">{generatedCertificate.confirmations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="font-medium">{generatedCertificate.networkId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Used:</span>
                    <span className="font-mono">{generatedCertificate.gasUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issued:</span>
                    <span className="font-medium">{new Date(generatedCertificate.issuedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hashes */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Transaction Hash</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">
                    {generatedCertificate.transactionHash}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatedCertificate.transactionHash)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Block Hash</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">
                    {generatedCertificate.blockHash}
                  </code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedCertificate.blockHash)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">IPFS Hash</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">
                    {generatedCertificate.ipfsHash}
                  </code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedCertificate.ipfsHash)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button onClick={downloadCertificate} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button asChild variant="outline">
                <a href={generatedCertificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </a>
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard(generatedCertificate.verificationUrl)}>
                <Link className="w-4 h-4 mr-2" />
                Copy Verification URL
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
