import { StudentDashboard } from "@/components/student/student-dashboard"
import { Header } from "@/components/header"

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StudentDashboard />
    </div>
  )
}
