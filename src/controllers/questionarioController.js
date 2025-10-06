// Importa o serviço responsável por cadastrar o questionário
import { PostQuestionarioService } from '../services/questionarioService.js';

// Define o controlador para lidar com o cadastro de questionário
export const PostQuestionario = async (req, res) => {
    // Obtém o ID do tutor a partir do usuário autenticado
    const tutorId = req.user.id;
    // Obtém os dados do questionário enviados no corpo da requisição
    const dadosQuestionario = req.body;

    try {
        // Chama o serviço para cadastrar o questionário com os dados fornecidos
        const novoQuestionario = await PostQuestionarioService(tutorId, dadosQuestionario);

        // Retorna o questionário criado com status 201 (Created)
        return res.status(201).json(novoQuestionario);

    } catch (error) {
        // Se os dados estiverem incompletos ou o questionário já existir, retorna erro 400 (Bad Request)
        if (error.name === "DadosIncompletosError" || error.name === "QuestionarioExistenteError") {
            return res.status(400).json({ erro: error.message });
        }
        
        // Loga o erro inesperado no console e retorna erro 500 (Internal Server Error)
        console.error("Erro interno ao cadastrar questionário:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar o questionário." });
    }
};
