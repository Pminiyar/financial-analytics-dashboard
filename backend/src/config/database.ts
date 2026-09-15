import mongoose from 'mongoose';
import { ENV } from './env';

let mongodInstance: any = null;

export const connectDatabase = async (): Promise<string> => {
  try {
    // First try connecting to configured URI (local mongod or Atlas)
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return ENV.MONGODB_URI;
  } catch (error: any) {
    console.warn(`[Database] Could not connect to primary MONGODB_URI (${ENV.MONGODB_URI}). Message: ${error.message}`);
    
    // In development or if mongod is not running, fallback seamlessly to MongoMemoryServer
    try {
      console.log('[Database] Initializing in-memory MongoDB instance for local execution...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB: ${memoryUri}`);
      return memoryUri;
    } catch (memError: any) {
      console.error('[Database] Failed to initialize in-memory MongoDB fallback:', memError.message);
      throw error;
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};
