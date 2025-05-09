"use client"

import { useSummaries } from "@/hooks/useSummaries"
import { SummaryList } from "@/components/ui/dashboard/summary-list"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Download } from "lucide-react"
// import Alert components removed; using simple div for errors
import { toCSV } from "@/utils/csv"

export default function SummariesPage() {
  const { summaries, loading, error, refetch } = useSummaries()

  const handleExport = () => {
    // Prepare CSV with friendly headers
    const formatted = summaries.map(s => ({
      Agent: s.agent,
      Period: s.period,
      Summary: s.summary,
      'Sentiment Score': s.sentimentScore,
    }))
    const csv = toCSV(formatted)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "summaries.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI-Generated Summaries</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={loading}
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh summaries</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={!summaries.length}
          >
            <Download className="mr-1 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded">
          <p className="font-semibold">Error loading summaries</p>
          <p>{error.message}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            Retry
          </Button>
        </div>
      )}

      {loading ? (
        <Skeleton className="h-64 w-full rounded-lg" />
      ) : (
        <SummaryList summaries={summaries} />
      )}
    </div>
  )
}
