    import { PedidoAdocao } from '../models/PedidoAdocao';
    import { Tutor } from '../models/Tutor.js';
    import { Animal } from '../models/Animal.js';

    export const CriarAdocaoService = async ({ tutor_id, animal_id }) => {
        try {
            // Verifica a existencia do animal e do tutor
            const [tutor, animal] = await Promise.all([
                Tutor.findbyPk(tutor_id),
                Animal.findbyPk(animal_id),
            ]);
            
            if (!tutor | !animal) {
                console.error('Tutor ou animal não encontrado');
            }
            // Verifica se o tutor respondeu o questionario
            if (!tutor.questionario_preenchido) {
                console.error('O tutor ainda não respondeu o questionário obrigatório'
                );
            }

            // Verifica a existência de um pedido de adocao deste tutor ou animal
            const pedidoExistente = await PedidoAdocao.findOne({
                tutor_id,
                animal_id,
                status: 'em analise',
            });

            if (pedidoExistente) {
                console.error('Este tutor já tem um pedido de adoção para este animal');
            } 

            // Cálculo da posição na fila
            const totalPedidosParaAnimal = await PedidoAdocao.count({
                where: { animal_id },
            });

            // A posição do novo pedido será o total + 1
            const novaPosicao = totalPedidosParaAnimal + 1;

            // Criação do novo pedido
            const novoPedido = await PedidoAdocao.create ({
                tutor_id,
                animal_id,
                status: 'em analise',
                posicao_fila: novaPosicao,
            });

            return novoPedido;

        } catch (error) {
            console.error('Erro no CreateAdocaoService', error.message);
            console.error('Erro ao registrar o pedido de adoção');
        }
    };