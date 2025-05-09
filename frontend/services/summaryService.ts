// services/summaryService.ts
// services/summaryService.ts
// Handles metrics and summary list (mockable via NEXT_PUBLIC_MOCK_API)
import { api } from "./api"
import { mockData } from "./mockData"
import { mockResponse } from "./mockUtils"

/**
 * Summary record returned by the backend.
 */
export interface Summary {
  id: string
  agent: string
  period: string
  summary: string
  sentimentScore: number
}

/**
 * Metrics for the dashboard overview.
 */
export interface Metrics {
  avgRating: number
  feedbackCount: number
  responseRate: number
  trend: { date: string; rating: number }[]
  latestFeedback: { id: string; agent: string; rating: number; comment: string; createdAt: string }[]
}

/**
 * Fetch overview metrics (cards + trend + latest feedback)
 */
export async function getMetrics(): Promise<Metrics> {
  if (process.env.NEXT_PUBLIC_MOCK_API === "true") {
    return mockResponse(mockData.metrics)
  }
  // Fetch dashboard metrics from the API
  const response = await api.get<Metrics>('/api/metrics')
  return response.data
}

/**
 * List AI-generated summaries for dashboard
 */
export async function listSummaries(): Promise<Summary[]> {
  if (process.env.NEXT_PUBLIC_MOCK_API === "true") {
    return mockResponse(mockData.summaries)
  }
  // Fetch list of stored summaries from the API
  const response = await api.get<Summary[]>('/api/summaries')
  return response.data
}