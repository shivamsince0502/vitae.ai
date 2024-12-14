import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import path from 'path';
import resumeRoutes from './routes/resume.routes';
// import userRoutes from './routes/user.routes';
// import { connectToDatabase } from './config/mongodb';

dotenv.config();

process.env.PATH = '/Library/TeX/texbin:' + process.env.PATH;

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: false,
  createParentPath: true,
  limits: { 
    fileSize: 50 * 1024 * 1024, // 50MB max file size
    files: 1  // Limit to 1 file per request
  },
  abortOnLimit: true,
  responseOnLimit: 'File size limit exceeded',
  debug: true  // Add debug logging
}));

// Serve static files
app.use('/temp', express.static(path.join(__dirname, 'temp')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));

// Connect to MongoDB
// connectToDatabase().catch(error => {
//   console.error('Failed to connect to MongoDB:', error);
//   process.exit(1);
// });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Resume routes
app.use('/api/resume', resumeRoutes);

// User routes
// app.use('/api/user', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
