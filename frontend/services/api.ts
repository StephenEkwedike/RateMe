// services/api.ts
// Tiny Axios wrapper with interceptors for auth and 401 handling
import axios from "axios"

// Base backend origin (no /api suffix)
const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5002';
export const api = axios.create({
  baseURL: BACKEND_ORIGIN,
  withCredentials: true, // send cookies if using session/JWT cookies
})

// Request interceptor to inject auth token from localStorage (if using token-based auth)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor to catch 401s and redirect to sign-in
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/sign-in"
    }
    return Promise.reject(error)
  }
)