import dotenv from 'dotenv';
dotenv.config();

import { initDatabase } from './src/database/init.js';
import express from 'express';

const app = express();

import adminRoutes from './src/routes/adminRoutes.js'
import adocaoRoutes from './src/routes/adocaoRoutes.js';
import animalRoutes from './src/routes/animalRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import doacaoRoutes from './src/routes/doacaoRoutes.js';
import questionarioRoutes from './src/routes/questionarioRoutes.js';
import tutorRoutes from './src/routes/tutorRoutes.js';

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/adocao', adocaoRoutes);
app.use('/animais', animalRoutes);
app.use('/autenticacao', authRoutes);
app.use('/doacao', doacaoRoutes);
app.use('/questionario', questionarioRoutes);
app.use('/tutores', tutorRoutes);

app.use((req, res, next) => {
    res.status(404).json({ erro: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: "Erro interno do servidor." });
});

const startServer = async () => {

    // 🛑 AGUARDE A CONEXÃO E SINCRONIZAÇÃO
    await initDatabase();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
};

startServer();