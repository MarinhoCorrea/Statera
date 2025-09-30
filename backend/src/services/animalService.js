import { Animal } from '../models/Modelos.js';

export const GetAnimalsService = async (filtros) => {

    // Verifica se há animais disponíveis para adoção
    // Má prática devio a diversas consultas no db, porém útil para nomenclatura e diferenciação dos erros
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
        const error = new Error('Nenhum animal disponível para adoção foi encontrado com os filtros selecionados.');
        error.name = "FiltroVazioError";
        throw error;
    }

    // Sucesso
    return filteredAvaliableAnimals;
}

//Revisar essa parte
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

    return novoAnimal.toJSON();
};