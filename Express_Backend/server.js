//File del server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const db = require('./db.js');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pastiRoutes = require('./routes/pastiRoutes');
const allenamentiRoutes = require('./routes/allenamentiRoutes');
const bachecaRoutes = require('./routes/bachecaRoutes');
const errorHandler = require('./middlewares/errorHandler');

//creazione del server Express
//importazioni dei moduli

const app = express();
const port = 3000;
//creazione dell'istanza di express e definizione della porta
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pasti', pastiRoutes);
app.use('/api/allenamenti', allenamentiRoutes);
app.use('/api/bacheca', bachecaRoutes);
//abilitazione del CORS e del body parser per gestire le richieste JSON e URL-encoded
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Benvenuto nel server Express!');
});
//definizione della rotta principale

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
