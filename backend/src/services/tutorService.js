import { Tutor, Questionario } from '../models/Modelos.js';
import bcrypt from 'bcryptjs';

export const PostTutorService = async (dadosTutor) => {

  if (!dadosTutor.nome_completo || !dadosTutor.email || !dadosTutor.senha || !dadosTutor.cidade || !dadosTutor.estado || !dadosTutor.idade || !dadosTutor.telefone) {
    const error = new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
    error.name = "DadosIncompletosError";
    throw error;
  }

  const tutorExistente = await Tutor.findOne({ where: { email: dadosTutor.email } });
  if (tutorExistente) {
    const error = new Error("Email preenchido já está sendo utilizado.");
    error.name = "EmailDuplicadoError";
    throw error;
  }

  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
  const senhaCriptografada = await bcrypt.hash(dadosTutor.senha, SALT_ROUNDS);

  const novoTutor = await Tutor.create({
    nome_completo: dadosTutor.nome_completo,
    senha: senhaCriptografada,
    email: dadosTutor.email,
    cidade: dadosTutor.cidade,
    estado: dadosTutor.estado,
    idade: dadosTutor.idade,
    telefone: dadosTutor.telefone,
    instagram: dadosTutor.instagram,
    facebook: dadosTutor.facebook
  });

  const tutorRetorno = novoTutor.toJSON();
  delete tutorRetorno.senha;

  return tutorRetorno;
};

export const GetTutorByIdService = async (tutorId) => {

  const tutor = await Tutor.findByPk(tutorId, {
    include: [{
      model: Questionario,
      required: false
    }],
    attributes: { exclude: ['senha', 'administrador'] }
  });

  if (!tutor) {
    const error = new Error("Tutor não encontrado");
    error.name = "TutorNaoEncontradoError";
    throw error;
  }

  const tutorJSON = tutor.toJSON();

  tutorJSON.questionario = tutorJSON.Questionario;
  delete tutorJSON.Questionario;

  return tutorJSON;
};

export const PatchTutorService = async (tutorIdUrl, dadosTutor, dadosQuestionario) => {

  const temDadosTutor = Object.keys(dadosTutor).length > 0;
  const temDadosQuestionario = Object.keys(dadosQuestionario).length > 0;

  if (!temDadosTutor && !temDadosQuestionario) {
    const error = new Error("Pelo menos um campo deve ser enviado para atualização");
    error.name = "DadosAusentesError";
    throw error;
  }

  const tutor = await Tutor.findByPk(tutorIdUrl, {
    include: [{ model: Questionario, required: false }]
  });

  if (!tutor) {
    const error = new Error("Tutor não encontrado");
    error.name = "TutorNaoEncontradoError";
    throw error;
  }

  let tutorAtualizado = tutor;
  if (temDadosTutor) {

    console.log("Tentando atualizar Tutor com os dados:", dadosTutor); 

    delete dadosTutor.id;
    delete dadosTutor.administrador;
    delete dadosTutor.senha;

    tutorAtualizado = await tutor.update(dadosTutor, { fields: Object.keys(dadosTutor) });

  }

  
  let questionarioAtualizado = null;

  if (temDadosQuestionario) {
        let questionarioExistente = tutor.Questionario; 

        if (questionarioExistente) {
            console.log("Tentando atualizar Questionário com os dados:", dadosQuestionario);
            questionarioAtualizado = await questionarioExistente.update(dadosQuestionario);
        } else {
            console.log("Tentando CRIAR Questionário com os dados:", dadosQuestionario);
            questionarioAtualizado = await Questionario.create({
                ...dadosQuestionario, 
                tutorId: tutorIdUrl 
            });
        }
    }

  const resultado = tutorAtualizado.toJSON();

  delete resultado.senha;
  delete resultado.administrador;

  if (questionarioAtualizado) {
    resultado.questionario = questionarioAtualizado.toJSON();
  } else if (tutorAtualizado.Questionario) {
    resultado.questionario = tutorAtualizado.Questionario.toJSON();
  } else {
    resultado.questionario = null;
  }

  delete resultado.Questionario;

  return resultado;
};
