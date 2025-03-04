require('dotenv').config();
const express = require('express');
const cors = require('cors');
const destinoRoutes = require('./route/destinoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//http://localhost:3000/destinos
app.use('/destinos', destinoRoutes);
//http://localhost:3000/rutas
app.use('/rutas', require('./route/rutaRoutes'));
//http://localhost:3000/eventos
app.use('/eventos', require('./route/eventoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Conectando a PocketBase en: ${process.env.POCKETBASE_URL}`);
});