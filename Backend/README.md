# API REST — Sistema de Biblioteca

## Objetivo

Desenvolver uma API REST para gerenciamento de uma biblioteca, permitindo controlar livros, usuários e empréstimos.

## Tecnologias utilizadas

* Node.js
* Express
* MySQL
* CORS
* JavaScript
* Git e GitHub
* Postman/Thunder Client para testes

## Requisitos funcionais

O sistema possui funcionalidades para:

* Cadastrar livros
* Listar livros
* Consultar livros por ID
* Pesquisar livros pelo título
* Ordenar livros
* Editar livros
* Excluir livros
* Cadastrar usuários
* Listar usuários
* Consultar usuários por ID
* Editar usuários
* Excluir usuários
* Registrar empréstimos
* Consultar empréstimos
* Registrar devoluções

## Estrutura do projeto

```text
biblioteca-api/
└── backend/
    ├── server.js
    ├── db.js
    ├── banco.sql
    ├── package.json
    ├── package-lock.json
    ├── requisitos-funcionais.md
    ├── modelo_logico.pdf
    └── README.md
```

## Banco de dados

O sistema utiliza o MySQL.

O banco de dados possui três tabelas principais:

### Livros

* id
* titulo
* autor
* isbn
* ano_publicacao
* categoria
* quantidade

### Usuários

* id
* nome
* cpf
* email
* telefone

### Empréstimos

* id
* livro_id
* usuario_id
* data_emprestimo
* data_prevista_devolucao
* data_devolucao
* status

As tabelas `livros` e `usuarios` possuem relacionamento com a tabela `emprestimos`.

## Como configurar

### 1. Criar o banco de dados

Abra o MySQL e execute o arquivo:

```text
banco.sql
```

Ele criará o banco de dados, as tabelas e alguns dados para testes.

### 2. Configurar a conexão

No arquivo `db.js`, informe os dados do seu MySQL:

```javascript
const mysql = require('mysql2');

const banco = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SUA_SENHA',
    database: 'biblioteca'
});

module.exports = banco;
```

### 3. Instalar as dependências

No terminal do VS Code, dentro da pasta `backend`, execute:

```bash
npm install
```

### 4. Executar o servidor

Execute:

```bash
node server.js
```

A API ficará disponível em:

```text
http://localhost:3000
```

# Rotas da API

## Livros

| Método | Rota                    | Função                      |
| ------ | ----------------------- | --------------------------- |
| GET    | `/livros`               | Lista todos os livros       |
| GET    | `/livros/:id`           | Consulta um livro           |
| GET    | `/livros/busca/:titulo` | Pesquisa livros pelo título |
| GET    | `/livros/ordenados`     | Lista livros ordenados      |
| POST   | `/livros`               | Cadastra um livro           |
| PUT    | `/livros/:id`           | Edita um livro              |
| DELETE | `/livros/:id`           | Exclui um livro             |

## Usuários

| Método | Rota            | Função                  |
| ------ | --------------- | ----------------------- |
| GET    | `/usuarios`     | Lista todos os usuários |
| GET    | `/usuarios/:id` | Consulta um usuário     |
| POST   | `/usuarios`     | Cadastra um usuário     |
| PUT    | `/usuarios/:id` | Edita um usuário        |
| DELETE | `/usuarios/:id` | Exclui um usuário       |

## Empréstimos

| Método | Rota               | Função                          |
| ------ | ------------------ | ------------------------------- |
| GET    | `/emprestimos`     | Lista os empréstimos            |
| GET    | `/emprestimos/:id` | Consulta um empréstimo          |
| POST   | `/emprestimos`     | Registra um empréstimo          |
| PUT    | `/emprestimos/:id` | Atualiza o empréstimo/devolução |

# Exemplos de requisições

## Cadastrar livro

**POST**

```text
http://localhost:3000/livros
```

```json
{
    "titulo": "O Hobbit",
    "autor": "J.R.R. Tolkien",
    "isbn": "978000000001",
    "ano_publicacao": 1937,
    "categoria": "Fantasia",
    "quantidade": 5
}
```

## Cadastrar usuário

**POST**

```text
http://localhost:3000/usuarios
```

```json
{
    "nome": "João Silva",
    "cpf": "111.111.111-11",
    "email": "joao@email.com",
    "telefone": "47999999999"
}
```

## Registrar empréstimo

**POST**

```text
http://localhost:3000/emprestimos
```

```json
{
    "livro_id": 1,
    "usuario_id": 1,
    "data_emprestimo": "2026-09-24",
    "data_prevista_devolucao": "2026-10-01"
}
```

## Registrar devolução

**PUT**

```text
http://localhost:3000/emprestimos/1
```

```json
{
    "data_devolucao": "2026-09-30",
    "status": "Devolvido"
}
```

## Testes

As rotas da API podem ser testadas utilizando:

* Postman
* Insomnia
* Thunder Client

Foram realizados testes de cadastro, consulta, pesquisa, alteração, exclusão, empréstimo e devolução.

## GitHub

O projeto foi desenvolvido utilizando Git para controle de versão e será disponibilizado em um repositório próprio no GitHub.