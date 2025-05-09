// services/feedbackService.ts
import { api } from "./api"

/**
 * Feedback record for an agent.
 */
export interface Feedback {
  id: string
  agentId: string
  rating: number
  comment?: string
  suggestions: string[]
  createdAt: string
}

// Toggle mock data via env flag
const useMock = process.env.NEXT_PUBLIC_MOCK_API === 'true'
// In-file mock feedback entries
const mockFeedback: Feedback[] = [
  { id: '1', agentId: '1', rating: 5, comment: 'Great support!', suggestions: [], createdAt: new Date().toISOString() },
  { id: '2', agentId: '2', rating: 4, comment: 'Good service', suggestions: ['Improve response time'], createdAt: new Date().toISOString() },
]

export const feedbackService = {
  /** Submit new feedback for an agent */
  submit: (agentId: string, payload: Omit<Feedback, 'id' | 'createdAt'>) =>
    api.post<Feedback>(`/api/feedback/${agentId}`, payload).then(res => res.data),

  /** List feedback entries for a given agent */
  listByAgent: (agentId: string) =>
    useMock
      ? Promise.resolve(mockFeedback.filter(f => f.agentId === agentId))
      : api.get<Feedback[]>(`/api/feedback/agent/${agentId}`).then(res => res.data),

  /** Get the latest feedback across all agents */
  latest: (limit = 20) =>
    useMock
      ? Promise.resolve(mockFeedback.slice(0, limit))
      : api.get<Feedback[]>(`/api/feedback?limit=${limit}`).then(res => res.data),
}