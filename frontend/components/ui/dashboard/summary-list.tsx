// --------------------------------------------------------
// frontend/components/ui/dashboard/summary-list.tsx
// --------------------------------------------------------
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, TrendingUp, TrendingDown, Minus, MessageSquare } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Summary = {
  id: string
  agent: string
  period: string
  summary: string
  sentimentScore: number
}

export function SummaryList({ summaries }: { summaries: Summary[] }) {
  // Helper function to get sentiment badge variant
  const getSentimentVariant = (score: number): "default" | "outline" | "secondary" | "destructive" => {
    if (score >= 0.8) return "default"
    if (score >= 0.6) return "secondary"
    if (score >= 0.4) return "outline"
    return "destructive"
  }

  // Helper function to get sentiment label
  const getSentimentLabel = (score: number): string => {
    if (score >= 0.8) return "Very Positive"
    if (score >= 0.6) return "Positive"
    if (score >= 0.4) return "Neutral"
    if (score >= 0.2) return "Negative"
    return "Very Negative"
  }

  // Helper function to get sentiment icon
  const getSentimentIcon = (score: number) => {
    if (score >= 0.6) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (score >= 0.4) return <Minus className="h-4 w-4 text-yellow-500" />
    return <TrendingDown className="h-4 w-4 text-red-500" />
  }

  // Helper function to extract initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  // Helper function to get avatar background color based on sentiment
  const getAvatarColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 text-green-800"
    if (score >= 0.6) return "bg-blue-100 text-blue-800"
    if (score >= 0.4) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  // Helper function to highlight key phrases in summary
  const highlightSummary = (text: string) => {
    const positivePattern = /(high ratings|praise|excellent|excels|consistently|appreciate)/gi
    const negativePattern = /(improve|could|areas for|suggest)/gi
    
    return text
      .replace(positivePattern, match => `<span class="text-green-600 font-medium">${match}</span>`)
      .replace(negativePattern, match => `<span class="text-amber-600 font-medium">${match}</span>`)
  }

  return (
    <TooltipProvider>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {summaries.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div className="flex items-center space-x-3">
                <Avatar className={`h-10 w-10 ${getAvatarColor(item.sentimentScore)}`}>
                  <AvatarFallback>{getInitials(item.agent)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{item.agent}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {item.period}
                  </div>
                </div>
              </div>
              <Badge variant={getSentimentVariant(item.sentimentScore)} className="ml-auto">
                {getSentimentLabel(item.sentimentScore)}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <div className="relative mt-2 mb-4">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                <div 
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightSummary(item.summary) }}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between pt-0 pb-4 px-6 border-t">
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="mr-1 h-4 w-4" />
                AI Summary
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    {getSentimentIcon(item.sentimentScore)}
                    <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          item.sentimentScore >= 0.8 ? "bg-green-500" : 
                          item.sentimentScore >= 0.6 ? "bg-blue-500" : 
                          item.sentimentScore >= 0.4 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${item.sentimentScore * 100}%` }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sentiment score: {(item.sentimentScore * 100).toFixed(0)}%</p>
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}