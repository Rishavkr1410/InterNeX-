import { StudentRegistration } from "@/components/student/student-registration"
import { Header } from "@/components/header"

export default function StudentRegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StudentRegistration />
    </div>
  )
}
