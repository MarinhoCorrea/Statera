import { Tutor } from '../models/Modelos.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



// Post Tutores
export const CreateTutorService = async (dadosTutor) => {
  // validação básica
  if (!dadosTutor.nome_completo || !dadosTutor.email || !dadosTutor.senha) {
    throw new Error("Todos os campos obrigatórios devem ser preenchidos corretamente.");
  }

  // verifica se o email já existe
  const tutorExistente = await Tutor.findOne({ where: { email: dadosTutor.email } });
  if (tutorExistente) {
    throw new Error("O email preenchido já está sendo utilizado.");
  }

  // criptografa a senha corretamente
  const senhaCriptografada = await bcrypt.hash(dadosTutor.senha, 10); // 10 = saltRounds

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
    facebook: dadosTutor.facebook
  });

  return novoTutor;
};

// Post Login
export const SignInService = async (email, senha)  => {
  const tutor = await Tutor.findOne({ where: { email } });

  if (!tutor) {
    return { status: 404, message:'Usuário não encontrado'};
  }

  const valid = await bcrypt.compare(senha, tutor.senha);

  if (!valid) {
    return { status: 401, message:'Login inválido' };
  }

  const token = jwt.sign(
    { id: tutor.id, email: tutor.email},
    process.env.JWT_SECRET,
    { expiresIn: '6h' }
  );

  return {
    status: 200,
    token,
    tutor
  }
}
