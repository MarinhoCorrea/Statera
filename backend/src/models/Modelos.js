import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const projectRoot = path.resolve(__dirname, '..', '..');

const dbPath = path.resolve(projectRoot, process.env.DB_STORAGE || './database.sqlite');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath, 
});

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