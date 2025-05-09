// deterministic date formatting for both SSR and client
import { format } from "date-fns"

/**
 * Format an ISO date string to "MMM d, h:mm a" (e.g., "Apr 20, 1:15 PM").
 */
export function formatDate(isoString: string): string {
  return format(new Date(isoString), "MMM d, h:mm a")
}