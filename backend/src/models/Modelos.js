import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Tutor.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './statera.db',
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
// - Um Tutor tem um Questionario.
Tutor.hasOne(Questionario, {
    foreignKey: 'tutorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Questionario.belongsTo(Tutor, {
    foreignKey: 'tutorId'
});

// - Um Tutor pode ter vários Pedidos de Adoção.
Tutor.hasMany(PedidoAdocao, {
    foreignKey: 'tutorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

PedidoAdocao.belongsTo(Tutor, {
    foreignKey: 'tutorId'
});

// - Um Animal pode ter vários Pedidos de Adoção.
Animal.hasMany(PedidoAdocao, {
    foreignKey: 'animalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

PedidoAdocao.belongsTo(Animal, {
    foreignKey: 'animalId'
});

// Explicação das associações:
// A tabela PedidosAdocao serve como uma tabela de junção entre Tutores e Animais.

await sequelize.sync({ alter: true });

export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };