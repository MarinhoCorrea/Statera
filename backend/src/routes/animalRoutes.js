import express from 'express';
import { GetAnimalsController, CreateAnimalController } from '../controllers/animalController'; 

const router = express.Router();

router.get('/animais', GetAnimalsController);

router.post('/animais', CreateAnimalController); 

export default animalRoutes;