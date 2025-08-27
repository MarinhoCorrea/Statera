import { Tutor } from '../models/Tutor.js';
import encrypt from 'encryptjs';

//revisar tudo isso 

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
    const secretKey = "chave-secreta"; 
    const senhaCriptografada = encrypt.encrypt(dadosTutor.senha, secretKey, 256);

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
  } catch (error) {
    console.error(error.message);
  }
};
