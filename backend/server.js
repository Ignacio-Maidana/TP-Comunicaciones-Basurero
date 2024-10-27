const express = require('express');
const app = express();
const db = require('./config/database');
const binsRoutes = require('./routes/binsRoutes');
const cors = require('cors');

// Middlewares
app.use(cors());  // Enables CORS for all origins (adjust according to your needs)
app.use(express.json()); // Parses the body of requests as JSON

// Routes
app.use('/api/bins', binsRoutes); // Adjusted route prefix to match your controller's functionality

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Sync models with the database and start the server
async function iniciarServidor() {
    try {
        await db.sync(); // Creates the tables if they do not exist
        console.log('Modelos sincronizados con la base de datos.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
}

iniciarServidor();
