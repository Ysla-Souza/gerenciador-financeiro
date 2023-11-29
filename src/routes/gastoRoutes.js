const express = require('express');
const GastoController = require('../controllers/gastoController');

const router = express.Router();

router.post('/gastos', GastoController.cadastrarGasto);
router.get('/gastos', GastoController.obterTodosGastos);
router.put('/gastos/:id', GastoController.editarGasto);
router.delete('/gastos/:id', GastoController.excluirGasto);

module.exports = router;
