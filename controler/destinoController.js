const Destino = require('../models/Destino');

exports.getDestinos = async (req, res) => {
  try {
    const destinos = await Destino.findAll();
    res.json(destinos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener destinos' });
  }
};

exports.createDestino = async (req, res) => {
  try {
    const destino = await Destino.create(req.body);
    res.status(201).json(destino);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear destino' });
  }
};

exports.buscarDestinos = async (req, res) => {
  const { query, tipo } = req.query;
  try {
    const destinos = await Destino.findAll({
      where: {
        ...(query && { nombre: { [Op.iLike]: `%${query}%` } }),
        ...(tipo && { tipo })
      }
    });
    res.json(destinos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar destinos' });
  }
};