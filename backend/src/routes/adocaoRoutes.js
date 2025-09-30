import express from 'express';
import { PostAdocao } from '../controllers/adocaoController.js';
import verifyToken from '../middlewares/verifyToken.js';    

const router = express.Router();

router.post('/', verifyToken, PostAdocao);

export default router;