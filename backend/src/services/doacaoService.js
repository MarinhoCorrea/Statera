import QRCode from "qrcode";
import { Doacao } from "../models/Modelos.js";

export const PostDoacaoService = async (dados) => {
  const { nome, email, valor, mensagem } = dados;

  // validação do valor
  if (!valor || isNaN(valor) || valor <= 0 || !nome || !mensagem) {
    const error = new Error("Valor da doação, nome e mensagem são obrigatórios. O valor deve ser um número positivo.");
    error.name = "DoacaoInvalidaError";
    throw error;
  }

  // link PIX fictício (exemplo simplificado)
  const linkPix = `00020126580014BR.GOV.BCB.PIX0136chavepix-ficticia@exemplo.com5204000053039865405${valor.toFixed(
    2
  )}5802BR5920Nome Exemplo Fictício6009Sao Paulo62070503***6304ABCD`;

  // gera QRCode base64 a partir do linkPix
  const qrcode = await QRCode.toDataURL(linkPix);

  // salva no banco de dados
  const novaDoacao = await Doacao.create({
    nome,
    email,
    valor,
    mensagem,
    linkPix,
  });

  // retorna resposta formatada
  return {
    doacao_id: novaDoacao.id,
    nome: novaDoacao.nome,
    valor: novaDoacao.valor,
    mensagem: novaDoacao.mensagem,
    linkPix: novaDoacao.linkPix,
    qrcode,
  };
};
