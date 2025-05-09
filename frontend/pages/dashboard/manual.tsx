"use client"

import { useState } from "react"
import { ManualSendForm } from "@/components/ui/dashboard/manual-send-form"
import { SentHistory } from "@/components/ui/dashboard/sent-history"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { unparse } from "papaparse"

import { useSmsHistory, useSendInvite } from "@/hooks/useSms"
import { useAgents } from "@/hooks/useAgents"

export default function ManualSendPage() {
  /* ------------- data hooks ------------- */
  const { history, loading: historyLoading, error: historyError, refetch: refetchHistory } = useSmsHistory()

  const { sendInvite, loading: sendLoading, error: sendError } = useSendInvite()

  const { agents, loading: agentsLoading } = useAgents()

  /* ------------- local state ------------- */
  const [success, setSuccess] = useState<string | null>(null)

  /* ------------- handlers ------------- */
  async function handleSend(form: { agent: string; recipient: string; type: "SMS" | "Email" }) {
    setSuccess(null)

    try {
      const res = await sendInvite({
        agentId: form.agent,
        recipient: form.recipient,
        type: form.type,
      })

      if (res) {
        const successMessage = `Invitation sent to ${form.recipient}`
        setSuccess(successMessage)
        toast({
          title: "Success",
          description: successMessage,
          variant: "default",
        })
        refetchHistory()
      }
    } catch (error) {
      console.error("Error sending invitation:", error)
    }
  }

  /* ------------- export handler ------------- */
  function handleExport() {
    const dataToExport = history.map((item) => {
      const agentName = agents.find((a) => a.id === item.agentId)?.name || item.agentId
      return {
        "Agent ID": item.agentId,
        "Agent Name": agentName,
        Recipient: item.recipient,
        "Request Type": item.type,
        "Sent At": item.sentAt,
        Status: item.status,
      }
    })
    const csv = unparse(dataToExport)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invites-history-${new Date().toISOString()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /* ------------- render ------------- */
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manual Send</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchHistory()}
            disabled={historyLoading}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${historyLoading ? "animate-spin" : ""}`} />
            Refresh History
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={!history || history.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {sendError && (
        <Alert className="mb-6 bg-red-50 border-red-200" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{sendError.message}</AlertDescription>
        </Alert>
      )}

      {historyError && (
        <Alert className="mb-6" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{historyError.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1">
          <ManualSendForm
            onSend={handleSend}
            isLoading={sendLoading}
            agents={agents}
            agentsLoading={agentsLoading}
          />
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          {historyLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : history && history.length > 0 ? (
            <SentHistory history={history} />
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No invitation history found</p>
              <p className="text-sm text-muted-foreground mt-1">Send your first invitation using the form</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
