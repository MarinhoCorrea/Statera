import express from 'express';
import { CreateAdocaoService,  } from '../services/adocaoService';

const router = express.Router();

router.get('/PedidoAdocao', CreateAdocao)