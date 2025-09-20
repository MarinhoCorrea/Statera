const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'statera.db');


const db = new sqlite3.Database(dbPath, (erro) => {
    if (erro) {
        console.log("Falha ao inicializar o banco de dados", erro.message);
        
    } 
    else {
        console.log("Sucesso ao inicializar o banco de dados!");
    }
    return;
});

module.exports = db;
