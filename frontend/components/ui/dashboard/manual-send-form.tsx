// =============================================
// FILE: components/ui/dashboard/manual-send-form.tsx
// =============================================
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send as SendIcon } from "lucide-react"

// Mock agents for the dropdown
const mockAgents = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "David Wilson" },
]

type ManualSendFormProps = {
  onSend: (formData: { agent: string; recipient: string }) => void
}

export function ManualSendForm({ onSend }: ManualSendFormProps) {
  const [agent, setAgent] = useState("")
  const [recipient, setRecipient] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agent || !recipient) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      onSend({ agent, recipient })
      setIsLoading(false)
      setRecipient("")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="agent">Select Agent</Label>
        <Select value={agent} onValueChange={setAgent} required>
          <SelectTrigger id="agent">
            <SelectValue placeholder="Select an agent" />
          </SelectTrigger>
          <SelectContent>
            {mockAgents.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient">Phone Number</Label>
        <Input
          id="recipient"
          type="tel"
          placeholder="+1234567890"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !agent || !recipient}>
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center">
            Send Request
            <SendIcon className="ml-2 h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  )
}