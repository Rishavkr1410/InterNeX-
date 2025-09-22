export interface Student {
  id: string
  name: string
  email: string
  cgpa: number
  university: string
  state: string
  course: string
  year: number
  skills: string[]
  preferences: {
    locations: string[]
    industries: string[]
    workMode: "remote" | "hybrid" | "onsite" | "any"
  }
  demographics: {
    category: "General" | "OBC" | "SC" | "ST" | "EWS"
    gender: "Male" | "Female" | "Other"
    disability: boolean
  }
  applicationDate: Date
}

export interface Internship {
  id: string
  title: string
  company: string
  location: string
  skills: string[]
  minCgpa: number
  positions: number
  department: string
  workMode: "remote" | "hybrid" | "onsite"
  eligibleCourses: string[]
  eligibleYears: number[]
}

export interface AllocationConfig {
  skillWeight: number
  cgpaWeight: number
  locationWeight: number
  diversityWeight: number
  reservationQuotas: {
    SC: number // 15%
    ST: number // 7.5%
    OBC: number // 27%
    EWS: number // 10%
    General: number // 40.5%
  }
  genderDiversityTarget: number // 33% minimum for underrepresented gender
  stateQuotas: Record<string, number>
  maxAllocationsPerState: number
}

export interface AllocationResult {
  studentId: string
  internshipId: string
  matchScore: number
  allocationReason: string
  fairnessScore: number
  diversityContribution: number
}

export class FairnessAlgorithm {
  private config: AllocationConfig

  constructor(config: AllocationConfig) {
    this.config = config
  }

  // Calculate skill match score between student and internship
  private calculateSkillMatch(student: Student, internship: Internship): number {
    const studentSkills = student.skills.map((s) => s.toLowerCase())
    const requiredSkills = internship.skills.map((s) => s.toLowerCase())

    if (requiredSkills.length === 0) return 100

    const matchedSkills = requiredSkills.filter((skill) =>
      studentSkills.some((studentSkill) => studentSkill.includes(skill) || skill.includes(studentSkill)),
    )

    return (matchedSkills.length / requiredSkills.length) * 100
  }

  // Calculate CGPA score with normalization
  private calculateCgpaScore(student: Student, internship: Internship): number {
    if (student.cgpa < internship.minCgpa) return 0

    // Normalize CGPA to 0-100 scale (assuming max CGPA is 10)
    const normalizedCgpa = (student.cgpa / 10) * 100

    // Give bonus for exceeding minimum requirements
    const bonus = Math.min((student.cgpa - internship.minCgpa) * 10, 20)

    return Math.min(normalizedCgpa + bonus, 100)
  }

  // Calculate location preference score
  private calculateLocationScore(student: Student, internship: Internship): number {
    // Perfect match if student's state matches internship location
    if (student.state === internship.location) return 100

    // Good match if student prefers this location
    if (student.preferences.locations.includes(internship.location)) return 80

    // Check for regional proximity (simplified)
    const regionMap: Record<string, string[]> = {
      North: ["Delhi", "Punjab", "Haryana", "Uttar Pradesh", "Uttarakhand"],
      South: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala"],
      West: ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
      East: ["West Bengal", "Odisha", "Jharkhand", "Bihar"],
    }

    for (const [region, states] of Object.entries(regionMap)) {
      if (states.includes(student.state) && states.includes(internship.location)) {
        return 60
      }
    }

    // Default score for different regions
    return 30
  }

