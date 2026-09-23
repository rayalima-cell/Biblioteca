const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'biblioteca_api'
});

conexao.connect((erro) =>{
    if(erro){
        console.log('Erro ao conectar ao Mysql:', erro);
        return;
    }

    console.log('MySQL conectado com sucesso!');
});

module.exports = conexao;