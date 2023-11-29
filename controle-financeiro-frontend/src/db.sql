CREATE DATABASE controle_financeiro;
USE controle_financeiro;

CREATE TABLE proventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  valor_disponivel DECIMAL(10, 2),
  mes INT,
  ano INT
);

CREATE TABLE gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  preco DECIMAL(10, 2),
  data DATE
);
