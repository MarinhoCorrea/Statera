import { PedidoAdocao, Tutor, Animal, Questionario } from '../models/Modelos.js'

export const PostAdocaoService = async ({ tutorId, animalId }) => {

    const [tutor, animal] = await Promise.all([
        Tutor.findByPk(tutorId),
        Animal.findByPk(animalId),
    ]);

    if (!tutor || !animal) {
        const error = new Error("Tutor ou animal não encontrado");
        error.name = "NaoEncontradoError";
        throw error;
    }

    const questionario = await Questionario.findOne({ where: { tutorId: tutorId } });

    if (!questionario) {
        const error = new Error("O tutor ainda não respondeu o questionário obrigatório");
        error.name = "QuestionarioAusenteError";
        throw error;
    }

    if (animal.adotado === true) {
        const error = new Error("Este animal já foi adotado.");
        error.name = "AnimalAdotadoError";
        throw error;
    }

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

    const totalPedidosParaAnimal = await PedidoAdocao.count({
        where: {
            animalId: animal.id,
            status: 'em_analise',
        },
    });

    const novaPosicao = totalPedidosParaAnimal + 1;

    const novoPedido = await PedidoAdocao.create({
        tutorId: tutor.id,
        animalId: animal.id,
        status: 'em_analise',
        posicao_fila: novaPosicao,
    });

    const pedidoRetorno = novoPedido.toJSON();

    delete pedidoRetorno.updatedAt;

    return pedidoRetorno;
};

