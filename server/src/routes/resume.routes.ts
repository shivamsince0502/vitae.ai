import { Router } from 'express';
import { generateResume, enhanceContent, analyzeResume } from '../controllers/resume.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Resume generation endpoints
router.post('/generate', authMiddleware, generateResume);
router.post('/enhance', authMiddleware, enhanceContent);
router.post('/analyze', authMiddleware, analyzeResume);

export default router;
