// Importa os modelos Tutor e Questionario para manipulação no banco de dados
import { Tutor, Questionario } from '../models/Modelos.js';
// Importa o bcrypt para criptografar senhas
import bcrypt from 'bcryptjs';

// Serviço para cadastrar um novo tutor
export const PostTutorService = async (dadosTutor) => {

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!dadosTutor.nome_completo || !dadosTutor.email || !dadosTutor.senha || !dadosTutor.cidade || !dadosTutor.estado || !dadosTutor.idade || !dadosTutor.telefone) {
    const error = new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
    error.name = "DadosIncompletosError";
    throw error;
  }

  // Verifica se já existe um tutor com o mesmo email
  const tutorExistente = await Tutor.findOne({ where: { email: dadosTutor.email } });
  if (tutorExistente) {
    const error = new Error("Email preenchido já está sendo utilizado.");
    error.name = "EmailDuplicadoError";
    throw error;
  }

  // Criptografa a senha do tutor
  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
  const senhaCriptografada = await bcrypt.hash(dadosTutor.senha, SALT_ROUNDS);

  // Cria o novo tutor no banco de dados
  const novoTutor = await Tutor.create({
    nome_completo: dadosTutor.nome_completo,
    senha: senhaCriptografada,
    email: dadosTutor.email,
    cidade: dadosTutor.cidade,
    estado: dadosTutor.estado,
    idade: dadosTutor.idade,
    telefone: dadosTutor.telefone,
    cpf: dadosTutor.cpf,
    endereco: dadosTutor.endereco,
    bairro: dadosTutor.bairro,
    cep: dadosTutor.cep,
    instagram: dadosTutor.instagram,
    facebook: dadosTutor.facebook
  });

  // Prepara os dados para retorno, removendo campos sensíveis
  const tutorRetorno = novoTutor.toJSON();
  delete tutorRetorno.administrador;
  delete tutorRetorno.createdAt;
  delete tutorRetorno.updatedAt;
  delete tutorRetorno.senha;

  return tutorRetorno;
};

// Serviço para buscar os dados de um tutor por ID
export const GetTutorByIdService = async (tutorId) => {

  // Busca o tutor e seu questionário associado
  const tutor = await Tutor.findByPk(tutorId, {
    include: [{
      model: Questionario,
      required: false,
      attributes: { exclude: ['id', 'tutorId', 'createdAt', 'updatedAt'] }
    }],
    attributes: { exclude: ['senha', 'administrador'] }
  });

  // Se o tutor não for encontrado, lança erro
  if (!tutor) {
    const error = new Error("Tutor não encontrado");
    error.name = "TutorNaoEncontradoError";
    throw error;
  }

  // Converte os dados do tutor para JSON
  const tutorJSON = tutor.toJSON();

  // Extrai o questionário do tutor, se existir
  let tutorQuestionario = tutorJSON.Questionario;

  if (Array.isArray(tutorQuestionario) && tutorQuestionario.length > 0) {
    tutorQuestionario = tutorQuestionario[0];
  } else if (Array.isArray(tutorQuestionario) && tutorQuestionario.length === 0) {
    tutorQuestionario = null;
  }

  // Se houver questionário, adiciona ao retorno
  if (tutorQuestionario) {
    tutorJSON.questionario = {
      empregado: tutorQuestionario.empregado,
      quantos_animais_possui: tutorQuestionario.quantos_animais_possui,
      motivos_para_adotar: tutorQuestionario.motivos_para_adotar,
      quem_vai_sustentar_o_animal: tutorQuestionario.quem_vai_sustentar_o_animal,
      numero_adultos_na_casa: tutorQuestionario.numero_adultos_na_casa,
      numero_criancas_na_casa: tutorQuestionario.numero_criancas_na_casa,
      idades_criancas: tutorQuestionario.idades_criancas,
      ...tutorQuestionario
    }
  } else {
    tutorJSON.questionario = {};
  }

  // Remove campos internos do retorno
  delete tutorJSON.Questionario;
  delete tutorJSON.createdAt;
  delete tutorJSON.updatedAt;

  return tutorJSON;
};

// Serviço para atualizar dados do tutor e/ou seu questionário
export const PatchTutorService = async (tutorIdUrl, dadosTutor, dadosQuestionario) => {

  // Verifica se há dados para atualizar
  const temDadosTutor = Object.keys(dadosTutor).length > 0;
  const temDadosQuestionario = Object.keys(dadosQuestionario).length > 0;

  if (!temDadosTutor && !temDadosQuestionario) {
    const error = new Error("Pelo menos um campo deve ser enviado para atualização");
    error.name = "DadosAusentesError";
    throw error;
  }

  // Busca o tutor e seu questionário
  const tutor = await Tutor.findByPk(tutorIdUrl, {
    include: [{ model: Questionario, required: false }]
  });

  if (!tutor) {
    const error = new Error("Tutor não encontrado");
    error.name = "TutorNaoEncontradoError";
    throw error;
  }

  let tutorAtualizado = tutor;

  // Atualiza os dados do tutor, se fornecidos
  if (temDadosTutor) {
    delete dadosTutor.id;
    delete dadosTutor.administrador;
    delete dadosTutor.senha;
    delete dadosTutor.createdAt;
    delete dadosTutor.updatedAt

    tutorAtualizado = await tutor.update(dadosTutor, { fields: Object.keys(dadosTutor) });
  }

  let questionarioAtualizado = null;

  // Atualiza o questionário, se fornecido
  if (temDadosQuestionario) {
    let questionarioExistente = tutor.Questionario;

    if (questionarioExistente) {
      questionarioAtualizado = await questionarioExistente.update(dadosQuestionario);
    } else {
      const error = new Error("Tentativa de atualizar questionário sem possuir um questionário");
      error.name = "QuestionarioAtualizacaoSemExistirError";
      throw error;
    };
  }

  // Prepara os dados atualizados para retorno
  const resultado = tutorAtualizado.toJSON();

  delete resultado.senha;
  delete resultado.administrador;
  delete resultado.createdAt;
  delete resultado.updatedAt;

  // Adiciona os dados do questionário ao retorno, se houver
  if (questionarioAtualizado) {
    let questionarioJSON = questionarioAtualizado.toJSON();

    delete questionarioJSON.id;
    delete questionarioJSON.tutorId;
    delete questionarioJSON.createdAt;
    delete questionarioJSON.updatedAt;

    resultado.questionario = {
      empregado: questionarioJSON.empregado,
      quantos_animais_possui: questionarioJSON.quantos_animais_possui,
      motivos_para_adotar: questionarioJSON.motivos_para_adotar,
      quem_vai_sustentar_o_animal: questionarioJSON.quem_vai_sustentar_o_animal,
      numero_adultos_na_casa: questionarioJSON.numero_adultos_na_casa,
      numero_criancas_na_casa: questionarioJSON.numero_criancas_na_casa,
      idades_criancas: questionarioJSON.idades_criancas,
      ...questionarioJSON
    }
  } else if (tutorAtualizado.Questionario) {
    let questionarioJSON = tutorAtualizado.Questionario.toJSON();
    
    delete questionarioJSON.id;
    delete questionarioJSON.tutorId;
    delete questionarioJSON.createdAt;
    delete questionarioJSON.updatedAt;

    resultado.questionario = questionarioJSON;
  } else {
    resultado.questionario = {};
  }

  delete resultado.Questionario;

  return resultado;
};
