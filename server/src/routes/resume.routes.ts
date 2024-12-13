import { Router } from 'express';
import { 
  uploadResume, 
  generateResume, 
  getTemplates 
} from '../controllers/resume.controller';

const router = Router();

// Resume template routes
router.get('/templates', getTemplates);

// Resume upload route
router.post('/upload', uploadResume);

// Resume generation route
router.post('/generate', generateResume);

export default router;
