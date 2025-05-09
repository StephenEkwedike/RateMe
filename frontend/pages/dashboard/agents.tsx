"use client"
import { AgentsList } from "@/components/ui/dashboard/agents-list"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PlusCircle, RefreshCcw } from "lucide-react"
import { useAgents } from "@/hooks/useAgents"

export default function AgentsPage() {
  const { agents, loading, error, refetch } = useAgents()

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agents</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={loading}
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Agent</span>
          </Button>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-destructive">Error loading agents: {error.message}</p>
      )}

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      ) : (
        <AgentsList agents={agents} />
      )}
    </div>
  )
}
