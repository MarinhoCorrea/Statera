import { SignInService } from '../services/authService.js';

export const PostLogin = async (req, res) => {

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios." });
  }

  try {

    const resultado = await SignInService(email, senha);

    return res.status(200).json(resultado);

  } catch (error) {

    if (error.name !== "CredenciaisInvalidasError") {
      console.error("Erro inesperado no login:", error);
    }

    if (error.name === "CredenciaisInvalidasError") {
      return res.status(401).json({ erro: error.message });
    }

    return res.status(500).json({ erro: "Erro interno ao tentar fazer o login." });
  }
};