// Importa os serviços responsáveis por cadastrar, atualizar e buscar dados de tutores
import { PostTutorService, PatchTutorService, GetTutorByIdService } from '../services/tutorService.js';

// Controlador para cadastrar um novo tutor
export const PostTutor = async (req, res) => {
    try {
        // Chama o serviço para criar um novo tutor com os dados recebidos no corpo da requisição
        const novoTutor = await PostTutorService(req.body);
        // Retorna o tutor criado com status 201 (Created)
        return res.status(201).json(novoTutor);

    } catch (error) {
        // Se o erro não for esperado, registra no console
        if (error.name !== "DadosIncompletosError" && error.name !== "EmailDuplicadoError") {
            console.error("Erro inesperado no cadastro de tutor:", error);
        }

        // Retorna erro 400 se os dados estiverem incompletos
        if (error.name === "DadosIncompletosError") {
            return res.status(400).json({ erro: error.message });
        }

        // Retorna erro 400 se o email já estiver cadastrado
        if (error.name === "EmailDuplicadoError") {
            return res.status(400).json({ erro: error.message });
        }

        // Retorna erro genérico 500 para falhas internas
        return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
};

// Controlador para buscar os dados de um tutor pelo ID
export const GetTutorById = async (req, res) => {
    // Extrai e limpa o ID do tutor da URL
    const tutorIdUrl = req.params.id.trim();

    try {
        // Chama o serviço para buscar os dados do tutor
        const tutorData = await GetTutorByIdService(tutorIdUrl);
        // Retorna os dados encontrados com status 200 (OK)
        return res.status(200).json(tutorData);

    } catch (error) {
        // Retorna erro 404 se o tutor não for encontrado
        if (error.name === "TutorNaoEncontradoError") {
            return res.status(404).json({ erro: error.message });
        }

        // Loga erro inesperado e retorna erro genérico 500
        console.error('Erro ao buscar dados do tutor:', error);
        return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
}

// Controlador para atualizar os dados de um tutor
export const PatchTutor = async (req, res) => {
    // ID do tutor extraído da URL
    const tutorIdUrl = req.params.id;
    // ID do tutor autenticado extraído do token
    const tutorIdToken = req.user.id;

    // Objetos para separar dados comuns e dados do questionário
    const dadosComuns = {};
    const dadosQuestionario = {};

    // Lista de campos que pertencem ao perfil do tutor
    const camposTutor = ['nome_completo', 'email', 'cidade', 'estado', 'idade', 'telefone', 'celular', 'cpf', 'endereco', 'bairro', 'cep', 'instagram', 'facebook'];

    // Separa os dados recebidos entre dados comuns e dados do questionário
    for (const key in req.body) {
        if (camposTutor.includes(key)) {
            dadosComuns[key] = req.body[key];
        } else {
            dadosQuestionario[key] = req.body[key];
        }
    }

    try {
        // Chama o serviço para atualizar os dados do tutor
        const tutorAtualizado = await PatchTutorService(tutorIdUrl, dadosComuns, dadosQuestionario);
        // Retorna os dados atualizados com status 200 (OK)
        return res.status(200).json(tutorAtualizado);

    } catch (error) {
        // Retorna erro 400 se os dados estiverem ausentes
        if (error.name === "DadosAusentesError") {
            return res.status(400).json({ erro: error.message });
        }
        // Retorna erro 404 se o tutor não for encontrado
        if (error.name === "TutorNaoEncontradoError") {
            return res.status(404).json({ erro: error.message });
        }
        // Retorna erro 400 se tentar atualizar questionário inexistente
        if (error.name === "QuestionarioAtualizacaoSemExistirError") {
            return res.status(400).json({ erro: error.message });
        }
        // Loga erro inesperado e retorna erro genérico 500
        console.error('Erro ao atualizar dados do tutor:', error);
        return res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
    }
}
