import express from 'express';
import { PostAdocao } from '../controllers/adocaoController.js';

const router = express.Router();

router.post('/', PostAdocao);

export default router;