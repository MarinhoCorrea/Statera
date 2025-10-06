import { PostDoacaoService } from "../services/doacaoService.js";

export const PostDoacao = async (req, res) => {
  try {
    const dados = req.body;
    const doacao = await PostDoacaoService(dados);

    return res.status(201).json(doacao);

  } catch (error) {
    console.error("Erro ao registrar doação:", error);

    if (error.name === "DoacaoInvalidaError") {
      return res.status(400).json({ erro: error.message });
    }
    
    return res.status(500).json({ erro: "Erro ao processar a doação" });
  }
};