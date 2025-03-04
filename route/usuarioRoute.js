const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const POCKETBASE_URL = process.env.POCKETBASE_URL;

router.post('/registrar', async (req, res) => {
  console.log('Datos recibidos para registrar:', req.body); // Para depurar
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/users/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al registrar');
    res.status(201).json({ mensaje: 'Usuario registrado', id: data.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  console.log('Datos recibidos para login:', req.body); // Para depurar
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/users/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identity: req.body.email,
        password: req.body.password
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Credenciales inválidas');
    res.json({ token: data.token, usuario: data.record });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;