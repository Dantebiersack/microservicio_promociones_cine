const express = require('express');
const promocionesRoutes = require('./routes/promociones');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/api/promociones', promocionesRoutes);

app.listen(PORT, () => {
    console.log(`Microservicio corriendo en http://localhost:${PORT}/api/promociones`);
});
