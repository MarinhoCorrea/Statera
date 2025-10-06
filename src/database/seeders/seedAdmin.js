import { Tutor, sequelize } from '../../models/Modelos.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '../../.env' }); 


const SEED_EMAIL = "admin@adocao.com"; 

const SEED_SENHA = process.env.ADMIN_SENHA || "mudar_essa_senha_padrao_no_env";

const createAdminSeed = async () => {
    try {
        console.log("Iniciando processo de seeding para Administrador...");

        await sequelize.sync();
        console.log("Banco de dados sincronizado.");

        const adminExistente = await Tutor.findOne({ where: { email: SEED_EMAIL } });

        if (adminExistente) {
            console.log(`Administrador com email ${SEED_EMAIL} já existe. Ignorando seed.`);
            return;
        }

        const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
        const senhaCriptografada = await bcrypt.hash(SEED_SENHA, SALT_ROUNDS);


        const SEED_ID = uuidv4();


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
        console.error("ERRO ao rodar o seed do administrador:", error);
    }
};

createAdminSeed();