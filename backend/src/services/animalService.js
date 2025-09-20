import { Animal } from '../models/Modelos';

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
        return { message: "Nenhum animal disponível para adoção foi encontrado com os filtros selecionados." }
    }

    // Sucesso
    return {
        data: filteredAvaliableAnimals,
        total: filteredAvaliableAnimals.length
    };
};

//Revisar essa parte
export const CreateAnimalService = async (dadosAnimal) => {
    try {

        // Validação básica
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


// Parte Adicional para se a gente quiser ter mais alguns endpoints

// export const getAnimalsByIdService = async (id) => {
//     const animal = await Animal.findByPk(id, {
//         include: {
//         model: PedidoAdocao,
//         as: 'Pedidos',
//         atributes: ['id'],
//         order: [['createdAt', 'ASC']]
//         }
//     });

//     if (!animal) {
//         const error = new Error('Animal não encontrado');
//         error.status = 404;
//         throw error;
//     }

//     const pedidosId = animal.Pedidos.map(p => p.id);

//     return {
//         ...animal.toJSON(),
//         pedidos: pedidosId
//     };
// };

// export const updateAnimalService = async (id, dadosParaAtualizar) => {
//     if (Object.keys(dadosParaAtualizar).length === 0) {
//         const error = new Error('Nenhum campo foi fornecido para atualização');
//         error.status = 400;
//         throw error;
//     }

//     const animal = await Animal.fyndByPk(id);
//     if (!animal) {
//         const error = new Error ('Animal não encontrado');
//         error.status = 404;
//         throw error;
//     }

//     await animal.update(dadosParaAtualizar);
//     return animal;
// };

// export const deleteAnimalService = async (id) => {
//     const animal = await Animal.fyndByPk(id);
//     if (!animal) {
//         const error = new Error ('Animal não encontrado');
//         error.status = 404;
//         throw error;
//     }

//     await animal.destroy();
// };

// export const getAdminAnimalService = async (filtros) => {
//     const whereClause = {};

//     if (filtros.especie) {
//         whereClause.especie = filtros.especie;
//     }

//     if (filtros.porte) {
//         whereClause.porte = filtros.porte;
//     }

//     if (filtros.castrado !== undefined) {
//         whereClause.castrado = filtros.castrado === 'true';
//     }
//     if (filtros.vacinado !== undefined) {
//         whereClause.vacinado = filtros.vacinado === 'true';
//     }
//     if (filtros.adotado !== undefined) {
//         whereClause.adotado = filtros.adotado === 'true';
//     }

//     const animals = await Animal.findAll({
//         where: whereClause,
//         order: [['createdAt', 'ASC']]
//     });

//     return {
//         data: animals,
//         total: animals.length
//     };
// };