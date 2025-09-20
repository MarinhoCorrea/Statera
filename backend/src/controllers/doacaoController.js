import { criarDoacaoService } from "../services/doacaoService.js";

export const CreateDoacaoController = async (req, res) => {
  try {
    const dados = req.body;
    const doacao = await criarDoacaoService(dados);
    return res.status(201).json(doacao);
  } catch (error) {
    console.error("Erro ao registrar doação:", error);

    if (error.status === 400) {
      return res.status(400).json({ erro: error.message });
    }

    return res.status(500).json({ erro: "Erro ao processar a doação" });
  }
};
