const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todas las promociones
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM promocion_dulceria WHERE estatus = 1`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las promociones' });
    }
});


// Crear una nueva promoción
router.post('/', async (req, res) => {
    const { descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO promocion_dulceria (descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus) VALUES (?, ?, ?, ?, ?, ?)',
            [descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la promoción' });
    }
});

// Actualizar una promoción
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el id desde la URL
    const { descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!descripcion || !fecha_inicio || !fecha_fin || !id_producto_fk || porcentaje_descuento === undefined || estatus === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await pool.query(
            `UPDATE promocion_dulceria 
             SET descripcion = ?, fecha_inicio = ?, fecha_fin = ?, id_producto_fk = ?, porcentaje_descuento = ?, estatus = ?
             WHERE id_promocion = ?`,
            [descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }

        res.json({ message: 'Promoción actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la promoción' });
    }
});

// Eliminar una promoción
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Obtiene el id desde la URL

    try {
        const [result] = await pool.query(
            `UPDATE promocion_dulceria 
             SET estatus = 0 
             WHERE id_promocion = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }

        res.json({ message: 'Promoción eliminada lógicamente (estatus = 0)' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la promoción' });
    }
});


module.exports = router;
