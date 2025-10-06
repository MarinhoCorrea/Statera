// Importa e configura as variáveis de ambiente definidas no arquivo .env
import dotenv from 'dotenv';
dotenv.config(); // Pegar as variaveís do .env

// Importa a função para inicializar o banco de dados
import { initDatabase } from './src/database/init.js'; 
// Importa o Express para criar o servidor HTTP
import express from 'express';
// Importa o Swagger UI para exibir a documentação da API
import swaggerUi from 'swagger-ui-express';
// Importa o módulo de sistema de arquivos para ler o arquivo de documentação
import fs from 'fs'; 

// Cria a instância principal do aplicativo Express
const app = express();
// Define o caminho do arquivo de documentação Swagger
const swaggerFilePath = './swagger.json';
// Lê o conteúdo do arquivo Swagger
const swaggerContent = fs.readFileSync(swaggerFilePath, 'utf8');
// Converte o conteúdo lido para objeto JSON
const swaggerDocument = JSON.parse(swaggerContent); 

// Configura a rota para exibir a documentação da API via Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importação das rotas
import adminRoutes from './src/routes/adminRoutes.js'
import adocaoRoutes from './src/routes/adocaoRoutes.js';
import animalRoutes from './src/routes/animalRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import doacaoRoutes from './src/routes/doacaoRoutes.js';
import questionarioRoutes from './src/routes/questionarioRoutes.js';
import tutorRoutes from './src/routes/tutorRoutes.js';

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// Define os prefixos das rotas da aplicação
app.use('/admin', adminRoutes);
app.use('/adocoes', adocaoRoutes);
app.use('/animais', animalRoutes);
app.use('/autenticacao', authRoutes);
app.use('/doacoes', doacaoRoutes);
app.use('/questionario', questionarioRoutes);
app.use('/tutores', tutorRoutes);

// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ erro: "Rota não encontrada." });
});

// Middleware para lidar com erros internos do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: "Erro interno do servidor." });
});

// Função que inicia o servidor
const startServer = async () => {

    // Incializa o banco de dados
    await initDatabase();

    // Define a porta do servidor a partir do .env ou usa 5000 como padrão
    const PORT = process.env.PORT || 5000;

    // Inicia o servidor e exibe mensagem no console
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};

// Chama a função para iniciar o servidor
startServer();
