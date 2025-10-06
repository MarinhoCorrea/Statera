// Importa o serviço responsável por registrar pedidos de adoção
import { PostAdocaoService } from "../services/adocaoService.js";

// Define o controlador para lidar com requisições de criação de pedidos de adoção
export const PostAdocao = async (req, res) => {
    // Obtém o ID do tutor a partir do usuário autenticado
    const tutorId = req.user.id;
    
    // Extrai o ID do animal do corpo da requisição
    const { animal_id } = req.body; 

    // Valida se o ID do animal foi fornecido
    if (!animal_id) {
        return res.status(400).json({ erro: "O ID do animal é obrigatório." });
    }

    try {
        // Chama o serviço para registrar o pedido de adoção
        const novoPedido = await PostAdocaoService({
            tutorId, 
            animalId: animal_id
        });
        
        // Retorna o pedido criado com status 201 (Created)
        return res.status(201).json(novoPedido); 
        
    } catch (error) {
        // Se o erro não for um dos esperados, registra no console como erro inesperado
        if ( error.name !== "NaoEncontradoError" && error.name !== "QuestionarioAusenteError" && error.name !== "ConflitoPedidoError" && error.name !== "AnimalAdotadoError" ) {
            console.error('Erro inesperado no pedido de adoção:', error);
        }

        // Trata erro de animal não encontrado ou já adotado com status 404
        if (error.name === "NaoEncontradoError" || error.name === "AnimalAdotadoError") {
            return res.status(404).json({ erro: error.message });
        }

        // Trata erro de questionário não preenchido com status 400
        if (error.name === "QuestionarioAusenteError") {
            return res.status(400).json({ erro: error.message });
        }

        // Trata conflito de pedido já existente com status 409
        if (error.name === "ConflitoPedidoError") {
            return res.status(409).json({ erro: error.message });
        }

        // Retorna erro genérico com status 500
        return res.status(500).json({ erro: "Erro ao registrar o pedido de adoção" });
    }
};
