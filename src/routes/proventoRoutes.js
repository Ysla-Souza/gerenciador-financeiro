const express = require('express');
const ProventoController = require('../controllers/proventoController');

const router = express.Router();

router.post('/proventos', ProventoController.cadastrarProvento);
router.get('/proventos', ProventoController.obterTodosProventos);
router.put('/proventos/:id', ProventoController.editarProvento);
router.delete('/proventos/:id', ProventoController.excluirProvento);

module.exports = router;
