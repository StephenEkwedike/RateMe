import { app } from './app';
import { db } from './database';

// Use port from env or default to 5002 to avoid conflicts
const PORT = process.env.PORT || 5002;
console.log(`🚧  Starting RateMe API (pid=${process.pid}) on port ${PORT}...`);

(async () => {
  await db.sequelize.sync();
  app.listen(PORT, () => console.log(`RateMe API running on ${PORT}`));
})();
