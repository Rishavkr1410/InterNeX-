import { AICertificateUpload } from "@/components/ai-certificate-upload"

export default function CertificateVerificationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate Verification</h1>
        <p className="text-muted-foreground">
          Upload and verify certificates using our advanced AI authentication system
        </p>
      </div>

      <AICertificateUpload />
    </div>
  )
}
