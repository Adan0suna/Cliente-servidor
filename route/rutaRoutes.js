const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const auth = require('../middleware/auth');

router.get('/', rutaController.getRutas);
router.post('/', auth, rutaController.createRuta);

module.exports = router;