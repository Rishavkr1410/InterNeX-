import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const certificateId = searchParams.get("certificateId")
  const transactionHash = searchParams.get("transactionHash")

  if (!certificateId && !transactionHash) {
    return NextResponse.json({ error: "Certificate ID or transaction hash required" }, { status: 400 })
  }

  // Simulate blockchain lookup
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock verification result
  const verificationResult = {
    isValid: Math.random() > 0.05, // 95% valid rate
    certificateId: certificateId || `CERT-${Date.now()}`,
    transactionHash: transactionHash || `0x${Math.random().toString(16).substr(2, 64)}`,
    blockNumber: Math.floor(Math.random() * 1000000) + 500000,
    confirmations: Math.floor(Math.random() * 100) + 12,
    networkStatus: "confirmed",
    lastVerified: new Date().toISOString(),
    certificateData: {
      studentName: "John Doe",
      internshipTitle: "Product Management Intern",
      companyName: "Tech Solutions Pvt Ltd",
      completionDate: "2024-12-15",
      grade: "A",
      skills: ["Product Strategy", "Market Research", "Data Analysis"],
    },
  }

  return NextResponse.json({
    success: true,
    data: verificationResult,
  })
}
