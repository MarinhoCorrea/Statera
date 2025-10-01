import { Animal, PedidoAdocao } from '../models/Modelos.js';

export const GetAnimaisAdminService = async (filtros) => {

    const whereClause = {};
    const includeClause = [];

    if (filtros.especie) {
        whereClause.especie = filtros.especie;
    }
    if (filtros.porte) {
        whereClause.porte = filtros.porte;
    }
    if (filtros.castrado !== undefined) {
        whereClause.castrado = filtros.castrado === 'true';
    }
    if (filtros.vacinado !== undefined) {
        whereClause.vacinado = filtros.vacinado === "true";
    }
    if (filtros.adotado !== undefined) {
        whereClause.adotado = filtros.adotado === 'true';
    }

    includeClause.push({
        model: PedidoAdocao,
        required: false,
    });


    const resultado = await Animal.findAndCountAll({
        where: whereClause,
        include: includeClause,
        order: [['createdAt', 'DESC']]
    });

    return {
        data: resultado.rows,
        total: resultado.count
    };
};

export const PatchAnimalAdminService = async (animalId, dadosAtualizacao) => {


    if (Object.keys(dadosAtualizacao).length === 0) {
        const error = new Error("Nenhum campo foi fornecido para atualização");
        error.name = "DadosAusentesError";
        throw error;
    }

    const animal = await Animal.findByPk(animalId);

    if (!animal) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }

    const animalAtualizado = await animal.update(dadosAtualizacao);

    return animalAtualizado.toJSON();
};

export const GetAnimalByIdAdminService = async (animalId) => {
    
    const animal = await Animal.findByPk(animalId, {
        include: [{
            model: PedidoAdocao,
            order: [['createdAt', 'ASC']],
            attributes: ['id', 'status', 'posicao_fila', 'tutorId', 'createdAt'] 
        }],
    });

    if (!animal) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }

    const animalJSON = animal.toJSON();
    
    const listaIdsPedidos = animalJSON.pedidos ? animalJSON.pedidos.map(p => p.id) : [];

    return {
        id: animalJSON.id,
        nome: animalJSON.nome,
        especie: animalJSON.especie,
        porte: animalJSON.porte,
        castrado: animalJSON.castrado,
        vacinado: animalJSON.vacinado,
        adotado: animalJSON.adotado,
        descricao: animalJSON.descricao,
        foto: animalJSON.foto, 
        pedidos: listaIdsPedidos,
    };
};

export const DeleteAnimalAdminService = async (animalId) => {

    const animalRemovido = await Animal.destroy({
        where: { id: animalId }
    });

    if (animalRemovido === 0) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }
    
    return true; 
};