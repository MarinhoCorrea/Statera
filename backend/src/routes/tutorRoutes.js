import express from 'express';
import { PostTutor } from '../controllers/tutorController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();


router.post('/',PostTutor);
router.get('/:id', verifyToken, GetTutorById); 
router.patch('/:id', verifyToken, PatchTutor); 

export default router;