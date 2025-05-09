// --------------------------------------------------------
// frontend/components/ui/dashboard/agents-list.tsx
// --------------------------------------------------------
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type Agent = {
  id: string
  name: string
  avatar?: string
  avgRating: number
  responseCount: number
}

export function AgentsList({ agents }: { agents: Agent[] }) {
  // Determine star color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500 fill-green-500'
    if (rating >= 3.5) return 'text-yellow-500 fill-yellow-500'
    return 'text-orange-500 fill-orange-500'
  }

  // Determine badge variant based on response count
  const getResponseBadgeVariant = (count: number) => {
    if (count > 150) return 'default'
    if (count > 100) return 'secondary'
    return 'outline'
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id} className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer">
          <CardContent className="p-0">
            <div className="h-1 w-full bg-primary/80" />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 border shadow-sm">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{agent.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className={cn('h-4 w-4 mr-1', getRatingColor(agent.avgRating))} />
                    <span className="font-medium">{agent.avgRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm text-muted-foreground">Performance Score</div>
                <Badge variant={getResponseBadgeVariant(agent.responseCount)}>
                  {agent.responseCount} responses
                </Badge>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(agent.avgRating / 5) * 100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}