import { AdminLogin } from "@/components/admin/admin-login"
import { Header } from "@/components/header"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminLogin />
    </div>
  )
}
