// Importa a biblioteca para geração de QR Code
import QRCode from "qrcode";
// Importa o modelo Doacao para manipulação no banco de dados
import { Doacao } from "../models/Modelos.js";

// Serviço responsável por registrar uma nova doação e gerar o QR Code do pagamento
export const PostDoacaoService = async (dados) => {
  // Extrai os dados da doação recebidos
  const { nome, email, valor, mensagem } = dados;

  // Valida os campos obrigatórios e se o valor é um número positivo
  if (!valor || isNaN(valor) || valor <= 0 || !nome || !mensagem) {
    const error = new Error("Valor da doação, nome e mensagem são obrigatórios. O valor deve ser um número positivo.");
    error.name = "DoacaoInvalidaError";
    throw error;
  }

  // Monta o link de pagamento via Pix com os dados simulados
  const linkPix = `00020126580014BR.GOV.BCB.PIX0136chavepix-ficticia@exemplo.com5204000053039865405${valor.toFixed(
    2
  )}5802BR5920Nome Exemplo Fictício6009Sao Paulo62070503***6304ABCD`;

  // Gera o QR Code a partir do link Pix
  const qrcode = await QRCode.toDataURL(linkPix);

  // Registra a doação no banco de dados
  const novaDoacao = await Doacao.create({
    nome,
    email,
    valor,
    mensagem,
    linkPix,
  });

  // Retorna os dados da doação junto com o QR Code gerado
  return {
    doacao_id: novaDoacao.id,
    nome: novaDoacao.nome,
    valor: novaDoacao.valor,
    mensagem: novaDoacao.mensagem,
    linkPix: novaDoacao.linkPix,
    qrcode,
  };
};
