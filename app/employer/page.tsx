import { EmployerDashboard } from "@/components/employer/employer-dashboard"
import { Header } from "@/components/header"

export default function EmployerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EmployerDashboard />
    </div>
  )
}
