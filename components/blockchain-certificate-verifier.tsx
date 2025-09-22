"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface VerificationResult {
  isValid: boolean
  certificateId: string
  transactionHash: string
  blockNumber: number
  confirmations: number
  networkStatus: string
  lastVerified: string
  certificateData: any
}

export function BlockchainCertificateVerifier() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)

  const handleVerify = async () => {
    if (!searchQuery.trim()) return

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      const isTransactionHash = searchQuery.startsWith("0x")
      const queryParam = isTransactionHash ? `transactionHash=${searchQuery}` : `certificateId=${searchQuery}`

      const response = await fetch(`/api/blockchain/verify-certificate?${queryParam}`)
      const result = await response.json()

      if (result.success) {
        setVerificationResult(result.data)
      }
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Blockchain Certificate Verifier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search-query">Certificate ID or Transaction Hash</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="search-query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter certificate ID or transaction hash (0x...)"
                className="flex-1"
              />
              <Button onClick={handleVerify} disabled={!searchQuery.trim() || isVerifying}>
                {isVerifying ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {verificationResult.isValid ? (
                  <CheckCircle className="w-5 h-5 text-chart-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                Verification Results
              </span>
              <Badge className={verificationResult.isValid ? "bg-chart-2 text-white" : "bg-destructive text-white"}>
                {verificationResult.isValid ? "Valid" : "Invalid"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {verificationResult.isValid ? (
              <>
                {/* Certificate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Certificate Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Student:</span>
                        <span className="font-medium">{verificationResult.certificateData.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Internship:</span>
                        <span className="font-medium">{verificationResult.certificateData.internshipTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{verificationResult.certificateData.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completion:</span>
                        <span className="font-medium">
                          {new Date(verificationResult.certificateData.completionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grade:</span>
                        <Badge variant="outline">{verificationResult.certificateData.grade}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Blockchain Verification</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Block Number:</span>
                        <span className="font-mono">#{verificationResult.blockNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confirmations:</span>
                        <span className="font-medium text-chart-2">{verificationResult.confirmations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network Status:</span>
                        <Badge className="bg-chart-2 text-white">{verificationResult.networkStatus}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Verified:</span>
                        <span className="font-medium">
                          {new Date(verificationResult.lastVerified).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {verificationResult.certificateData.skills && (
                  <div>
                    <h4 className="font-semibold mb-3">Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.certificateData.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transaction Hash */}
                <div>
                  <Label className="text-sm font-medium">Transaction Hash</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">
                      {verificationResult.transactionHash}
                    </code>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={`https://pm-intern-explorer.gov.in/tx/${verificationResult.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <XCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
                <h3 className="text-lg font-semibold mb-2">Certificate Not Found</h3>
                <p className="text-muted-foreground">
                  The certificate ID or transaction hash you entered could not be verified on the blockchain.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
