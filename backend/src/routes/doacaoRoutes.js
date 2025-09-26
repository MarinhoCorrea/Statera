import { Router } from "express";
import { PostDoacao } from "../controllers/doacaoController.js";

const router = Router();

// POST /doacoes
router.post("/doacoes", PostDoacao);

export default router;
