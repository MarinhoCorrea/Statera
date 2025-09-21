import express from 'express';
import { CreateAdocaoController, DeleteAdocaoController } from '../controllers/adocaoController';

const express = require('express');

const router = express.Router();

router.post('/PedidoAdocao', CreateAdocaoController);
router.delete('/PedidoAdocao', DeleteAdocaoController);