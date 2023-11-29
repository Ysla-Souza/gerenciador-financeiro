const mysql = require('mysql2/promise');
const ProventoModel = require('../models/proventoModel');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'financeiro'
});

class ProventoController {
  static async cadastrarProvento(req, res) {
    try {
      const { valorDisponivel, mes, ano } = req.body;

      // Verifique se todas as propriedades necessárias estão presentes
      if (valorDisponivel === undefined || mes === undefined || ano === undefined) {
        res.status(400).json({ error: 'Parâmetros inválidos para cadastrar provento' });
        return;
      }

      const provento = new ProventoModel(valorDisponivel, mes, ano);

      const [result] = await connection.execute(
        'INSERT INTO proventos (valor_disponivel, mes, ano) VALUES (?, ?, ?)',
        [provento.valorDisponivel, provento.mes, provento.ano]
      );

      provento.id = result.insertId;

      res.status(201).json(provento);
    } catch (error) {
      console.error('Erro ao cadastrar provento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async obterTodosProventos(req, res) {
    try {
      const [results] = await connection.execute('SELECT * FROM proventos');
      res.status(200).json(results);
    } catch (error) {
      console.error('Erro ao obter proventos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async editarProvento(req, res) {
    try {
      const { valorDisponivel, mes, ano } = req.body;
      const proventoId = req.params.id;

      await connection.execute(
        'UPDATE proventos SET valor_disponivel=?, mes=?, ano=? WHERE id=?',
        [valorDisponivel, mes, ano, proventoId]
      );

      const [result] = await connection.execute('SELECT * FROM proventos WHERE id=?', [proventoId]);
      const proventoAtualizado = result[0];

      res.status(200).json(proventoAtualizado);
    } catch (error) {
      console.error('Erro ao editar provento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async atualizarValorDisponivel(valorGasto) {
    try {
      const [result] = await connection.execute('SELECT * FROM proventos ORDER BY id DESC LIMIT 1');
      const proventoAtual = result[0];

      if (!proventoAtual) {
        throw new Error('Nenhum provento encontrado para atualização');
      }

      const novoValorDisponivel = proventoAtual.valor_disponivel - valorGasto;

      await connection.execute(
        'UPDATE proventos SET valor_disponivel=? WHERE id=?',
        [novoValorDisponivel, proventoAtual.id]
      );

      return { novoValorDisponivel, proventoId: proventoAtual.id };
    } catch (error) {
      console.error('Erro ao atualizar valor disponível:', error);
      throw error;
    }
  }

  static async excluirProvento(req, res) {
    try {
      const proventoId = req.params.id;

      await connection.execute('DELETE FROM proventos WHERE id=?', [proventoId]);

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir provento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = ProventoController;
