import { Router } from "express";
import { criarDoacao } from "../controllers/doacaoController.js";

const router = Router();

// POST /doacoes
router.post("/doacoes", criarDoacao);

export default doacaoRoutes;
