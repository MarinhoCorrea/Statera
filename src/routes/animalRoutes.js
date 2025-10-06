import express from 'express';
import { GetAnimals, PostAnimal } from '../controllers/animalController.js'; 


const router = express.Router();


router.get('/', GetAnimals);
router.post('/', PostAnimal);

export default router;