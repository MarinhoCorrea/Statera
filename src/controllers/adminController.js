// Importa os serviços responsáveis pelas operações administrativas com animais
import { GetAnimaisAdminService, GetAnimalByIdAdminService, PatchAnimalAdminService, DeleteAnimalAdminService } from '../services/adminService.js';

// Função para buscar uma lista de animais com filtros opcionais
export const GetAnimaisAdmin = async (req, res) => {
  try {
    // Extrai os filtros da query string da requisição
    const filters = req.query;

    // Chama o serviço que retorna os animais com base nos filtros
    const result = await GetAnimaisAdminService(filters);

    // Retorna os dados com status 200 (OK)
    return res.status(200).json(result);

  } catch (error) {
    // Caso não haja resultados, retorna status 201 com lista vazia
    if (error.name === "RetornoVazioError") {
      return res.status(201).json({ data: [], total: 0, message: error.message });
    }

    // Em caso de erro inesperado, retorna status 500
    return res.status(500).json({ erro: "Erro ao buscar animais" });
  }
}

// Função para buscar os dados de um animal específico pelo ID
export const GetAnimalByIdAdmin = async (req, res) => {
  const animalId = req.params.id; // Extrai o ID do animal da URL

  try {
    // Chama o serviço que busca o animal pelo ID
    const animalData = await GetAnimalByIdAdminService(animalId);

    // Retorna os dados com status 200 (OK)
    return res.status(200).json(animalData);

  } catch (error) {
    // Se o animal não for encontrado, retorna status 404
    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    // Loga o erro inesperado e retorna status 500
    console.error('Erro inesperado ao buscar animal por ID:', error);
    return res.status(500).json({ erro: "Erro ao buscar animal" });
  }
}

// Função para atualizar os dados de um animal
export const PatchAnimalAdmin = async (req, res) => {
  const animalId = req.params.id; // ID do animal a ser atualizado
  const dadosAtualizacao = req.body; // Dados enviados na requisição

  try {
    // Chama o serviço que atualiza o animal
    const animalAtualizado = await PatchAnimalAdminService(animalId, dadosAtualizacao);

    // Retorna os dados atualizados com status 200 (OK)
    return res.status(200).json(animalAtualizado);

  } catch (error) {
    // Se o erro não for um dos esperados, loga como erro inesperado
    if ( error.name !== "DadosAusentesError" && error.name !== "AnimalNaoEncontradoError" && error.name !== "CampoProibidoError" ) {
      console.error('Erro inesperado ao atualizar animal:', error);
    }

    // Trata erros específicos com mensagens e status apropriados
    if (error.name === "CampoProibidoError") {
      return res.status(400).json({ erro: error.message });
    }

    if (error.name === "DadosAusentesError") {
      return res.status(400).json({ erro: error.message });
    }

    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    // Retorna erro genérico se não for tratado acima
    return res.status(500).json({ erro: "Erro ao atualizar o animal" });
  }
}

// Função para deletar um animal pelo ID
export const DeleteAnimalAdmin = async (req, res) => {
  const animalId = req.params.id; // ID do animal a ser removido

  try {
    // Chama o serviço que realiza a remoção
    await DeleteAnimalAdminService(animalId);

    // Retorna status 204 (sem conteúdo) indicando sucesso
    return res.status(204).send();

  } catch (error) {
    // Se o animal não for encontrado, retorna status 404
    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    // Loga erro inesperado e retorna status 500
    console.error('Erro inesperado ao remover animal (ADMIN):', error);
    return res.status(500).json({ erro: "Erro ao remover animal" });
  }
}
