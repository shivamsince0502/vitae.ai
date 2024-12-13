import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'your-default-mongodb-uri';
const client = new MongoClient(uri);
let db: Db;

export async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('resumeDB');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

export async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB Disconnection Error:', error);
  }
}
