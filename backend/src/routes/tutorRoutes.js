import express from 'express';
import { PostTutor } from '../controllers/tutorController.js';

const router = express.Router();

// POST /tutores
router.post('/',PostTutor);

export default router;