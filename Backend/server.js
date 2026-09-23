const express = require('express');
const cors = require('cors');
const banco = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const PORTA = 3000;

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API da Biblioteca funcionando!'
    });
});

// LISTAR LIVROS
app.get('/livros', (req, res) => {

    const sql = 'SELECT * FROM livros';

    banco.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: 'Erro ao consultar os livros'
            });
        }

        res.json(resultados);
    });
});

// CONSULTAR LIVRO POR ID
app.get('/livros/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM livros WHERE id = ?';

    banco.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: 'Erro ao consultar o livro'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensagem: 'Livro não encontrado'
            });
        }

        res.json(resultados[0]);
    });
});

// CADASTRAR LIVRO
app.post('/livros', (req, res) => {

    const { titulo, autor, isbn, ano_publicacao, categoria, quantidade } = req.body;

    const sql = `
        INSERT INTO livros
        (titulo, autor, isbn, ano_publicacao, categoria, quantidade)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        titulo,
        autor,
        isbn,
        ano_publicacao,
        categoria,
        quantidade
    ];

    banco.query(sql, valores, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                erro: 'Erro ao cadastrar livro'
            });
        }

        res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
});

// INICIAR SERVIDOR
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});