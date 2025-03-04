const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Instala con `npm install node-fetch`

const POCKETBASE_URL = process.env.POCKETBASE_URL;

// Listar destinos
router.get('/', async (req, res) => {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/destinos/records`);
    const data = await response.json();
    res.json(data.items); // PocketBase devuelve los registros en "items"
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener destinos' });
  }
});

// Crear un destino
router.post('/', async (req, res) => {
    console.log('Datos recibidos en Express:', req.body); // Para depurar
    try {
      const response = await fetch(`${POCKETBASE_URL}/api/collections/destinos/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en PocketBase');
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

module.exports = router;