// Importa o modelo Tutor e a instância do Sequelize para manipulação do banco de dados
import { Tutor, sequelize } from '../../models/Modelos.js';
// Importa o bcrypt para criptografar a senha
import bcrypt from 'bcryptjs';
// Importa o dotenv para carregar variáveis de ambiente
import dotenv from 'dotenv';
// Importa o uuid para gerar um ID único
import { v4 as uuidv4 } from 'uuid';

// Carrega as variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: '../../.env' }); 

// Define o email padrão do administrador
const SEED_EMAIL = "admin@adocao.com"; 

// Define a senha do administrador, usando a variável de ambiente ou uma senha padrão
const SEED_SENHA = process.env.ADMIN_SENHA || "mudar_essa_senha_padrao_no_env";

// Função responsável por criar o administrador no banco de dados
const createAdminSeed = async () => {
    try {
        console.log("Iniciando processo de seeding para Administrador...");

        // Sincroniza os modelos com o banco de dados
        await sequelize.sync();
        console.log("Banco de dados sincronizado.");

        // Verifica se já existe um administrador com o email definido
        const adminExistente = await Tutor.findOne({ where: { email: SEED_EMAIL } });

        // Se já existir, interrompe o processo de seeding
        if (adminExistente) {
            console.log(`Administrador com email ${SEED_EMAIL} já existe. Ignorando seed.`);
            return;
        }

        // Define o número de rounds para o salt do bcrypt
        const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
        // Criptografa a senha do administrador
        const senhaCriptografada = await bcrypt.hash(SEED_SENHA, SALT_ROUNDS);

        // Gera um ID único para o administrador
        const SEED_ID = uuidv4();

        // Cria o registro do administrador no banco de dados
        await Tutor.create({
            id: SEED_ID,
            nome_completo: 'Administrador do Sistema',
            email: SEED_EMAIL,
            senha: senhaCriptografada,
            cidade: 'Sistema',
            estado: 'BR',
            idade: 99,
            telefone: '999999999',
            administrador: true
        });

        console.log(`Administrador ${SEED_EMAIL} criado com sucesso!`);

    } catch (error) {
        // Em caso de erro, exibe mensagem no console
        console.error("ERRO ao rodar o seed do administrador:", error);
    }
};

// Executa a função de seeding ao carregar o módulo
createAdminSeed();
