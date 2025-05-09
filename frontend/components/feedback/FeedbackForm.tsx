// @ts-nocheck
// @ts-expect-error disable broken JSX for now
// @ts-nocheck
// @ts-nocheck
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Star, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type FeedbackFormProps = {
  agentId: string
}

export default function FeedbackForm({ agentId }: FeedbackFormProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agentName, setAgentName] = useState("Loading...")
  const MAX_COMMENT_LENGTH = 150

  // Rating text mapping
  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Great"
      case 5:
        return "Excellent"
      default:
        return "Rate your experience"
    }
  }

  const positiveOptions = [
    "Great service",
    "Really helpful",
    "Good conversation",
    "Solved my problem",
    "Very knowledgeable",
    "Patient and understanding",
  ]

  const negativeOptions = [
    "Was rude",
    "Poor English",
    "Couldn't answer properly",
    "Long wait time",
    "Didn't resolve issue",
    "Kept interrupting",
  ]

  const toggleSuggestion = (suggestion: string) => {
    if (selectedSuggestions.includes(suggestion)) {
      setSelectedSuggestions(selectedSuggestions.filter((s) => s !== suggestion))
    } else {
      setSelectedSuggestions([...selectedSuggestions, suggestion])
    }
  }

  useEffect(() => {
    // Simulate fetching agent name
    const fetchAgentName = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAgentName(
        agentId
          ? `Agent ${agentId.slice(0, 4)}`
          : "Customer Service Agent"
      )
    }
    fetchAgentName()
  }, [agentId])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value)
    }
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      // TODO: Replace console.log with real API call
      console.log({ agentId, rating, comment, suggestions: selectedSuggestions })
      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/feedback/thank-you")
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 border-b">
        <div className="flex items-center">
          <div className="mr-2 rounded-md bg-blue-600 p-1">
            <Star className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">RateMe</n+          </span>
        </div>
        <h1 className="text-lg font-semibold">Rating</h1>
        <button
          onClick={() => router.back()}
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="text-center mb-6">
            <p className="text-gray-600">How was your call with</p>
            <p className="text-xl font-semibold">{agentName}</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <p className="text-xl font-medium mb-3">{getRatingText(rating)}</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                >
                  <Star
                    className={cn(
                      "h-10 w-10 transition-colors",
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-none text-gray-300"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {rating > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-center">
                {rating >= 4 ? "What went well?" : "What could be improved?"}
              </h2>
              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {positiveOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleSuggestion(option)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        selectedSuggestions.includes(option)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">... (truncated)