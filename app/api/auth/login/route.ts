import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, otp } = await request.json()

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Demo authentication logic
    let isValid = false

    switch (role) {
      case "admin":
        isValid = email === "admin@mca.gov.in" && password === "admin123" && otp === "123456"
        break
      case "student":
        isValid = email.includes("@") && password.length >= 6
        break
      case "employer":
        isValid =
          email.includes("@") && !email.includes("@gmail.com") && !email.includes("@yahoo.com") && password.length >= 6
        break
    }

    if (isValid) {
      // In a real app, you'd generate a JWT token here
      return NextResponse.json({
        success: true,
        user: {
          id: `${role}_${Date.now()}`,
          email,
          role,
          name: role === "admin" ? "Government Admin" : email.split("@")[0],
        },
      })
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
