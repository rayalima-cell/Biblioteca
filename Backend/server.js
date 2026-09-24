const express = require('express');
const cors = require('cors');
const banco = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const PORTA = 3025;
// LIVROS

app.get('/livros', (req, res) => {
    banco.query('SELECT * FROM livros', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.json(resultado);
    });
});

app.get('/livros/:id', (req, res) => {
    banco.query(
        'SELECT * FROM livros WHERE id = ?',
        [req.params.id],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json(resultado[0]);
        }
    );
});

app.get('/livros/busca/:titulo', (req, res) => {
    banco.query(
        'SELECT * FROM livros WHERE titulo LIKE ?',
        [`%${req.params.titulo}%`],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json(resultado);
        }
    );
});

app.get('/livros/ordenados', (req, res) => {
    banco.query(
        'SELECT * FROM livros ORDER BY titulo',
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json(resultado);
        }
    );
});

app.post('/livros', (req, res) => {
    const { titulo, autor, isbn, ano_publicacao, categoria, quantidade } = req.body;

    banco.query(
        `INSERT INTO livros
        (titulo, autor, isbn, ano_publicacao, categoria, quantidade)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [titulo, autor, isbn, ano_publicacao, categoria, quantidade],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });

            res.status(201).json({
                mensagem: 'Livro cadastrado!',
                id: resultado.insertId
            });
        }
    );
});

app.put('/livros/:id', (req, res) => {
    const { titulo, autor, isbn, ano_publicacao, categoria, quantidade } = req.body;

    banco.query(
        `UPDATE livros SET
        titulo=?, autor=?, isbn=?, ano_publicacao=?, categoria=?, quantidade=?
        WHERE id=?`,
        [titulo, autor, isbn, ano_publicacao, categoria, quantidade, req.params.id],
        (erro) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json({ mensagem: 'Livro atualizado!' });
        }
    );
});

app.delete('/livros/:id', (req, res) => {
    banco.query(
        'DELETE FROM livros WHERE id = ?',
        [req.params.id],
        (erro) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json({ mensagem: 'Livro excluído!' });
        }
    );
});


// USUÁRIOS

app.get('/usuarios', (req, res) => {
    banco.query('SELECT * FROM usuarios', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.json(resultado);
    });
});

app.get('/usuarios/:id', (req, res) => {
    banco.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [req.params.id],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json(resultado[0]);
        }
    );
});

app.post('/usuarios', (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    banco.query(
        `INSERT INTO usuarios (nome, cpf, email, telefone)
         VALUES (?, ?, ?, ?)`,
        [nome, cpf, email, telefone],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });

            res.status(201).json({
                mensagem: 'Usuário cadastrado!',
                id: resultado.insertId
            });
        }
    );
});

app.put('/usuarios/:id', (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    banco.query(
        `UPDATE usuarios SET nome=?, cpf=?, email=?, telefone=?
         WHERE id=?`,
        [nome, cpf, email, telefone, req.params.id],
        (erro) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json({ mensagem: 'Usuário atualizado!' });
        }
    );
});

app.delete('/usuarios/:id', (req, res) => {
    banco.query(
        'DELETE FROM usuarios WHERE id = ?',
        [req.params.id],
        (erro) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json({ mensagem: 'Usuário excluído!' });
        }
    );
});


// EMPRÉSTIMOS

app.get('/emprestimos', (req, res) => {
    banco.query('SELECT * FROM emprestimos', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: erro.message });
        res.json(resultado);
    });
});

app.get('/emprestimos/:id', (req, res) => {
    banco.query(
        'SELECT * FROM emprestimos WHERE id = ?',
        [req.params.id],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json(resultado[0]);
        }
    );
});

app.post('/emprestimos', (req, res) => {
    const {
        livro_id,
        usuario_id,
        data_emprestimo,
        data_prevista_devolucao
    } = req.body;

    banco.query(
        `INSERT INTO emprestimos
        (livro_id, usuario_id, data_emprestimo, data_prevista_devolucao, status)
        VALUES (?, ?, ?, ?, 'Emprestado')`,
        [livro_id, usuario_id, data_emprestimo, data_prevista_devolucao],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: erro.message });

            res.status(201).json({
                mensagem: 'Empréstimo registrado!',
                id: resultado.insertId
            });
        }
    );
});

app.put('/emprestimos/:id', (req, res) => {
    const { data_devolucao, status } = req.body;

    banco.query(
        `UPDATE emprestimos
         SET data_devolucao=?, status=?
         WHERE id=?`,
        [data_devolucao, status, req.params.id],
        (erro) => {
            if (erro) return res.status(500).json({ erro: erro.message });
            res.json({ mensagem: 'Empréstimo atualizado!' });
        }
    );
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em ${PORTA}`);
});