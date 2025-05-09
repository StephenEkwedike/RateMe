// services/smsService.ts
import { api } from "./api"

/**
 * Payload for manual send invites.
 */
/**
 * Payload for manual send invites.
 */
export interface ManualSendDTO {
  agentId: string
  recipient: string // phone number or email
  type: 'SMS' | 'Email'
}
/** Named exports for hook usage */

/**
 * Sent invitation record.
 */
/**
 * Sent invitation record.
 */
export interface SentInvite extends ManualSendDTO {
  id: string
  sentAt: string
  status: 'Delivered' | 'Failed' | 'Queued'
}

// Toggle mock data via env flag
const useMock = process.env.NEXT_PUBLIC_MOCK_API === 'true'
// In-file mock invite history
let mockInvites: SentInvite[] = [
  { id: '1', agentId: '1', recipient: '+1234567890', type: 'SMS', sentAt: new Date().toISOString(), status: 'Delivered' },
  { id: '2', agentId: '2', recipient: '+1987654321', type: 'SMS', sentAt: new Date().toISOString(), status: 'Failed' },
]

export const smsService = {
  /** Send a manual invitation invite */
  sendInvite: async (data: ManualSendDTO) => {
    if (useMock) {
      const newInvite: SentInvite = {
        id: Date.now().toString(),
        ...data,
        sentAt: new Date().toISOString(),
        status: 'Delivered',
      }
      mockInvites = [newInvite, ...mockInvites]
      return Promise.resolve(newInvite)
    }
    // Send manual invite to backend
    return api.post<SentInvite>('/api/invites', data).then(res => res.data)
  },

  /** Get historical invites */
  history: () =>
    useMock
      ? Promise.resolve(mockInvites)
  : api.get<SentInvite[]>('/api/invites').then(res => res.data),
}
// Named exports for hook usage
export type SendInviteParams = ManualSendDTO;
export const sendInvite = smsService.sendInvite;
export const listHistory = smsService.history;