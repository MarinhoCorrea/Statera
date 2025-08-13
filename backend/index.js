import app from './server.js';

const port = process.env.port || 5000;

app.listen(port, '0,0,0,0', () => {
    console.log("Servidor rodando na porta ${port}");
});