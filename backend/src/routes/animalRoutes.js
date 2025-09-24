import express from 'express';
import { GetAnimals,CreateAnimalController } from '../controllers/animalController.js'; 

const router = express.Router();


router.get('/', GetAnimals);
router.post('/', CreateAnimalController); 

export default router;