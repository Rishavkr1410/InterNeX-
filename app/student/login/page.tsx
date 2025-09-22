import { StudentLogin } from "@/components/student/student-login"
import { Header } from "@/components/header"

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StudentLogin />
    </div>
  )
}
