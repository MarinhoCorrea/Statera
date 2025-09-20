import express from 'express';

const app = express();
const port = process.env.PORT || 5000; 
await sequelize.sync();

app.listen(port, () => { 
    console.log(`Servidor rodando na porta ${port}`); 
});