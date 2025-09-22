import { SmartAllocation } from "@/components/admin/smart-allocation"
import { Header } from "@/components/header"

export default function SmartAllocationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SmartAllocation />
    </div>
  )
}
