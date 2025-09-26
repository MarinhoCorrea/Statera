import { Animal } from '../models/Modelos.js';

export const GetAnimalsService = async (filtros) => {

    // Verifica se há animais disponíveis para adoção
    const avaliableAnimals = await Animal.count({
        where: {
            adotado: false
        }
    });
    if (avaliableAnimals === 0) {
        return { message: "Não há nenhum animal disponível para adoção no momento" }
    }

    // Declara variável responsável pelos filtros (Já é filtrado em relação à adoção)
    const whereClause = {
        adotado: false
    };

    // Passa pelos filtros de espécie, porte, castrado e vacinado
    if (filtros.especie) {
        whereClause.especie = filtros.especie;
    }
    if (filtros.porte) {
        whereClause.porte = filtros.porte;
    }
    // Por receber valores em string, verifica se os valores são compatíveis com os boolean
    if (filtros.castrado !== undefined) {
        whereClause.castrado = filtros.castrado === 'true';
    }
    if (filtros.vacinado !== undefined) {
        whereClause.vacinado = filtros.vacinado === "true";
    }

    // Realiza uma busca nos animais disponíveis com os filtros
    const filteredAvaliableAnimals = await Animal.findAll({
        where: whereClause,
        order: [['createdAt', 'ASC']]
    });

    // Retorna em caso de não ter aniamis disponíveis com os filtros
    if (filteredAvaliableAnimals.length === 0) {
        console.error('Nenhum animal disponível para adoção foi encontrado com os filtros selecionados.');
    }

    // Sucesso
    return filteredAvaliableAnimals;
}

//Revisar essa parte
export const PostAnimalService = async (dadosAnimal) => {
  try {
    // Validação básica – pode ser refinada conforme regras de negócio
    if (!dadosAnimal.nome || !dadosAnimal.especie || !dadosAnimal.porte) {
      console.error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
    }

    const novoAnimal = await Animal.create({
      nome: dadosAnimal.nome,
      especie: dadosAnimal.especie,
      porte: dadosAnimal.porte,
      castrado: dadosAnimal.castrado ?? false,
      vacinado: dadosAnimal.vacinado ?? false,
      descricao: dadosAnimal.descricao,
      foto: dadosAnimal.foto, // armazenado como buffer
      adotado: false // sempre falso no cadastro
    });

    return novoAnimal;
  } catch (error) {
    console.error("Erro ao cadastrar o animal: " + error.message);
  }
};