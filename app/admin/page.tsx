import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Header } from "@/components/header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboard />
    </div>
  )
}
