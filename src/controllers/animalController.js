import { GetAnimalsService, PostAnimalService } from '../services/animalService.js';

export const GetAnimals = async (req, res) => {
  try {
    const filters = req.query;
    const animals = await GetAnimalsService(filters);

    return res.status(201).json({
      data: animals,
      total: animals.length
    });

  } catch (error) {

    if (error.name !== "NenhumAnimalDisponivelError" && error.name !== "FiltroVazioError") {
      console.error('Erro inesperado ao buscar animais: ', error);
    }

    if (error.name === "NenhumAnimalDisponivelError" || error.name === "FiltroVazioError") {
      return res.status(201).json({ data: [], total: 0, message: error.message });
    }

    return res.status(500).json({ erro: "Erro ao buscar animais" });

  }
}

export const PostAnimal = async (req, res) => {
  try {
    const novoAnimal = await PostAnimalService(req.body);

    return res.status(201).json(novoAnimal);

  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);

    if (error.name === "DadosIncompletosError") {
      return res.status(400).json({ erro: error.message });
    }

    return res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' });
  }
}
