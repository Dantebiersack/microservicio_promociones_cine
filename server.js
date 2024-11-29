const cors = require('cors');
const express = require('express');
const promocionesRoutes = require('./routes/promociones');
require('dotenv').config();

const app = express();

// Configuración de CORS
app.use(cors({
    origin: '*', // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/promociones', promocionesRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
