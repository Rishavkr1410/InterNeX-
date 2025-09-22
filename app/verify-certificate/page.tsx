import { BlockchainCertificateVerifier } from "@/components/blockchain-certificate-verifier"

export default function VerifyCertificatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
        <p className="text-muted-foreground">
          Verify the authenticity of blockchain certificates using certificate ID or transaction hash
        </p>
      </div>

      <BlockchainCertificateVerifier />
    </div>
  )
}
