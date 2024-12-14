import { Router } from 'express';
import { 
  uploadResume, 
  generateResume, 
  getTemplates,
  compilePdf
} from '../controllers/resume.controller';

const router = Router();

// Resume template routes
router.get('/templates', getTemplates);

// Resume upload route
router.post('/upload', uploadResume);

// Resume generation route
router.post('/generate', generateResume);

// PDF compilation route
router.post('/compile', compilePdf);

export default router;
