export interface User {
  id: string
  email: string
  role: "student" | "employer" | "admin"
  name?: string
  company?: string
}

export const authUtils = {
  // Check if user is authenticated for specific role
  isAuthenticated: (role: "student" | "employer" | "admin"): boolean => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(`${role}Auth`) === "true"
  },

  // Get current user data
  getCurrentUser: (role: "student" | "employer" | "admin"): User | null => {
    if (typeof window === "undefined") return null

    const isAuth = localStorage.getItem(`${role}Auth`) === "true"
    const email = localStorage.getItem(`${role}Email`)

    if (!isAuth || !email) return null

    return {
      id: `${role}_${Date.now()}`,
      email,
      role,
      name: role === "admin" ? "Government Admin" : email.split("@")[0],
      company: role === "employer" ? email.split("@")[1] : undefined,
    }
  },

  // Logout user
  logout: (role: "student" | "employer" | "admin"): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(`${role}Auth`)
    localStorage.removeItem(`${role}Email`)
  },

  // Redirect to login if not authenticated
  requireAuth: (role: "student" | "employer" | "admin"): boolean => {
    const isAuth = authUtils.isAuthenticated(role)
    if (!isAuth && typeof window !== "undefined") {
      window.location.href = `/${role}/login`
    }
    return isAuth
  },
}
