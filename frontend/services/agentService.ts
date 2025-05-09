// services/agentService.ts
import { api } from "./api"

/**
 * Agent represents a support agent record.
 */
export interface Agent {
  id: string
  name: string
  avatar?: string
  avgRating: number
  responseCount: number
}

// Toggle mock data via env flag:
const useMock = process.env.NEXT_PUBLIC_MOCK_API === 'true'
// In-file mock data for agents
const mockAgents: Agent[] = [
  { id: '1', name: 'Alice Doe', avatar: '', avgRating: 4.8, responseCount: 120 },
  { id: '2', name: 'Bob Roe',   avatar: '', avgRating: 4.3, responseCount: 88  },
]

export const agentService = {
  list: () =>
    useMock
      ? Promise.resolve(mockAgents)
      : api.get<Agent[]>('/api/agents').then(res => res.data),
  get: (id: string) =>
    useMock
      ? Promise.resolve(mockAgents.find((a) => a.id === id) as Agent)
      : api.get<Agent>(`/api/agents/${id}`).then(res => res.data),
  create: (payload: Partial<Agent>) =>
    api.post<Agent>('/api/agents', payload).then(res => res.data),
  update: (id: string, payload: Partial<Agent>) =>
    api.patch<Agent>(`/api/agents/${id}`, payload).then(res => res.data),
  remove: (id: string) => api.delete<void>(`/api/agents/${id}`),
}