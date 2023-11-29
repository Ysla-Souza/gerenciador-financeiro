// controllers/gastoController.js
const mysql = require('mysql2/promise');
const GastoModel = require('../models/gastoModel');
const ProventoController = require('./proventoController');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'financeiro'
});

class GastoController {
    static async cadastrarGasto(req, res) {
        try {
          const { nome, preco, data } = req.body;
          const gasto = new GastoModel(nome, preco, data);
      
          await connection.execute(
            'INSERT INTO gastos (nome, preco, data) VALUES (?, ?, ?)',
            [gasto.nome, gasto.preco, format(new Date(gasto.data), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")]
          );
      
          // Atualizar o valor disponível subtraindo o preço do gasto
          const proventoAtualizado = await ProventoController.atualizarValorDisponivel(gasto.preco);
      
          res.status(201).json({ gasto, proventoAtualizado });
        } catch (error) {
          console.error('Erro ao cadastrar gasto:', error);
          res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }

  static async obterTodosGastos(req, res) {
    try {
      const [results] = await connection.execute('SELECT * FROM gastos');
      res.status(200).json(results);
    } catch (error) {
      console.error('Erro ao obter gastos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async editarGasto(req, res) {
    try {
      const { nome, preco, data } = req.body;
      const gastoId = req.params.id;

      await connection.execute(
        'UPDATE gastos SET nome=?, preco=?, data=? WHERE id=?',
        [nome, preco, data, gastoId]
      );

      const [result] = await connection.execute('SELECT * FROM gastos WHERE id=?', [gastoId]);
      const gastoAtualizado = result[0];

      res.status(200).json(gastoAtualizado);
    } catch (error) {
      console.error('Erro ao editar gasto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async excluirGasto(req, res) {
    try {
      const gastoId = req.params.id;

      await connection.execute('DELETE FROM gastos WHERE id=?', [gastoId]);

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir gasto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = GastoController;
