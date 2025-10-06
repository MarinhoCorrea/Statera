// Importa os serviços responsáveis por buscar e cadastrar animais
import { GetAnimalsService, PostAnimalService } from '../services/animalService.js';

// Controlador para buscar animais com base em filtros fornecidos na query string
export const GetAnimals = async (req, res) => {
  try {
    // Extrai os filtros da URL (ex: ?especie=cachorro&idade=2)
    const filters = req.query;

    // Chama o serviço que retorna os animais filtrados
    const animals = await GetAnimalsService(filters);

    // Retorna os animais encontrados com status 201 (Created)
    return res.status(201).json({
      data: animals,
      total: animals.length
    });

  } catch (error) {
    // Se o erro não for um dos esperados, registra no console como erro inesperado
    if ( error.name !== "NenhumAnimalDisponivelError" && error.name !== "FiltroVazioError" ) {
      console.error('Erro inesperado ao buscar animais: ', error);
    }

    // Se não houver animais disponíveis ou os filtros forem inválidos, retorna lista vazia
    if ( error.name === "NenhumAnimalDisponivelError" || error.name === "FiltroVazioError" ) {
      return res.status(201).json({ data: [], total: 0, message: error.message });
    }

    // Retorna erro genérico com status 500 (Internal Server Error)
    return res.status(500).json({ erro: "Erro ao buscar animais" });
  }
}

// Controlador para cadastrar um novo animal
export const PostAnimal = async (req, res) => {
  try {
    // Chama o serviço para cadastrar o animal com os dados enviados no corpo da requisição
    const novoAnimal = await PostAnimalService(req.body);

    // Retorna o animal criado com status 201 (Created)
    return res.status(201).json(novoAnimal);

  } catch (error) {
    // Loga o erro no console
    console.error('Erro ao cadastrar animal:', error);

    // Se os dados estiverem incompletos, retorna erro 400 (Bad Request)
    if (error.name === "DadosIncompletosError") {
      return res.status(400).json({ erro: error.message });
    }

    // Retorna erro genérico com status 500
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' });
  }
}
