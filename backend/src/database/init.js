import models from '../models/Modelos.js';

export const initDatabase = async () => {
    try {
        await models.sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
        // 🛑 A Sincronização é executada APENAS aqui.
        await models.sequelize.sync(); 
        console.log('Banco de dados sincronizado.');

    } catch (error) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
        // Pode ser útil encerrar a aplicação se o banco falhar
        process.exit(1); 
    }
};

export default models; 