// Importa os modelos necessários para o processo de adoção
import { PedidoAdocao, Tutor, Animal, Questionario } from '../models/Modelos.js'

// Serviço responsável por registrar um novo pedido de adoção
export const PostAdocaoService = async ({ tutorId, animalId }) => {

    // Busca simultaneamente o tutor e o animal pelo ID
    const [tutor, animal] = await Promise.all([
        Tutor.findByPk(tutorId),
        Animal.findByPk(animalId),
    ]);

    // Verifica se o tutor ou o animal não foram encontrados
    if (!tutor || !animal) {
        const error = new Error("Tutor ou animal não encontrado");
        error.name = "NaoEncontradoError";
        throw error;
    }

    // Verifica se o tutor respondeu o questionário obrigatório
    const questionario = await Questionario.findOne({ where: { tutorId: tutorId } });

    if (!questionario) {
        const error = new Error("O tutor ainda não respondeu o questionário obrigatório");
        error.name = "QuestionarioAusenteError";
        throw error;
    }

    // Verifica se o animal já foi adotado
    if (animal.adotado === true) {
        const error = new Error("Este animal já foi adotado.");
        error.name = "AnimalAdotadoError";
        throw error;
    }

    // Verifica se já existe um pedido ativo para este tutor e animal
    const pedidoExistente = await PedidoAdocao.findOne({
        where: {
            tutorId: tutor.id,
            animalId: animal.id,
            status: 'em_analise',
        },
    });

    if (pedidoExistente) {
        const error = new Error("Este tutor já tem um pedido de adoção ativo para este animal");
        error.name = "ConflitoPedidoError";
        throw error;
    }

    // Conta quantos pedidos ativos existem para este animal
    const totalPedidosParaAnimal = await PedidoAdocao.count({
        where: {
            animalId: animal.id,
            status: 'em_analise',
        },
    });

    // Define a nova posição na fila de pedidos
    const novaPosicao = totalPedidosParaAnimal + 1;

    // Cria o novo pedido de adoção
    const novoPedido = await PedidoAdocao.create({
        tutorId: tutor.id,
        animalId: animal.id,
        status: 'em_analise',
        posicao_fila: novaPosicao,
    });

    // Converte o pedido para JSON e remove o campo 'updatedAt'
    const pedidoRetorno = novoPedido.toJSON();

    delete pedidoRetorno.updatedAt;

    // Retorna o pedido criado
    return pedidoRetorno;
};
