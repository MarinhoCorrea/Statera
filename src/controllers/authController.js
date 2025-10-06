// Importa o serviço responsável por autenticar o usuário
import { SignInService } from '../services/authService.js';

// Define o controlador para lidar com a rota de login
export const PostLogin = async (req, res) => {

  // Extrai email e senha do corpo da requisição
  const { email, senha } = req.body;

  // Verifica se ambos os campos foram preenchidos
  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios." });
  }

  try {

    // Chama o serviço de autenticação com os dados fornecidos
    const resultado = await SignInService(email, senha);

    // Retorna os dados do usuário autenticado com status 200 (OK)
    return res.status(200).json(resultado);

  } catch (error) {

    // Se o erro não for de credenciais inválidas, registra como erro inesperado
    if (error.name !== "CredenciaisInvalidasError") {
      console.error("Erro inesperado no login:", error);
    }

    // Se as credenciais forem inválidas, retorna erro 401 (Não autorizado)
    if (error.name === "CredenciaisInvalidasError") {
      return res.status(401).json({ erro: error.message });
    }

    // Para qualquer outro erro, retorna erro genérico 500 (Erro interno)
    return res.status(500).json({ erro: "Erro interno ao tentar fazer o login." });
  }
};
