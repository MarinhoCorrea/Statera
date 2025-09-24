import express from 'express';
import { CriarAdocaoController } from '../controllers/adocaoController.js';

const router = express.Router();

router.get('/', CriarAdocaoController);


export default router;