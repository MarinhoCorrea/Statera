import express from 'express';
import { GetAnimals, PostAnimal } from '../controllers/animalController.js'; 
import { GetAnimalByIdAdmin } from '../controllers/adminController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';


const router = express.Router();


router.get('/', GetAnimals);
router.post('/', PostAnimal);
router.get('/:id', verifyToken, isAdmin, GetAnimalByIdAdmin);

export default router;