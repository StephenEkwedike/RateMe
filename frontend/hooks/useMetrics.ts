// hooks/useMetrics.ts
// Hook to fetch dashboard overview metrics
import { useApi } from "./useApi"
import { getMetrics, Metrics } from "@/services/summaryService"

/**
 * Returns dashboard metrics: avg rating, feedback count, response rate, trend data, latest feedback
 */
export function useMetrics(autoLoad = true) {
  const { data, loading, error, execute: refetch } = useApi<Metrics>(getMetrics, {
    autoLoad,
  })
  return {
    metrics: data,
    loading,
    error,
    refetch,
  }
}