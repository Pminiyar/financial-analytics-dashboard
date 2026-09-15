import app from './app';
import { ENV } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { Transaction } from './models/Transaction';
import { seedDatabase } from './seed/seedData';

const startServer = async () => {
  try {
    console.log('[Server] Connecting to database...');
    await connectDatabase();

    // Auto-seed if database is brand new
    const transactionCount = await Transaction.countDocuments();
    if (transactionCount === 0) {
      console.log('[Server] No transactions found in database. Initializing demo seed data...');
      await seedDatabase();
    } else {
      console.log(`[Server] Database contains ${transactionCount} transactions ready for analysis.`);
    }

    const server = app.listen(ENV.PORT, () => {
      console.log('====================================================');
      console.log(`🚀 Financial Analytics API running on port ${ENV.PORT}`);
      console.log(`📡 URL: http://localhost:${ENV.PORT}`);
      console.log(`🏥 Health check: http://localhost:${ENV.PORT}/health`);
      console.log('====================================================');
    });

    const shutdown = async () => {
      console.log('\n[Server] Gracefully shutting down...');
      server.close(async () => {
        await disconnectDatabase();
        console.log('[Server] Closed all connections. Exiting.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('[Server Error] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
