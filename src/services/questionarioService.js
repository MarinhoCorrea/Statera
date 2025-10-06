import { Questionario, Tutor } from '../models/Modelos.js';

const camposObrigatorios = [
    'quantos_animais_possui', 'motivos_para_adotar', 'quem_vai_sustentar_o_animal',
    'numero_adultos_na_casa', 'numero_criancas_na_casa', 'residencia_tipo',
    'proprietario_permite_animais', 'todos_de_acordo_com_adocao', 'responsavel_pelo_animal',
    'responsavel_concorda_com_adocao', 'ha_alergico_ou_pessoas_que_nao_gostam',
    'gasto_mensal_estimado', 'valor_disponivel_no_orcamento', 'tipo_alimentacao',
    'local_que_o_animal_vai_ficar', 'forma_de_permanencia', 'forma_de_confinamento',
    'tera_brinquedos', 'tera_abrigo', 'tera_passeios_acompanhado', 'tera_passeios_sozinho',
    'companhia_outro_animal', 'companhia_humana_24h', 'companhia_humana_parcial',
    'sem_companhia_humana', 'sem_companhia_animal', 'o_que_faz_em_viagem',
    'o_que_faz_se_fugir', 'o_que_faz_se_nao_puder_criar', 'animais_que_ja_criou',
    'destino_animais_anteriores', 'costuma_esterilizar', 'costuma_vacinar',
    'costuma_vermifugar', 'veterinario_usual', 'forma_de_educar',
    'envia_fotos_e_videos_do_local', 'aceita_visitas_e_fotos_do_animal',
    'topa_entrar_grupo_adotantes', 'concorda_com_taxa_adocao', 'data_disponivel_para_buscar_animal'
];

export const PostQuestionarioService = async (tutorId, dadosQuestionario) => {

    for (const campo of camposObrigatorios) {
        if (!(campo in dadosQuestionario) || dadosQuestionario[campo] === null || dadosQuestionario[campo] === '') {
            const error = new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
            error.name = "DadosIncompletosError";
            throw error;
        }
    }

    const questionarioExistente = await Questionario.findOne({ where: { tutorId } });

    if (questionarioExistente) {
        const error = new Error("O questionário já foi preenchido por este tutor.");
        error.name = "QuestionarioExistenteError";
        throw error;
    }

    const novoQuestionario = await Questionario.create({
        empregado: dadosQuestionario.empregado,
        quantos_animais_possui: dadosQuestionario.quantos_animais_possui,
        motivos_para_adotar: dadosQuestionario.motivos_para_adotar,
        quem_vai_sustentar_o_animal: dadosQuestionario.quem_vai_sustentar_o_animal,
        numero_adultos_na_casa: dadosQuestionario.numero_adultos_na_casa,
        numero_criancas_na_casa: dadosQuestionario.numero_criancas_na_casa,
        idades_criancas: dadosQuestionario.idades_criancas,
        ...dadosQuestionario,
        tutorId: tutorId
    });

    const resultado = novoQuestionario.toJSON();

    delete resultado.id;
    delete resultado.createdAt;
    delete resultado.updatedAt;

    return resultado.toJSON();
};