// Importa o modelo Tutor para buscar dados no banco
import { Tutor } from '../models/Modelos.js';
// Importa o bcrypt para comparar senhas criptografadas
import bcrypt from 'bcryptjs';
// Importa o jwt para gerar o token de autenticação
import jwt from 'jsonwebtoken';

// Serviço responsável por autenticar o tutor e gerar o token de acesso
export const SignInService = async (email, senha) => {
    // Busca o tutor pelo email fornecido
    const tutor = await Tutor.findOne({ where: { email } });

    // Se o tutor não for encontrado, lança erro de credenciais inválidas
    if (!tutor) {

        const error = new Error("Email ou senha inválidos.");
        error.name = "CredenciaisInvalidasError";
        throw error;
    }

    // Compara a senha fornecida com a senha criptografada armazenada
    const valid = await bcrypt.compare(senha, tutor.senha);

    // Se a senha não for válida, lança erro de credenciais inválidas
    if (!valid) {
        const error = new Error("Email ou senha inválidos.");
        error.name = "CredenciaisInvalidasError";
        throw error;
    }

    // Gera o token JWT com os dados do tutor e validade de 6 horas
    const token = jwt.sign(
        { id: tutor.id, email: tutor.email, administrador: tutor.administrador },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
    );

    // Converte os dados do tutor para JSON e remove campos sensíveis
    const tutorRetorno = tutor.toJSON();
    delete tutorRetorno.senha;
    delete tutorRetorno.administrador;
    delete tutorRetorno.createdAt;
    delete tutorRetorno.updatedAt;

    // Retorna o token e os dados do tutor autenticado
    return {
        token,
        tutor: tutorRetorno
    }
}