  // Calculate diversity bonus score
  private calculateDiversityScore(
    student: Student,
    internship: Internship,
    currentAllocations: AllocationResult[],
  ): number {
    let diversityScore = 0

    // Get current allocations for this internship
    const internshipAllocations = currentAllocations.filter((a) => a.internshipId === internship.id)
    const totalAllocated = internshipAllocations.length

    if (totalAllocated === 0) return 50 // Base score for first allocation

    // Category diversity bonus
    const categoryCount = internshipAllocations.filter((a) => {
      // This would need to be looked up from student data
      return false // Simplified for now
    }).length

    const categoryRatio = categoryCount / totalAllocated
    const targetRatio = this.config.reservationQuotas[student.demographics.category] / 100

    if (categoryRatio < targetRatio) {
      diversityScore += 30 // Bonus for underrepresented category
    }

    // Gender diversity bonus
    const genderCount = internshipAllocations.filter((a) => {
      // This would need to be looked up from student data
      return false // Simplified for now
    }).length

    const genderRatio = genderCount / totalAllocated
    if (genderRatio < 0.33) {
      // Target 33% minimum representation
      diversityScore += 20
    }

    // State diversity bonus
    const stateCount = internshipAllocations.filter((a) => {
      // This would need to be looked up from student data
      return false // Simplified for now
    }).length

    const stateRatio = stateCount / totalAllocated
    if (stateRatio < 0.2) {
      // Encourage state diversity
      diversityScore += 15
    }

    return Math.min(diversityScore, 100)
  }

  // Calculate overall match score
  public calculateMatchScore(
    student: Student,
    internship: Internship,
    currentAllocations: AllocationResult[] = [],
  ): number {
    // Check basic eligibility
    if (student.cgpa < internship.minCgpa) return 0
    if (
      !internship.eligibleCourses.includes("all") &&
      !internship.eligibleCourses.includes(student.course.toLowerCase())
    )
      return 0
    if (!internship.eligibleYears.includes(student.year)) return 0

    const skillScore = this.calculateSkillMatch(student, internship)
    const cgpaScore = this.calculateCgpaScore(student, internship)
    const locationScore = this.calculateLocationScore(student, internship)
    const diversityScore = this.calculateDiversityScore(student, internship, currentAllocations)

    const weightedScore =
      (skillScore * this.config.skillWeight +
        cgpaScore * this.config.cgpaWeight +
        locationScore * this.config.locationWeight +
        diversityScore * this.config.diversityWeight) /
      100

    return Math.round(weightedScore * 100) / 100
  }

  // Main allocation algorithm
  public allocateInternships(students: Student[], internships: Internship[]): AllocationResult[] {
    const results: AllocationResult[] = []
    const availablePositions = new Map<string, number>()

    // Initialize available positions
    internships.forEach((internship) => {
      availablePositions.set(internship.id, internship.positions)
    })

    // Sort students by application date for fairness (first-come-first-served tie-breaker)
    const sortedStudents = [...students].sort((a, b) => a.applicationDate.getTime() - b.applicationDate.getTime())

    // Track allocations per state and category for quota management
    const stateAllocations = new Map<string, number>()
    const categoryAllocations = new Map<string, number>()

    for (const student of sortedStudents) {
      let bestMatch: { internship: Internship; score: number } | null = null

      // Find best matching internship for this student
      for (const internship of internships) {
        const available = availablePositions.get(internship.id) || 0
        if (available <= 0) continue

        // Check state quota constraints
        const currentStateCount = stateAllocations.get(student.state) || 0
        const maxStateAllocation = this.config.stateQuotas[student.state] || this.config.maxAllocationsPerState
        if (currentStateCount >= maxStateAllocation) continue

        const matchScore = this.calculateMatchScore(student, internship, results)
        if (matchScore === 0) continue

        if (!bestMatch || matchScore > bestMatch.score) {
          bestMatch = { internship, score: matchScore }
        }
      }

      // Allocate to best match if found
      if (bestMatch) {
        const diversityScore = this.calculateDiversityScore(student, bestMatch.internship, results)

        results.push({
          studentId: student.id,
          internshipId: bestMatch.internship.id,
          matchScore: bestMatch.score,
          allocationReason: this.generateAllocationReason(student, bestMatch.internship, bestMatch.score),
          fairnessScore: this.calculateFairnessScore(student, bestMatch.internship),
          diversityContribution: diversityScore,
        })

        // Update counters
        const currentPositions = availablePositions.get(bestMatch.internship.id) || 0
        availablePositions.set(bestMatch.internship.id, currentPositions - 1)

        stateAllocations.set(student.state, (stateAllocations.get(student.state) || 0) + 1)
        categoryAllocations.set(
          student.demographics.category,
          (categoryAllocations.get(student.demographics.category) || 0) + 1,
        )
      }
    }

    return results
  }

