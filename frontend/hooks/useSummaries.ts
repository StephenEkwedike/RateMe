// hooks/useSummaries.ts
// Hook to fetch AI-generated summaries for the dashboard
import { useApi } from "./useApi"
import { listSummaries, Summary } from "@/services/summaryService"

/**
 * Fetches the list of AI-generated summaries. 
 * @param auto whether to fetch immediately
 */
export function useSummaries(auto = true) {
  const { data, loading, error, execute, refetch } = useApi<Summary[]>(
    listSummaries,
    { autoLoad: auto }
  )
  return {
    summaries: data || [],
    loading,
    error,
    refetch,
  }
}