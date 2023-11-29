const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const proventoRoutes = require('./routes/proventoRoutes');
const gastoRoutes = require('./routes/gastoRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(proventoRoutes);
app.use(gastoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
