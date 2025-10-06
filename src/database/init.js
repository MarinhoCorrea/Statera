// Importa os modelos definidos para interação com o banco de dados
import models from '../models/Modelos.js';

// Função responsável por inicializar a conexão com o banco de dados
export const initDatabase = async () => {
    try {
        // Tenta autenticar a conexão com o banco de dados
        await models.sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
        // Sincroniza os modelos com as tabelas do banco de dados
        await models.sequelize.sync(); 
        console.log('Banco de dados sincronizado.');

    } catch (error) {
        // Em caso de erro na conexão ou sincronização, exibe mensagem e encerra o processo
        console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
        process.exit(1); 
    }
};

// Exporta os modelos para uso em outras partes da aplicação
export default models;