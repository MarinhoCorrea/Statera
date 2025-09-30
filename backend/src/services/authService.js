import { Tutor } from '../models/Modelos.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Post Login
export const SignInService = async (email, senha) => {
    const tutor = await Tutor.findOne({ where: { email } });

    if (!tutor) {

        const error = new Error("Email ou senha inválidos.");
        error.name = "CredenciaisInvalidasError";
        throw error;
    }

    const valid = await bcrypt.compare(senha, tutor.senha);

    if (!valid) {
        const error = new Error("Email ou senha inválidos.");
        error.name = "CredenciaisInvalidasError";
        throw error;
    }

    const token = jwt.sign(
        { id: tutor.id, email: tutor.email, administrador: tutor.administrador },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
    );

    const tutorRetorno = tutor.toJSON();
    delete tutorRetorno.senha;

    return {
        token,
        tutor: tutorRetorno
    }
}
