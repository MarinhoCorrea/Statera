import express from 'express';
import { GetAnimals, PostAnimal } from '../controllers/animalController.js'; 
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';


const router = express.Router();


router.get('/', GetAnimals);
router.post('/', PostAnimal);

export default router;