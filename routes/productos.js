const express = require('express');
const router = express.Router();
const pool = require('../db/connection');


// Obtener productos activos
router.get('/', async (req, res) => {
    try {
        const [productos] = await pool.query(
            'SELECT producto_id, nombre_producto FROM producto WHERE estatus = 1'
        );
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

module.exports = router;
