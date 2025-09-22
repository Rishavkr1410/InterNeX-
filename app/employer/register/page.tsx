import { EmployerRegistration } from "@/components/employer/employer-registration"
import { Header } from "@/components/header"

export default function EmployerRegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmployerRegistration />
    </div>
  )
}
