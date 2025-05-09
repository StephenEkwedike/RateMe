// --------------------------------------------------------
// frontend/components/ui/dashboard/chart-area-interactive.tsx
// --------------------------------------------------------
"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type ChartProps = {
  data: any[]
  dataKey?: string
  yAxisDomain?: [number, number]
  isLoading?: boolean
  color?: string
  unit?: string
}

export function ChartAreaInteractive({
  data,
  dataKey = "rating",
  yAxisDomain,
  isLoading = false,
  color = "#3b82f6",
  unit = "",
}: ChartProps) {
  if (isLoading) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center">
        <div className="space-y-2 w-full">
          <Skeleton className="h-[240px] w-full" />
        </div>
      </div>
    )
  }
  
  if (!data?.length) {
    return (
      <Card className="w-full h-[240px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    )
  }
  
  const average = data.reduce((acc, item) => acc + item[dataKey], 0) / data.length
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            {payload[0].name}: {payload[0].value}{unit}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          domain={yAxisDomain}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `${value}${unit}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={average}
          stroke="#9ca3af"
          strokeDasharray="3 3"
          label={{
            value: `Avg: ${average.toFixed(1)}${unit}`,
            position: 'insideBottomRight',
            fill: '#6b7280',
            fontSize: 12
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fillOpacity={0.2}
          fill={`url(#color-${dataKey})`}
          activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}