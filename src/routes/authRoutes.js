import express from 'express';
import { PostLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/', PostLogin); 


export default router;