const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const destinoRoutes = require('./routes/destinoRoutes');
const rutaRoutes = require('./routes/rutaRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/destinos', destinoRoutes);
app.use('/rutas', rutaRoutes);
app.use('/eventos', eventoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }) // Solo en desarrollo
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => console.log('Error al conectar a la DB:', err));