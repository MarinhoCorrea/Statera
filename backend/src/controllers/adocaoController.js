import { CriarAdocaoService } from "../services/adocaoService.js";

export const CriarAdocaoController = async (req, res) => {
    try {
        const { tutor_id, animal_id } = req.body;
        const novoPedido = await CriarAdocaoService({ tutor_id, animal_id });
        return res.status(201).json(novoPedido);
    }
    catch (error)
    {
        if (error.status) {
            return res.status(error.status).json({ erro: error.message });
        }
        return res.status(500).json({erro: 'Erro ao registrar o pedido de adoção'});
    }
};

export const DeleteAdocaoController = async (req, res) => {
    try {
        const { id } = req.params;
        await DeleteAdocaoService(id);
        return res.status(204).send();
    }
    catch (error) {
        if (error.status) {
            return res.status(error.status).json({ erro: error.message });
        }
        return res.status(500).json({ erro: 'Erro ao remover o pedido de adoção'});
    }
}