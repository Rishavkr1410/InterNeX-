"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileImage, CheckCircle, AlertCircle, XCircle, Brain } from "lucide-react"

interface VerificationResult {
  certificateId: string
  overallConfidence: number
  status: "verified" | "review_required" | "rejected"
  analysisResults: any
  verificationTimestamp: string
  flags: string[]
}

export function AICertificateUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [formData, setFormData] = useState({
    studentName: "",
    certificateName: "",
    issuer: "",
  })

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      setVerificationResult(null)
    }
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      setVerificationResult(null)
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const handleVerification = async () => {
    if (!selectedFile || !formData.studentName || !formData.certificateName || !formData.issuer) {
      return
    }

    setIsVerifying(true)

    try {
      // Convert file to base64 for API
      const reader = new FileReader()
      reader.onload = async () => {
        const response = await fetch("/api/certificates/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificateImage: reader.result,
            ...formData,
          }),
        })

        const result = await response.json()
        if (result.success) {
          setVerificationResult(result.data)
        }
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-chart-2" />
      case "review_required":
        return <AlertCircle className="w-5 h-5 text-secondary" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-chart-2 text-white"
      case "review_required":
        return "bg-secondary text-secondary-foreground"
      case "rejected":
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
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Certificate Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="certificate-upload">Certificate Image</Label>
            <div
              className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <FileImage className="w-12 h-12 mx-auto text-chart-1" />
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-lg font-medium">Drop certificate image here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
              )}
              <input
                id="certificate-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="certificate-name">Certificate Name</Label>
              <Input
                id="certificate-name"
                value={formData.certificateName}
                onChange={(e) => setFormData((prev) => ({ ...prev, certificateName: e.target.value }))}
                placeholder="Enter certificate name"
              />
            </div>
            <div>
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData((prev) => ({ ...prev, issuer: e.target.value }))}
                placeholder="Enter issuer name"
              />
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerification}
            disabled={
              !selectedFile || !formData.studentName || !formData.certificateName || !formData.issuer || isVerifying
            }
            className="w-full"
          >
            {isVerifying ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                AI Analyzing Certificate...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Verify with AI
              </>
            )}
          </Button>

          {/* Verification Progress */}
          {isVerifying && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing certificate...</span>
                <span>Analyzing</span>
              </div>
              <Progress value={75} className="w-full" />
              <div className="text-xs text-muted-foreground text-center">
                AI is extracting text, verifying logos, and checking issuer database
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Verification Results</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(verificationResult.status)}
                <Badge className={getStatusColor(verificationResult.status)}>
                  {verificationResult.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Confidence */}
            <div className="text-center">
              <div className={`text-4xl font-bold ${getConfidenceColor(verificationResult.overallConfidence)}`}>
                {verificationResult.overallConfidence}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Confidence</div>
            </div>

            {/* Analysis Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Text Extraction</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Name Match:</span>
                      <span className="font-medium">
                        {verificationResult.analysisResults.textExtraction.detectedName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Course Match:</span>
                      <span className="font-medium">
                        {verificationResult.analysisResults.textExtraction.detectedCourse}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span
                        className={`font-medium ${getConfidenceColor(verificationResult.analysisResults.textExtraction.confidence)}`}
                      >
                        {Math.round(verificationResult.analysisResults.textExtraction.confidence)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Image Analysis</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Logo Verified:</span>
                      <span
                        className={
                          verificationResult.analysisResults.imageAnalysis.logoVerification
                            ? "text-chart-2"
                            : "text-destructive"
                        }
                      >
                        {verificationResult.analysisResults.imageAnalysis.logoVerification ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Template Match:</span>
                      <span
                        className={
                          verificationResult.analysisResults.imageAnalysis.templateMatching
                            ? "text-chart-2"
                            : "text-destructive"
                        }
                      >
                        {verificationResult.analysisResults.imageAnalysis.templateMatching ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Score:</span>
                      <span
                        className={`font-medium ${getConfidenceColor(verificationResult.analysisResults.imageAnalysis.qualityScore)}`}
                      >
                        {Math.round(verificationResult.analysisResults.imageAnalysis.qualityScore)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Issuer Verification</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Known Issuer:</span>
                      <span
                        className={
                          verificationResult.analysisResults.issuerVerification.knownIssuer
                            ? "text-chart-2"
                            : "text-destructive"
                        }
                      >
                        {verificationResult.analysisResults.issuerVerification.knownIssuer ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Database:</span>
                      <span
                        className={
                          verificationResult.analysisResults.issuerVerification.issuerDatabase
                            ? "text-chart-2"
                            : "text-destructive"
                        }
                      >
                        {verificationResult.analysisResults.issuerVerification.issuerDatabase ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format Valid:</span>
                      <span
                        className={
                          verificationResult.analysisResults.issuerVerification.certificateFormat
                            ? "text-chart-2"
                            : "text-destructive"
                        }
                      >
                        {verificationResult.analysisResults.issuerVerification.certificateFormat ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Flags */}
            {verificationResult.flags.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Verification Flags</h4>
                <div className="flex flex-wrap gap-2">
                  {verificationResult.flags.map((flag, index) => (
                    <Badge key={index} variant="outline" className="text-destructive border-destructive">
                      {flag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate ID */}
            <div className="text-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">Certificate ID</div>
              <div className="font-mono text-lg">{verificationResult.certificateId}</div>
              <div className="text-xs text-muted-foreground">
                Verified on {new Date(verificationResult.verificationTimestamp).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
