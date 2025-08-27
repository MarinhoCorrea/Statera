import express from 'express';
import { GetAnimals } from '../controllers/animalController'; 

const router = express.Router();


router.get('/animais', GetAnimals);

export default router;