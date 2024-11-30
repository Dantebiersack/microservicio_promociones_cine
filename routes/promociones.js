const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener promociones
router.get('/', async (req, res) => {
    try {
        const [promociones] = await pool.query(`
            SELECT 
                p.id_promocion,
                p.descripcion,
                p.fecha_inicio,
                p.fecha_fin,
                p.porcentaje_descuento,
                p.id_producto_fk,
                pr.nombre_producto
            FROM 
                promocion_dulceria p
            INNER JOIN 
                producto pr 
            ON 
                p.id_producto_fk = pr.producto_id
            WHERE 
                p.estatus = 1
        `);
        res.json(promociones); // Enviar las promociones como JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las promociones' });
    }
});

// Crear nueva promoción
router.post('/', async (req, res) => {
    // Verificar si el cuerpo de la solicitud está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío o es inválido.' });
    }

    const { descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento } = req.body;

    // Verificar campos obligatorios
    if (!descripcion || !fecha_inicio || !fecha_fin || !id_producto_fk || !porcentaje_descuento) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO promocion_dulceria (descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, estatus)
             VALUES (?, ?, ?, ?, ?, 1)`,
            [descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento]
        );
        res.json({ id: result.insertId, message: 'Promoción creada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la promoción.' });
    }
});


// Actualizar una promoción
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento } = req.body;
    try {
        const [result] = await pool.query(
            `UPDATE promocion_dulceria
             SET descripcion = ?, fecha_inicio = ?, fecha_fin = ?, id_producto_fk = ?, porcentaje_descuento = ?
             WHERE id_promocion = ?`,
            [descripcion, fecha_inicio, fecha_fin, id_producto_fk, porcentaje_descuento, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Promoción no encontrada' });
        res.json({ message: 'Promoción actualizada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la promoción' });
    }
});

// Eliminar una promoción (lógica)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            `UPDATE promocion_dulceria SET estatus = 0 WHERE id_promocion = ?`,
            [id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Promoción no encontrada' });
        res.json({ message: 'Promoción eliminada lógicamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la promoción' });
    }
});

// Obtener una promoción por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Captura el parámetro ID desde la URL
    try {
        const [rows] = await pool.query(
            'SELECT * FROM promocion_dulceria WHERE id_promocion = ?',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la promoción' });
    }
});


module.exports = router;
