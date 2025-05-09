// =============================================
// FILE: components/ui/dashboard/sent-history.tsx
// =============================================
"use client"
import { formatDate } from "@/lib/date"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type HistoryEntry = {
  id: string
  agent: string
  recipient: string
  type: string
  sentAt: string
  status: string
}

export function SentHistory({ history }: { history: HistoryEntry[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{entry.agent}</TableCell>
              <TableCell>{entry.recipient}</TableCell>
              <TableCell>{entry.type}</TableCell>
              <TableCell>{formatDate(entry.sentAt)}</TableCell>
              <TableCell>
                <Badge variant={entry.status === "Delivered" ? "default" : "destructive"}>
                  {entry.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}