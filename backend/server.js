import express from 'express';

const app = express();
const port = process.env.PORT || 5000; 

import adminRoutes from './src/routes/adminRoutes.js'
import adocaoRoutes from './src/routes/adocaoRoutes.js';
import animalRoutes from './src/routes/animalRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import doacaoRoutes from './src/routes/doacaoRoutes.js';
import questionarioRoutes from './src/routes/questionarioRoutes.js';
import tutorRoutes from './src/routes/tutorRoutes.js';

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Integração das rotas com seus respectivos caminhos
app.use('/admin', adminRoutes);
app.use('/adocao', adocaoRoutes);
app.use('/animais', animalRoutes);
app.use('/autenticacao', authRoutes);
app.use('/doacao', doacaoRoutes);
app.use('/questionario', questionarioRoutes);
app.use('/tutor', tutorRoutes);

// Middleware para capturar rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ erro: "Rota não encontrada." });
});

// Middleware de tratamento de erro geral (Captura erros 500)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro para depuração
    res.status(500).json({ erro: "Erro interno do servidor." });
});


app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`);   
});