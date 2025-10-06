import { PostQuestionarioService } from '../services/questionarioService.js';

export const PostQuestionario = async (req, res) => {
    const tutorId = req.user.id;
    const dadosQuestionario = req.body;

    try {
        const novoQuestionario = await PostQuestionarioService(tutorId, dadosQuestionario);

        return res.status(201).json(novoQuestionario);

    } catch (error) {

        if (error.name === "DadosIncompletosError" || error.name === "QuestionarioExistenteError") {
            return res.status(400).json({ erro: error.message });
        }
        
        console.error("Erro interno ao cadastrar questionário:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar o questionário." });
    }
};