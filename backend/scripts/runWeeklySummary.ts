import { generateWeeklySummary } from '../services/summaryService';

(async () => {
  const summary = await generateWeeklySummary();      // org-wide
  console.log(summary);
})();