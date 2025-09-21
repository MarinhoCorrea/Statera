import { GetAnimalsService, Createanimalservice } from '../services/animalService';

export const GetAnimalController = async (req, res) => {
    try {
        const filtros = req.query;
        const animais = await GetAnimalsService(filtros);

        if (animais.message) {
            return res.status(404).json(animais);
        }

        return res.status(200).json(animais);
    } catch (error) {
        console.error('Erro ao buscar animais: ', error);
        return res.status(500).json({ error: 'Ocorreu um erro interno. Tente novamente mais tarde' });
    }
}
//Revisar essa parte
export const CreateAnimalController = async (req, res) => {
  try {
    const novoAnimal = await CreateAnimalService(req.body);

    return res.status(201).json(novoAnimal);
  } catch (error) {
    if (error.message.includes("campos obrigatórios")) {
      return res.status(400).json({ erro: error.message });
    }

    return res.status(500).json({ erro: "Erro interno ao cadastrar o animal." });
  }
}
