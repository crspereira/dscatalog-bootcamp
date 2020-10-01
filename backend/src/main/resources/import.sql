//Comando para SEEDING(semear) o Banco H2 toda vez que reiniciar a aplicação

INSERT INTO tb_category (name, created_At) VALUES ('Books', NOW());
INSERT INTO tb_category (name, created_At) VALUES ('Electronics', NOW());
INSERT INTO tb_category (name, created_At) VALUES ('Computers', NOW());
