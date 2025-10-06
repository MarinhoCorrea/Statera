// Importa o modelo Animal para realizar operações no banco de dados
import { Animal } from '../models/Modelos.js';

// Serviço responsável por buscar animais disponíveis para adoção com base em filtros
export const GetAnimalsService = async (filtros) => {

    // Conta quantos animais ainda não foram adotados
    const avaliableAnimals = await Animal.count({
        where: {
            adotado: false
        }
    });

    // Se não houver nenhum animal disponível, lança erro personalizado
    if (avaliableAnimals === 0) {
        const error = new Error("Não há nenhum animal disponível para adoção no momento");
        error.name = "NenhumAnimalDisponivelError";
        throw error;
    }

    // Define cláusula de filtro base para animais não adotados
    const whereClause = {
        adotado: false
    };

    // Aplica filtro por espécie, se fornecido
    if (filtros.especie) {
        whereClause.especie = filtros.especie;
    }
    // Aplica filtro por porte, se fornecido
    if (filtros.porte) {
        whereClause.porte = filtros.porte;
    }

    // Aplica filtro por castração, convertendo string para booleano
    if (filtros.castrado !== undefined) {
        whereClause.castrado = filtros.castrado === 'true';
    }
    // Aplica filtro por vacinação, convertendo string para booleano
    if (filtros.vacinado !== undefined) {
        whereClause.vacinado = filtros.vacinado === "true";
    }

    // Busca os animais que atendem aos filtros definidos
    const filteredAvaliableAnimals = await Animal.findAll({
        where: whereClause,
        attributes: { exclude: ['updatedAt'] },
        order: [['createdAt', 'ASC']]
    });
    
    // Se nenhum animal for encontrado com os filtros, lança erro personalizado
    if (filteredAvaliableAnimals.length === 0) {
        const error = new Error('Nenhum animal disponível para adoção foi encontrado com os filtros selecionados.');
        error.name = "FiltroVazioError";
        throw error;
    }

    // Retorna a lista de animais filtrados
    return filteredAvaliableAnimals;
}

// Serviço responsável por cadastrar um novo animal no sistema
export const PostAnimalService = async (dadosAnimal) => {

    // Verifica se os campos obrigatórios foram preenchidos
    if (!dadosAnimal.nome || !dadosAnimal.especie || !dadosAnimal.porte || !dadosAnimal.descricao) {
        const error = new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
        error.name = "DadosIncompletosError"; 
        throw error; 
    }

    // Cria um novo registro de animal no banco de dados
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

    // Converte o registro para JSON e remove campos desnecessários do retorno
    const retorno = novoAnimal.toJSON();

    delete retorno.adotado;
    delete retorno.createdAt;
    delete retorno.updatedAt

    // Retorna os dados do animal recém-cadastrado
    return retorno;
};
