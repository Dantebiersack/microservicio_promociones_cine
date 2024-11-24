const express = require('express');
const promocionesRoutes = require('./routes/promociones');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/promociones', promocionesRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000; // Vercel establece el puerto automáticamente
app.listen(PORT, () => {
    console.log(`Microservicio corriendo en el puerto ${PORT}`);
});
