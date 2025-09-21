import { Tutor } from '../models/Modelos.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Questionario from '../models/Questionario.js';

// Post Tutores
export const CreateTutorService = async (dadosTutor) => {
  try {
    // validação básica
    if (!dadosTutor.nome_completo || !dadosTutor.email || !dadosTutor.senha) {
      console.error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
    }

    // verifica se o email já existe
    const tutorExistente = await Tutor.findOne({ where: { email: dadosTutor.email } });
    if (tutorExistente) {
      console.error("Email preenchido já está sendo utilizado.");

    }

    // criptografa a senha
    const secretKey = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(dadosTutor.senha, secretKey, 256);

    // cria o tutor
    const novoTutor = await Tutor.create({
      nome_completo: dadosTutor.nome_completo,
      senha: senhaCriptografada,
      email: dadosTutor.email,
      cidade: dadosTutor.cidade,
      estado: dadosTutor.estado,
      idade: dadosTutor.idade,
      telefone: dadosTutor.telefone,
      instagram: dadosTutor.instagram,
      facebook: dadosTutor.facebook,
      senha: senhaCriptografada,
    });

    // nao retorna a senha no resposta
    novoTutor.senha = undefined;
    return novoTutor;

  } catch (error) {
    console.error(error.message);
  }
};

// Post Login
export const SignInService = async (email, senha) => {
  if (!email || !senha) {
    return { status: 400, message: 'Email e senha são obrigatórios' };
  }

  const tutor = await Tutor.findOne({ where: { email } });

  if (!tutor) {
    return { status: 401, message: 'Usuário não encontrado' };
  }

  const senhaValida = await bcrypt.compare(senha, tutor.senha);

  if (!senhaValida) {
    return { status: 401, message: 'Login inválido' };
  }

  const token = jwt.sign(
    { id: tutor.id, email: tutor.email, }, // admin: tutor.administrador
    process.env.JWT_SECRET,
    { expiresIn: '6h' }
  );

  return {
    status: 200,
    token,
    tutor
  };

}

export const GetTutorByIdService = async (id) => {
  try {
    const tutor = Tutor.findByPk(id, { include: Questionario });
    if (!tutor) {
      throw { status: 404, message: 'Tutor não encontrado' }
    }
    return tutor;
  } 
  catch (error) {
    console.error(error.message);
  }
};