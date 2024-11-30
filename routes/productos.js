const express = require('express');
const router = express.Router();
const pool = require('../db');

// Rutas de promociones
router.get('/', async (req, res) => {
    try {
        const [promociones] = await pool.query(
            `SELECT p.id_promocion, p.descripcion, p.fecha_inicio, p.fecha_fin, p.porcentaje_descuento, p.id_producto_fk, pr.nombre_producto
             FROM promocion_dulceria p
             INNER JOIN producto pr ON p.id_producto_fk = pr.producto_id
             WHERE p.estatus = 1`
        );
        res.json(promociones);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las promociones' });
    }
});

// Rutas de productos
router.get('/productos', async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT producto_id, nombre_producto FROM producto WHERE estatus = 1');
        res.json(productos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

module.exports = router;
