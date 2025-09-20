import express from 'express';
import { GetAnimals, CreateAnimalController } from '../controllers/animalController'; 

const router = express.Router();

router.get('/animais', GetAnimals);
router.post('/animais', CreateAnimalController); 

export default router;