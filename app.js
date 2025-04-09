require("dotenv").config();
const express = require("express");
const cors = require("cors"); // CSRF
const mongoose = require('mongoose');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const purchasesRoutes = require("./routes/purchasesRoutes");

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bank_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error conectando a MongoDB:', err);
});

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/purchase", purchasesRoutes);

// Usar las rutas
app.use('/api', accountRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;