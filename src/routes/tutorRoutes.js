import express from 'express';
import { PostTutor, GetTutorById, PatchTutor } from '../controllers/tutorController.js';
import verifyToken from '../middlewares/verifytoken.js';

const router = express.Router();


router.post('/',PostTutor);
router.get('/:id', verifyToken, GetTutorById); 
router.patch('/:id', verifyToken, PatchTutor); 

export default router;