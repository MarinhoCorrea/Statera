// Importa o Sequelize, ORM utilizado para manipulação do banco de dados
import { Sequelize } from 'sequelize';
// Importa os modelos das tabelas do sistema
import AnimalModel from './Animal.js';
import TutorModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';
// Importa utilitários para manipulação de caminhos de arquivos
import path from 'path';
import { fileURLToPath } from 'url'

// Obtém o caminho absoluto do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Obtém o diretório onde o arquivo atual está localizado
const __dirname = path.dirname(__filename); 

// Define o caminho raiz do projeto (dois níveis acima do diretório atual)
const projectRoot = path.resolve(__dirname, '..', '..');

// Define o caminho do arquivo do banco de dados SQLite, usando variável de ambiente ou padrão
const dbPath = path.resolve(projectRoot, process.env.DB_STORAGE || './database.sqlite');

// Instancia o Sequelize configurando o uso do banco SQLite
export const sequelize = new Sequelize({
    username: 'postgres',
    password: 'BVRlXXB4E7LE[@4',
    database: 'postgres',
    host: 'db.thmirefcaiqioxbvayic.supabase.co',
    port: 5432,
    dialect: 'postgres',
    logging: false
})

// Inicializa os modelos, associando cada um à instância do Sequelize
export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
// Explicação das associações:
// - Um Tutor tem um Questionario.

// Necessário confirmar se será permitido modificar esse arquivo para continuar.
// Caso possa, modificar certas coisas nos outros modelos, como validações básicas de 'isEmail' etc, e modificar neste:


Tutor.hasOne(Questionario, { foreignKey: 'tutorId' });
Questionario.belongsTo(Tutor, { foreignKey: 'tutorId' });

// - Um Tutor pode ter vários Pedidos de Adoção.

Tutor.hasMany(PedidoAdocao, { foreignKey: 'tutorId' });
PedidoAdocao.belongsTo(Tutor, { foreignKey: 'tutorId' });

// - Um Animal pode ter vários Pedidos de Adoção.

Animal.hasMany(PedidoAdocao, { foreignKey: 'animalId' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId' });

// A tabela PedidosAdocao serve como uma tabela de junção entre Tutores e Animais.

// O modelo Doacao pode estar relacionado a um Tutor, se for o caso:
Tutor.hasMany(Doacao, { foreignKey: 'tutorId' });
Doacao.belongsTo(Tutor, { foreignKey: 'tutorId' });


export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };