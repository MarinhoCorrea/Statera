import { Animal } from '../models/Animal';

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
        where: whereClause
    });

    // Retorna em caso de não ter aniamis disponíveis com os filtros
    if (filteredAvaliableAnimals.length === 0) {
        return { message: "Nenhum animal disponível para adoção foi encontrado com os filtros selecionados." }
    }

    // Sucesso
    return filteredAvaliableAnimals;
}