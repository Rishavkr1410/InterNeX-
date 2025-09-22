import { BlockchainCertificateGenerator } from "@/components/blockchain-certificate-generator"

export default function BlockchainCertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blockchain Certificate Generation</h1>
        <p className="text-muted-foreground">
          Create tamper-proof, verifiable certificates on the blockchain for internship completions
        </p>
      </div>

      <BlockchainCertificateGenerator />
    </div>
  )
}
