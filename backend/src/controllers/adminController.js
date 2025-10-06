import { GetAnimaisAdminService, GetAnimalByIdAdminService, PatchAnimalAdminService, DeleteAnimalAdminService } from '../services/adminService.js';

export const GetAnimaisAdmin = async (req, res) => {
  try {
    const filters = req.query;

    const result = await GetAnimaisAdminService(filters);

    return res.status(200).json(result);

  } catch (error) {

    if (error.name === "RetornoVazioError") {
      return res.status(201).json({ data: [], total: 0, message: error.message });
    }

    return res.status(500).json({ erro: "Erro ao buscar animais" });
  }
}

export const GetAnimalByIdAdmin = async (req, res) => {
  const animalId = req.params.id;

  try {
    const animalData = await GetAnimalByIdAdminService(animalId);

    return res.status(200).json(animalData);

  } catch (error) {

    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    console.error('Erro inesperado ao buscar animal por ID:', error);
    return res.status(500).json({ erro: "Erro ao buscar animal" });
  }
}

export const PatchAnimalAdmin = async (req, res) => {

  const animalId = req.params.id;
  const dadosAtualizacao = req.body;

  try {
    const animalAtualizado = await PatchAnimalAdminService(animalId, dadosAtualizacao);

    return res.status(200).json(animalAtualizado);

  } catch (error) {

    if (error.name !== "DadosAusentesError" && error.name !== "AnimalNaoEncontradoError" && error.name !== "CampoProibidoError") {
      console.error('Erro inesperado ao atualizar animal:', error);
    }

    if (error.name === "CampoProibidoError") {
      return res.status(400).json({ erro: error.message });
    }

    if (error.name === "DadosAusentesError") {
      return res.status(400).json({ erro: error.message });
    }

    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    return res.status(500).json({ erro: "Erro ao atualizar o animal" });
  }
}

export const DeleteAnimalAdmin = async (req, res) => {

  const animalId = req.params.id;

  try {
    await DeleteAnimalAdminService(animalId);

    return res.status(204).send();

  } catch (error) {

    if (error.name === "AnimalNaoEncontradoError") {
      return res.status(404).json({ erro: error.message });
    }

    console.error('Erro inesperado ao remover animal (ADMIN):', error);
    return res.status(500).json({ erro: "Erro ao remover animal" });
  }
}
