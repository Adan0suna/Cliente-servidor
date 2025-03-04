const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const POCKETBASE_URL = process.env.POCKETBASE_URL;

router.get('/', async (req, res) => {
  console.log('Solicitando lista de eventos'); // Para depurar
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/eventos/records`);
    const data = await response.json();
    res.json(data.items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

router.post('/', async (req, res) => {
  console.log('Datos recibidos para crear evento:', req.body); // Para depurar
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/eventos/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al crear evento');
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;