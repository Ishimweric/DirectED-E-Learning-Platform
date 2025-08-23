import type {
  Course,
  SearchCoursesRequest,
  CreateCourseRequest,
  ApiResponse,
  PaginatedResponse,
  Enrollment,
  Review,
} from "../../types/api"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

class CoursesService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async searchCourses(params: SearchCoursesRequest): Promise<ApiResponse<PaginatedResponse<Course>>> {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })

      const response = await fetch(`${API_BASE_URL}/courses?${queryParams}`, {
        headers: { "Content-Type": "application/json" },
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to fetch courses" }],
      }
    }
  }

  async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        headers: { "Content-Type": "application/json" },
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to fetch course" }],
      }
    }
  }

  async createCourse(courseData: CreateCourseRequest): Promise<ApiResponse<Course>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(courseData),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to create course" }],
      }
    }
  }

  async updateCourse(courseId: string, courseData: Partial<CreateCourseRequest>): Promise<ApiResponse<Course>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(courseData),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to update course" }],
      }
    }
  }

  async deleteCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to delete course" }],
      }
    }
  }

  async enrollInCourse(courseId: string): Promise<ApiResponse<Enrollment>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to enroll in course" }],
      }
    }
  }

  async getMyEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/enrollments/my`, {
        headers: this.getAuthHeaders(),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to fetch enrollments" }],
      }
    }
  }

  async getCourseReviews(courseId: string): Promise<ApiResponse<Review[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/reviews`, {
        headers: { "Content-Type": "application/json" },
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to fetch reviews" }],
      }
    }
  }

  async addReview(courseId: string, rating: number, comment: string): Promise<ApiResponse<Review>> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/reviews`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ rating, comment }),
      })

      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errors: [{ message: "Failed to add review" }],
      }
    }
  }
}

export const coursesService = new CoursesService()
