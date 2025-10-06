import { PostTutorService, PatchTutorService, GetTutorByIdService } from '../services/tutorService.js';

export const PostTutor = async (req, res) => {
    try {

        const novoTutor = await PostTutorService(req.body);
        return res.status(201).json(novoTutor);

    } catch (error) {

        if (error.name !== "DadosIncompletosError" && error.name !== "EmailDuplicadoError") {
            console.error("Erro inesperado no cadastro de tutor:", error);
        }

        if (error.name === "DadosIncompletosError") {
            return res.status(400).json({ erro: error.message });
        }

        if (error.name === "EmailDuplicadoError") {
            return res.status(400).json({ erro: error.message });
        }

        return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
};

export const GetTutorById = async (req, res) => {
    const tutorIdUrl = req.params.id.trim();

    try {
        const tutorData = await GetTutorByIdService(tutorIdUrl);

        return res.status(200).json(tutorData);

    } catch (error) {

        if (error.name === "TutorNaoEncontradoError") {
            return res.status(404).json({ erro: error.message });
        }

        console.error('Erro ao buscar dados do tutor:', error);
        return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
    }
}

export const PatchTutor = async (req, res) => {
    const tutorIdUrl = req.params.id;
    const tutorIdToken = req.user.id;

    const dadosComuns = {};
    const dadosQuestionario = {};

    const camposTutor = ['nome_completo', 'email', 'cidade', 'estado', 'idade', 'telefone', 'celular', 'cpf', 'endereco', 'bairro', 'cep', 'instagram', 'facebook'];

    for (const key in req.body) {
        if (camposTutor.includes(key)) {
            dadosComuns[key] = req.body[key];
        } else {
            dadosQuestionario[key] = req.body[key];
        }
    }

    try {
        const tutorAtualizado = await PatchTutorService(tutorIdUrl, dadosComuns, dadosQuestionario);

        return res.status(200).json(tutorAtualizado);

    } catch (error) {
        if (error.name === "DadosAusentesError") {
            return res.status(400).json({ erro: error.message });
        }
        if (error.name === "TutorNaoEncontradoError") {
            return res.status(404).json({ erro: error.message });
        }
        if (error.name === "QuestionarioAtualizacaoSemExistirError") {
            return res.status(400).json({ erro: error.message });
        }
        console.error('Erro ao atualizar dados do tutor:', error);
        return res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
    }
}