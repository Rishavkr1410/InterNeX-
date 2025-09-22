import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface CertificateData {
  studentName: string
  studentId: string
  internshipTitle: string
  companyName: string
  duration: string
  completionDate: string
  skills: string[]
  mentorName: string
  grade: string
}

// Mock blockchain transaction
function generateBlockchainHash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex")
}

function createMerkleRoot(transactions: string[]): string {
  if (transactions.length === 0) return ""
  if (transactions.length === 1) return transactions[0]

  const nextLevel: string[] = []
  for (let i = 0; i < transactions.length; i += 2) {
    const left = transactions[i]
    const right = i + 1 < transactions.length ? transactions[i + 1] : left
    const combined = left + right
    nextLevel.push(crypto.createHash("sha256").update(combined).digest("hex"))
  }

  return createMerkleRoot(nextLevel)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const certificateData: CertificateData = body

    // Validate required fields
    const requiredFields = ["studentName", "studentId", "internshipTitle", "companyName", "completionDate"]
    for (const field of requiredFields) {
      if (!certificateData[field as keyof CertificateData]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create certificate payload
    const certificatePayload = {
      ...certificateData,
      issueDate: new Date().toISOString(),
      certificateId: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      version: "1.0",
    }

    // Generate blockchain data
    const dataString = JSON.stringify(certificatePayload)
    const transactionHash = generateBlockchainHash(dataString)
    const timestamp = Date.now()

    // Mock blockchain block creation
    const blockData = {
      blockNumber: Math.floor(Math.random() * 1000000) + 500000,
      timestamp,
      previousHash: generateBlockchainHash(`prev-${timestamp}`),
      merkleRoot: createMerkleRoot([transactionHash]),
      transactions: [
        {
          hash: transactionHash,
          type: "CERTIFICATE_ISSUE",
          data: certificatePayload,
          gasUsed: "21000",
          status: "success",
        },
      ],
      nonce: Math.floor(Math.random() * 1000000),
      difficulty: "0x1bc16d674ec80000",
    }

    const blockHash = generateBlockchainHash(JSON.stringify(blockData))

    // Simulate blockchain confirmation time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const blockchainCertificate = {
      certificateId: certificatePayload.certificateId,
      blockHash,
      blockNumber: blockData.blockNumber,
      transactionHash,
      confirmations: 12,
      networkId: "PM-INTERN-CHAIN",
      smartContractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF",
      gasUsed: blockData.transactions[0].gasUsed,
      certificateData: certificatePayload,
      verificationUrl: `https://pm-intern-explorer.gov.in/tx/${transactionHash}`,
      ipfsHash: `Qm${Math.random().toString(36).substr(2, 44)}`,
      issuedAt: new Date().toISOString(),
      expiresAt: null, // Permanent certificate
    }

    return NextResponse.json({
      success: true,
      data: blockchainCertificate,
    })
  } catch (error) {
    console.error("Blockchain certificate generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
