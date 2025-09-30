import { Router } from "express";
import { PostDoacao } from "../controllers/doacaoController.js";

const router = Router();

router.post("/", PostDoacao);

export default router;
