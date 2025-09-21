import express from 'express';
import { sequelize } from './src/models/Modelos.js';

import adocaoRoutes from './src/routes/adocaoRoutes.js';
import tutorRoutes from './src/routes/tutorRoutes.js';
import doacaoRoutes from './src/routes/doacaoRoutes.js';
import animalRoutes from './src/routes/animalRoutes.js';


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(adocaoRoutes);
app.use(tutorRoutes);
app.use(doacaoRoutes);
app.use(animalRoutes);
await sequelize.sync();

const iniciarServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('A conexão com o banco de dados foi um sucesso.');
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } 
    catch {
        console.error('A conexão com o banco de dados falhou', error);
    }
};

iniciarServer();