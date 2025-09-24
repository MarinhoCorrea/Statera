import express from 'express';

const app = express();
const port = process.env.PORT || 5000; 

import adocaoRoutes from './src/routes/adocaoRoutes.js';
import animalRoutes from './src/routes/animalRoutes.js';
import doacaoRoutes from './src/routes/doacaoRoutes.js';
import questionarioRoutes from './src/routes/adminRoutes.js';
import tutorRoutes from './src/routes/tutorRoutes.js';

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Integração das rotas com seus respectivos caminhos
app.use('/adocao', adocaoRoutes);
app.use('/animais', animalRoutes);
app.use('/doacao', doacaoRoutes);
app.use('/questionario', questionarioRoutes);
app.use('/tutor', tutorRoutes);


app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`);   
});