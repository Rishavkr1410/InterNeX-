import { CertificateVerification } from "@/components/admin/certificate-verification"
import { Header } from "@/components/header"

export default function CertificateVerificationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CertificateVerification />
    </div>
  )
}
