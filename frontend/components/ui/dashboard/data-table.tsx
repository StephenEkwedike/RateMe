// --------------------------------------------------------
// frontend/components/ui/dashboard/data-table.tsx
// --------------------------------------------------------
"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/date"

type Row = {
  id: string
  agent: string
  rating: number
  comment: string
  createdAt: string
}

type SortField = "agent" | "rating" | "createdAt"
type SortDirection = "asc" | "desc"

type DataTableProps = {
  data: Row[]
  isLoading?: boolean
}

export function DataTable({ data, isLoading = false }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [page, setPage] = useState(1)
  const rowsPerPage = 5
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }
  
  const sortedData = [...data].sort((a, b) => {
    if (sortField === "agent") {
      return sortDirection === "asc"
        ? a.agent.localeCompare(b.agent)
        : b.agent.localeCompare(a.agent)
    }
    if (sortField === "rating") {
      return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
    }
    return sortDirection === "asc"
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  
  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const totalPages = Math.ceil(data.length / rowsPerPage)
  
  const renderRatingStars = (rating: number) => (
    <div className="flex items-center justify-center">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          )}
        />
      ))}
    </div>
  )
  
  
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  
  const getSentimentBadge = (rating: number) => {
    if (rating >= 4) return <Badge className="bg-green-500">Positive</Badge>
    if (rating >= 3) return <Badge className="bg-yellow-500">Neutral</Badge>
    return <Badge variant="destructive">Negative</Badge>
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="hidden md:table-cell">Comment</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("agent")}
            >
              <div className="flex items-center">
                Agent
                {sortField === "agent" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead
              className="text-center cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center justify-center">
                Rating
                {sortField === "rating" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Comment</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort("createdAt")}
            >
              <div className="flex items-center">
                Date
                {sortField === "createdAt" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No feedback data found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map(row => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(row.agent)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{row.agent}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    {renderRatingStars(row.rating)}
                    <span className="text-xs text-muted-foreground mt-1">
                      {row.rating}/5
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">{row.comment}</span>
                    {getSentimentBadge(row.rating)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(row.createdAt)}</div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {data.length > rowsPerPage && (
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, data.length)} of {data.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}