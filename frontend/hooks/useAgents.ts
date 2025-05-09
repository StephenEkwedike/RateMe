// hooks/useAgents.ts
// Domain-specific hook for loading agent list
import { agentService, Agent } from "@/services/agentService"
import { useApi } from "./useApi"

/**
 * Hook to fetch all agents
 * @param autoLoad whether to fetch immediately
 */
export function useAgents(autoLoad = true) {
  const { data, loading, error, execute, refetch } = useApi<Agent[]>(
    agentService.list,
    { autoLoad }
  )
  return { agents: data || [], loading, error, fetchAgents: execute, refetch }
}

/**
 * Hook to fetch a single agent by ID
 */
export function useAgent(id: string, autoLoad = true) {
  const { data, loading, error, execute, refetch } = useApi<Agent, [string]>(
    agentService.get,
    { autoLoad, defaultArgs: [id] }
  )
  return { agent: data || null, loading, error, fetchAgent: execute, refetch }
}