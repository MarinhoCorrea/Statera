import { PostAdocaoService } from "../services/adocaoService.js";

export const PostAdocao = async (req, res) => {
    const tutorId = req.user.id;
    
    const { animal_id } = req.body; 

    if (!animal_id) {
        return res.status(400).json({ erro: "O ID do animal é obrigatório." });
    }

    try {
        const novoPedido = await PostAdocaoService(tutorId, animal_id);
        
        return res.status(201).json(novoPedido); 
        
    } catch (error) {
        
        if (error.name !== "NaoEncontradoError" && error.name !== "QuestionarioAusenteError" && error.name !== "ConflitoPedidoError" && error.name !== "AnimalAdotadoError") {
             console.error('Erro inesperado no pedido de adoção:', error);
        }
        
        if (error.name === "NaoEncontradoError" || error.name === "AnimalAdotadoError") {
            return res.status(404).json({ erro: error.message });
        }
        
        if (error.name === "QuestionarioAusenteError") {
            return res.status(400).json({ erro: error.message });
        }
        
        if (error.name === "ConflitoPedidoError") {
            return res.status(409).json({ erro: error.message });
        }

        return res.status(500).json({ erro: "Erro ao registrar o pedido de adoção" });
    }
};