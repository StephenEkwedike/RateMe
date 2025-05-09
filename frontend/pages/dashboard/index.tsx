// =============================================
// FILE: frontend/pages/dashboard/index.tsx
// Dashboard Overview page wired to real (or mock) metrics
// =============================================
"use client"

import { useState } from "react"
import { useMetrics } from "@/hooks/useMetrics"
import { SectionCards } from "@/components/ui/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/ui/dashboard/chart-area-interactive"
import { DataTable } from "@/components/ui/dashboard/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCcw, Download } from "lucide-react"
import { toCSV } from "@/utils/csv"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default function DashboardOverview() {
  const { metrics, loading, error, refetch } = useMetrics()
  const [exportLoading, setExportLoading] = useState(false)

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4 p-4 border border-red-200 bg-red-50 text-red-700 rounded">
          <p className="font-semibold">Error loading metrics</p>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  const handleExport = async () => {
    setExportLoading(true)
    try {
      // Simulate CSV export delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Prepare CSV with friendly headers
      const formatted = (metrics?.trend || []).map(pt => ({
        Date: pt.date,
        'Average Rating': pt.rating,
      }))
      const csvContent = toCSV(formatted)
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute(
        "download",
        `metrics-${format(new Date(), "yyyy-MM-dd")}.csv`
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setExportLoading(false)
    }
  }
  const isEmpty = loading || !metrics
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={loading}
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh data</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={loading || exportLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            {exportLoading ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <>
          <Skeleton className="h-24 w-full mb-6" />
          <Skeleton className="h-80 w-full mb-6" />
          <Skeleton className="h-96 w-full" />
        </>
      ) : (
        <>
          <SectionCards metrics={metrics!} />

          {metrics ? (
            <div className="my-6">
              <ChartAreaInteractive data={metrics.trend} />
            </div>
          ) : (
            <Skeleton className="h-64 w-full mb-6" />
          )}

          <h2 className="mb-2 text-xl font-semibold">Latest Feedback</h2>
          {metrics ? (
            <DataTable data={metrics.latestFeedback} />
          ) : (
            <Skeleton className="h-40 w-full" />
          )}
        </>
      )}
    </div>
  )
}