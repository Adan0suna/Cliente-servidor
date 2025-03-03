const Ruta = require('../models/Ruta');

exports.getRutas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll();
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rutas' });
  }
};

exports.createRuta = async (req, res) => {
  try {
    const ruta = await Ruta.create(req.body);
    res.status(201).json(ruta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ruta' });
  }
};