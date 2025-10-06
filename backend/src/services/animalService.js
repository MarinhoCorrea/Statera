import { Animal } from '../models/Modelos.js';

export const GetAnimalsService = async (filtros) => {

    const avaliableAnimals = await Animal.count({
        where: {
            adotado: false
        }
    });
    if (avaliableAnimals === 0) {
        const error = new Error("Não há nenhum animal disponível para adoção no momento");
        error.name = "NenhumAnimalDisponivelError";
        throw error;
    }

    const whereClause = {
        adotado: false
    };

    if (filtros.especie) {
        whereClause.especie = filtros.especie;
    }
    if (filtros.porte) {
        whereClause.porte = filtros.porte;
    }

    if (filtros.castrado !== undefined) {
        whereClause.castrado = filtros.castrado === 'true';
    }
    if (filtros.vacinado !== undefined) {
        whereClause.vacinado = filtros.vacinado === "true";
    }

    const filteredAvaliableAnimals = await Animal.findAll({
        where: whereClause,
        attributes: { exclude: ['updatedAt'] },
        order: [['createdAt', 'ASC']]
    });
    
    if (filteredAvaliableAnimals.length === 0) {
        const error = new Error('Nenhum animal disponível para adoção foi encontrado com os filtros selecionados.');
        error.name = "FiltroVazioError";
        throw error;
    }

    return filteredAvaliableAnimals;
}

export const PostAnimalService = async (dadosAnimal) => {

    if (!dadosAnimal.nome || !dadosAnimal.especie || !dadosAnimal.porte || !dadosAnimal.descricao) {
        const error = new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
        error.name = "DadosIncompletosError"; 
        throw error; 
    }

    const novoAnimal = await Animal.create({
        nome: dadosAnimal.nome,
        especie: dadosAnimal.especie,
        porte: dadosAnimal.porte,
        castrado: dadosAnimal.castrado ?? false,
        vacinado: dadosAnimal.vacinado ?? false,
        descricao: dadosAnimal.descricao,
        foto: dadosAnimal.foto, 
        adotado: false 
    });

    const retorno = novoAnimal.toJSON();

    delete retorno.adotado;
    delete retorno.createdAt;
    delete retorno.updatedAt

    return retorno;
};