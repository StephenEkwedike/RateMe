// --------------------------------------------------------
// frontend/components/ui/dashboard/section-cards.tsx
// --------------------------------------------------------
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare, BarChart, TrendingUp, TrendingDown } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import CountUp from "react-countup"

type Props = {
  metrics: {
    avgRating?: number
    feedbackCount?: number
    responseRate?: number
  }
  isLoading?: boolean
}

export function SectionCards({ metrics, isLoading = false }: Props) {
  const { avgRating = 0, feedbackCount = 0, responseRate = 0 } = metrics
  const [showAnimation, setShowAnimation] = useState(false)
  
  useEffect(() => {
    setShowAnimation(true)
    const timer = setTimeout(() => setShowAnimation(false), 1000)
    return () => clearTimeout(timer)
  }, [metrics])
  
  const ratingTrend = 0.2
  const feedbackTrend = 12.5
  const responseTrend = 2.3
  
  const renderTrend = (value: number) => {
    const Icon = value >= 0 ? TrendingUp : TrendingDown
    const color = value >= 0 ? "text-green-500" : "text-red-500"
    
    return (
      <div className={cn("flex items-center", color)}>
        <Icon className="h-3 w-3 mr-1" />
        <span className="text-xs font-medium">{Math.abs(value).toFixed(1)}%</span>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Average Rating Card */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <div className="rounded-full bg-yellow-100 p-1">
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mb-1" />
          ) : (
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">
                <CountUp
                  end={avgRating}
                  decimals={1}
                  duration={1}
                  preserveValue
                  start={showAnimation ? avgRating - 0.1 : avgRating}
                />
              </div>
              <div className="text-xs text-muted-foreground">/ 5.0</div>
              {renderTrend(ratingTrend)}
            </div>
          )}
          
          {isLoading ? (
            <Skeleton className="h-4 w-28 mt-1" />
          ) : (
            <div className="mt-1">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full" 
                  style={{ width: `${(avgRating / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                vs. 4.0 last period
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Total Feedback Card */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <div className="rounded-full bg-blue-100 p-1">
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-20 mb-1" />
          ) : (
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">
                <CountUp
                  end={feedbackCount}
                  duration={1}
                  preserveValue
                  start={showAnimation ? feedbackCount - 50 : feedbackCount}
                />
              </div>
              {renderTrend(feedbackTrend)}
            </div>
          )}
          
          {isLoading ? (
            <Skeleton className="h-4 w-28 mt-1" />
          ) : (
            <div className="mt-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>This period</span>
                <span>Previous</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <div className="h-1.5 flex-1 bg-blue-500 rounded-full" />
                <div className="h-1.5 flex-1 bg-gray-200 rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                +{Math.floor(feedbackCount * 0.12)} from last month
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Response Rate Card */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <div className="rounded-full bg-green-100 p-1">
            <BarChart className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mb-1" />
          ) : (
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">
                <CountUp
                  end={responseRate}
                  duration={1}
                  preserveValue
                  start={showAnimation ? responseRate - 2 : responseRate}
                  suffix="%"
                />
              </div>
              {renderTrend(responseTrend)}
            </div>
          )}
          
          {isLoading ? (
            <Skeleton className="h-4 w-28 mt-1" />
          ) : (
            <div className="mt-1">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${responseRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Target: 75%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}