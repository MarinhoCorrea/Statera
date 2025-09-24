import express from 'express';
import { CreateTutorController } from '../controllers/tutorController.js';

const router = express.Router();

// POST /tutores
router.post('/', CreateTutorController);

export default router;