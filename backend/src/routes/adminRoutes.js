import express from 'express';
import { GetAnimaisAdmin, GetAnimalByIdAdmin, PatchAnimalAdmin, DeleteAnimalAdmin } from '../controllers/adminController.js';
import verifyToken from '../middlewares/verifyToken.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.use(verifyToken, isAdmin);

router.get('/animais', GetAnimaisAdmin);
router.patch('/animais/:id', PatchAnimalAdmin);
router.get('/:id', GetAnimalByIdAdmin);
router.delete('/animais/:id', DeleteAnimalAdmin);


export default router;