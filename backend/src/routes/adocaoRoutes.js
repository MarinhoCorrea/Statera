import express from 'express';
import { CreateAdocaoController, DeleteAdocaoController } from '../controllers/adocaoController';

const express = require('express');
const db = require('../../stateraDB');

const router = express.Router();

router.post('/PedidoAdocao', (req, res) => {
    db.all
})

export default router;