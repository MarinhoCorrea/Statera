import express from 'express';
const router = express.Router();

// Exemplo de rota só pra testar
router.get('/', (req, res) => {
  res.send('Admin routes funcionando!');
});

export default router;
