// Importa o serviço responsável por registrar uma doação
import { PostDoacaoService } from "../services/doacaoService.js";

// Define o controlador para lidar com a criação de uma nova doação
export const PostDoacao = async (req, res) => {
  try {
    // Obtém os dados da doação enviados no corpo da requisição
    const dados = req.body;

    // Chama o serviço para registrar a doação com os dados fornecidos
    const doacao = await PostDoacaoService(dados);

    // Retorna a doação registrada com status 201 (Created)
    return res.status(201).json(doacao);

  } catch (error) {
    // Loga o erro no console para fins de depuração
    console.error("Erro ao registrar doação:", error);

    // Se os dados da doação forem inválidos, retorna erro 400 (Bad Request)
    if (error.name === "DoacaoInvalidaError") {
      return res.status(400).json({ erro: error.message });
    }
    
    // Para qualquer outro erro, retorna erro genérico 500 (Internal Server Error)
    return res.status(500).json({ erro: "Erro ao processar a doação" });
  }
};
