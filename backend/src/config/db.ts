import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB(uri: string = env.mongoUri): Promise<void> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

export async function disconnectDB(): Promise<void> {
  await mongoose.connection.close();
}