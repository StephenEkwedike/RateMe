// services/mockData.ts
// Centralized mock data for quick in-file mocking

export const mockData = {
  metrics: {
    avgRating: 4.2,
    feedbackCount: 1248,
    responseRate: 68,
    trend: [
      { date: "Jan 1", rating: 4.1 },
      { date: "Jan 2", rating: 4.0 },
      { date: "Jan 3", rating: 4.2 },
      { date: "Jan 4", rating: 4.3 },
      { date: "Jan 5", rating: 4.1 },
    ],
    latestFeedback: [
      { id: "1", agent: "John Smith", rating: 5, comment: "Very helpful", createdAt: "2023-04-20T10:30:00Z" },
      { id: "2", agent: "Sarah Johnson", rating: 4, comment: "Good service", createdAt: "2023-04-20T11:15:00Z" },
      { id: "3", agent: "Michael Brown", rating: 3, comment: "Average experience", createdAt: "2023-04-20T12:00:00Z" },
      { id: "4", agent: "Emily Davis", rating: 5, comment: "Excellent support!", createdAt: "2023-04-20T13:45:00Z" },
      { id: "5", agent: "David Wilson", rating: 4, comment: "Knowledgeable and patient", createdAt: "2023-04-19T16:20:00Z" },
    ],
  },
  summaries: [
    {
      id: "1",
      agent: "John Smith",
      period: "Last 30 days",
      summary: "John has consistently received high ratings and excelled in customer satisfaction.",
      sentimentScore: 0.85,
    },
    {
      id: "2",
      agent: "Sarah Johnson",
      period: "Last 30 days",
      summary: "Sarah maintains strong performance with clear communication.",
      sentimentScore: 0.78,
    },
  ],
  sentHistory: [
    {
      id: "1",
      agent: "John Smith",
      recipient: "+1234567890",
      type: "SMS",
      sentAt: "2023-04-20T14:30:00Z",
      status: "Delivered",
    },
  ],
  agents: [
    { id: "1", name: "John Smith", avatar: "?height=40&width=40", avgRating: 4.8, responseCount: 156 },
    { id: "2", name: "Sarah Johnson", avatar: "?height=40&width=40", avgRating: 4.6, responseCount: 142 },
  ],
}