  private generateAllocationReason(student: Student, internship: Internship, score: number): string {
    const reasons = []

    if (score >= 90) reasons.push("Excellent skill match")
    else if (score >= 80) reasons.push("Strong skill alignment")
    else if (score >= 70) reasons.push("Good overall fit")

    if (student.state === internship.location) reasons.push("Local candidate preference")
    if (student.cgpa >= internship.minCgpa + 1) reasons.push("Exceeds academic requirements")

    return reasons.join(", ") || "Meets basic requirements"
  }

  private calculateFairnessScore(student: Student, internship: Internship): number {
    // Simplified fairness score based on equal opportunity principles
    let fairnessScore = 70 // Base fairness score

    // Bonus for diversity categories
    if (["SC", "ST", "OBC", "EWS"].includes(student.demographics.category)) {
      fairnessScore += 15
    }

    // Bonus for underrepresented gender in tech
    if (student.demographics.gender === "Female" && ["engineering", "data-science"].includes(internship.department)) {
      fairnessScore += 10
    }

    // Bonus for disability inclusion
    if (student.demographics.disability) {
      fairnessScore += 5
    }

    return Math.min(fairnessScore, 100)
  }

  // Generate allocation statistics
  public generateAllocationStats(results: AllocationResult[], students: Student[]): any {
    const stats = {
      totalAllocated: results.length,
      averageMatchScore: results.reduce((sum, r) => sum + r.matchScore, 0) / results.length,
      averageFairnessScore: results.reduce((sum, r) => sum + r.fairnessScore, 0) / results.length,
      categoryDistribution: {} as Record<string, number>,
      genderDistribution: {} as Record<string, number>,
      stateDistribution: {} as Record<string, number>,
      matchScoreDistribution: {
        excellent: 0, // 90-100
        good: 0, // 80-89
        fair: 0, // 70-79
        acceptable: 0, // 60-69
      },
    }

    // Calculate distributions
    results.forEach((result) => {
      const student = students.find((s) => s.id === result.studentId)
      if (!student) return

      // Category distribution
      stats.categoryDistribution[student.demographics.category] =
        (stats.categoryDistribution[student.demographics.category] || 0) + 1

      // Gender distribution
      stats.genderDistribution[student.demographics.gender] =
        (stats.genderDistribution[student.demographics.gender] || 0) + 1

      // State distribution
      stats.stateDistribution[student.state] = (stats.stateDistribution[student.state] || 0) + 1

      // Match score distribution
      if (result.matchScore >= 90) stats.matchScoreDistribution.excellent++
      else if (result.matchScore >= 80) stats.matchScoreDistribution.good++
      else if (result.matchScore >= 70) stats.matchScoreDistribution.fair++
      else stats.matchScoreDistribution.acceptable++
    })

    return stats
  }
}

// Default configuration following Indian government guidelines
export const defaultAllocationConfig: AllocationConfig = {
  skillWeight: 40,
  cgpaWeight: 25,
  locationWeight: 20,
  diversityWeight: 15,
  reservationQuotas: {
    SC: 15,
    ST: 7.5,
    OBC: 27,
    EWS: 10,
    General: 40.5,
  },
  genderDiversityTarget: 33,
  stateQuotas: {
    Maharashtra: 200,
    Karnataka: 180,
    "Tamil Nadu": 170,
    Delhi: 120,
    "Uttar Pradesh": 250,
    "West Bengal": 140,
    Gujarat: 130,
    Rajasthan: 110,
    "Andhra Pradesh": 100,
    Telangana: 90,
  },
  maxAllocationsPerState: 300,
}
