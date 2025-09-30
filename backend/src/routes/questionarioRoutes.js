import express from 'express';
import { PostQuestionario } from '../controllers/questionarioController.js';
import verifyToken from '../middlewares/verifyToken.js'; 

const router = express.Router();

router.post('/', verifyToken, PostQuestionario);

export default router;