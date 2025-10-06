// Importa os modelos Animal e PedidoAdocao para uso nas consultas
import { Animal, PedidoAdocao } from '../models/Modelos.js';

// Serviço para buscar animais com filtros aplicados, exclusivo para administradores
export const GetAnimaisAdminService = async (filtros) => {

    // Inicializa cláusula de filtros para a consulta
    const whereClause = {
    };

    // Inicializa cláusula de associação com pedidos de adoção
    const includeClause = [];

    // Aplica filtro por espécie, se fornecido
    if (filtros.especie) {
        whereClause.especie = filtros.especie;
    }
    // Aplica filtro por porte, se fornecido
    if (filtros.porte) {
        whereClause.porte = filtros.porte;
    }

    // Aplica filtro por castração, convertendo string para booleano
    if (filtros.castrado !== undefined) {
        whereClause.castrado = filtros.castrado === 'true';
    }
    // Aplica filtro por vacinação, convertendo string para booleano
    if (filtros.vacinado !== undefined) {
        whereClause.vacinado = filtros.vacinado === "true";
    }
    // Aplica filtro por status de adoção, convertendo string para booleano
    if (filtros.adotado !== undefined) {
        whereClause.adotado = filtros.adotado === "true";
    }

    // Inclui associação com pedidos de adoção, sem obrigatoriedade de existência
    includeClause.push({
        model: PedidoAdocao,
        required: false,
    });

    // Executa a consulta com filtros, associações e ordenação
    const resultado = await Animal.findAndCountAll({
        where: whereClause,
        include: includeClause,
        attributes: { exclude: ['updatedAt'] },
        order: [['createdAt', 'DESC']]
    });

    // Se nenhum animal for encontrado, lança erro personalizado
    if (resultado.count === 0) {
        const error = new Error('Nenhum animal disponível para adoção foi encontrado com os filtros selecionados.');
        error.name = "RetornoVazioError";
        throw error;
    }

    // Retorna os dados encontrados e o total
    return {
        data: resultado.rows,
        total: resultado.count
    };
};

// Serviço para atualizar dados de um animal, com restrições de campos
export const PatchAnimalAdminService = async (animalId, dadosAtualizacao) => {

    // Verifica se foram enviados dados para atualização
    if (Object.keys(dadosAtualizacao).length === 0) {
        const error = new Error("Nenhum campo foi fornecido para atualização");
        error.name = "DadosAusentesError";
        throw error;
    }

    // Define campos que não podem ser atualizados por esta rota
    const camposProibidos = ['especie', 'porte', 'nome', 'descricao'];

    // Verifica se algum campo proibido foi incluído na atualização
    for (const campo of camposProibidos) {
        if (dadosAtualizacao.hasOwnProperty(campo)) {
            const error = new Error(`O campo '${campo}' não pode ser alterado através desta rota de status.`);
            error.name = "CampoProibidoError";
            throw error;
        }
    }

    // Busca o animal pelo ID
    const animal = await Animal.findByPk(animalId);

    // Se não encontrado, lança erro personalizado
    if (!animal) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }

    // Atualiza os dados permitidos do animal
    const animalAtualizado = await animal.update(dadosAtualizacao);

    // Prepara retorno excluindo campos sensíveis ou irrelevantes
    const retorno = animalAtualizado.toJSON();
    delete retorno.especie;
    delete retorno.porte;
    delete retorno.foto;
    delete retorno.createdAt;

    return retorno;
};

// Serviço para buscar um animal por ID, incluindo seus pedidos de adoção
export const GetAnimalByIdAdminService = async (animalId) => {

    // Busca o animal com associação aos pedidos de adoção
    const animal = await Animal.findByPk(animalId, {
        include: [{
            model: PedidoAdocao,
            attributes: ['id', 'status', 'posicao_fila', 'tutorId', 'createdAt']
        }],
        order: [
            [PedidoAdocao, 'createdAt', 'ASC']
        ]
    });

    // Se não encontrado, lança erro personalizado
    if (!animal) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }

    // Converte os dados do animal para JSON
    const animalJSON = animal.toJSON();

    // Extrai os pedidos de adoção associados ao animal
    const pedidosDoAnimal = animalJSON.PedidoAdocaos || animalJSON.pedidos || [];

    // Remove propriedades duplicadas ou desnecessárias
    delete animalJSON.PedidoAdocao;
    delete animalJSON.PedidoAdocaos;

    // Retorna os dados do animal com os pedidos associados
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
        pedidos: pedidosDoAnimal,
    };
};

// Serviço para remover um animal do banco de dados
export const DeleteAnimalAdminService = async (animalId) => {

    // Executa a remoção do animal pelo ID
    const animalRemovido = await Animal.destroy({
        where: { id: animalId }
    });

    // Se nenhum registro for removido, lança erro personalizado
    if (animalRemovido === 0) {
        const error = new Error("Animal não encontrado");
        error.name = "AnimalNaoEncontradoError";
        throw error;
    }

    // Retorna true indicando sucesso na remoção
    return true;
};
