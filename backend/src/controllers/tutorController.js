import { CreateTutorService, GetTutorByIdService } from '../services/tutorService.js';

export const CreateTutorController = async (req, res) => {
  try {
    const novoTutor = await CreateTutorService(req.body);
    return res.status(201).json(novoTutor);
  } catch (error) {
    if (error.message.includes("Todos os campos obrigatórios devem ser preenchidos corretamente")) {
      return res.status(400).json({ erro: error.message });
    }
    if (error.message.includes(" O email preenchido já está sendo utilizado.")) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
  }
};

export const GetTutorByIdController = async (req, res) => {
  try {
    const id = req.query;
    const tutor = await GetTutorByIdService(id);
    
    if (tutor.message) {
      return res.status(404).json(tutor);
    }

    return res.status(200).json(tutor);
  } 
  catch (error) {
    console.error('Erro ao buscar um tutor', error);
    return res.status(500).json({ error: 'Ocorreu um erro interno. Tente novamente mais tarde.'})
  }
}