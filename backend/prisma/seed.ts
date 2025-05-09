// =====================================================================
// FILE: backend/prisma/seed.ts
// PURPOSE: Seed the database with initial Agent, Summary, and Feedback data
// =====================================================================
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('🌱  Seeding database...');

  // ─────────────────────────── AGENTS ───────────────────────────
  const agentResult = await db.agent.createMany({
    data: [
      { id: 'a-1', name: 'John Smith', avatar: null, avgRating: 4.8, responseCount: 156 },
      { id: 'a-2', name: 'Sarah Johnson', avatar: null, avgRating: 4.6, responseCount: 142 },
      { id: 'a-3', name: 'Michael Brown', avatar: null, avgRating: 4.2, responseCount: 98 }
    ],
    skipDuplicates: true,
  });

  // ───────────────────────── SUMMARIES ─────────────────────────
  await db.summary.createMany({
    data: [
      {
        id: 's-1',
        agentId: 'a-1',
        period: 'Last 30 days',
        summary:
          'John has consistently received high ratings. Customers praise his patience and technical knowledge.',
        sentimentScore: 0.85,
      },
      {
        id: 's-2',
        agentId: 'a-2',
        period: 'Last 30 days',
        summary:
          'Sarah maintains a strong rating of 4.6. Customers appreciate her clear explanations.',
        sentimentScore: 0.78,
      },
      {
        id: 's-3',
        agentId: 'a-3',
        period: 'Last 30 days',
        summary:
          'Michael’s average rating is 4.2. Positive comments highlight his problem-solving abilities.',
        sentimentScore: 0.65,
      }
    ],
    skipDuplicates: true,
  });

  // ────────────────────────── FEEDBACK ─────────────────────────
  await db.feedback.createMany({
    data: [
      {
        id: 'f-1',
        agentId: 'a-1',
        rating: 5,
        comment: 'Very helpful and friendly',
        createdAt: new Date('2025-04-20T10:30:00Z'),
      },
      {
        id: 'f-2',
        agentId: 'a-2',
        rating: 4,
        comment: 'Good service but took a while',
        createdAt: new Date('2025-04-20T11:15:00Z'),
      },
      {
        id: 'f-3',
        agentId: 'a-3',
        rating: 3,
        comment: 'Average experience',
        createdAt: new Date('2025-04-20T12:00:00Z'),
      }
    ],
    skipDuplicates: true,
  });

  console.log(`🌱  Seed complete – inserted ${agentResult.count} agents (summaries & feedback added)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });