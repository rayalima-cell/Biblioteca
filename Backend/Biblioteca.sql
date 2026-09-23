create database biblioteca_api;
use biblioteca_api;

create table livros(
	id_livro int auto_increment primary key,
    titulo varchar(50) not null,
    autor varchar(50) not null,
    isbn varchar(50) not null,
    ano_publicacao int,
    categoria varchar(50),
    quantidade int not null
);

create table usuarios(
	id_usuario int auto_increment primary key,
    nome varchar(50) not null,
    cpf varchar(20) not null,
    email varchar(50) not null,
    telefone varchar(50)
);

create table emprestismos(
	id_emprestimo int auto_increment primary key,
    livro_id int not null,
    usuario_id int not null,
    data_emprestimo date not null,
    data_prevista_devolucao date not null,
    data_devolucao date,
    status varchar(30) not null,
    
    foreign key (livro_id) references livros(id_livro),
    foreign key (usuario_id) references usuarios(id_usuario)
);

INSERT INTO livros
(titulo, autor, isbn, ano_publicacao, categoria, quantidade)
VALUES
('Dom Casmurro', 'Machado de Assis', '978000000001', 1899, 'Romance', 3),
('O Hobbit', 'J. R. R. Tolkien', '978000000002', 1937, 'Fantasia', 5),
('1984', 'George Orwell', '978000000003', 1949, 'Ficção', 4);

INSERT INTO usuarios
(nome, cpf, email, telefone)
VALUES
("Ray Aryel", "62892035333", "rayaryel@1404.com.br", "86958637"),
("Isa Chapini", "7485963214", "isa@gmail.com.br", "12365478"),
("Miriã", "78965478", "miria@gmail.com.br", "01243569785");

select * from livros;
select * from usuarios;