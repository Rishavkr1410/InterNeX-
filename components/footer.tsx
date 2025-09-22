import { Badge } from "@/components/ui/badge"
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold">PM Internship</h3>
                <p className="text-xs text-muted-foreground">Smart Allocation</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Ministry of Corporate Affairs
            </Badge>
            <p className="text-sm text-muted-foreground">
              Ensuring fair and optimal internship allocation through AI-powered matching and blockchain verification.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Browse Internships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Skill Assessment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Certificate Verification
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Post Internships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Find Candidates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Employer Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@pminternship.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Ministry of Corporate Affairs. All rights reserved. | SIH 2025 Project</p>
        </div>
      </div>
    </footer>
  )
}
