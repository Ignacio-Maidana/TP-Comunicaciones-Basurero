const express = require('express');
const app = express();
const db = require('./config/database');
const binsRoutes = require('./routes/binsRoutes');
const cors = require('cors');

// Middlewares
app.use(cors());  // Enables CORS for all origins (adjust according to your needs)
app.use(express.json()); // Parses the body of requests as JSON

// Routes
app.use('/api/bins', binsRoutes); // This now includes routes for weekly and monthly data

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Sync models with the database and start the server
async function iniciarServidor() {
    try {
        // Force: false means it won't drop tables if they already exist
        await db.sync({ force: false }); 
        console.log('Modelos sincronizados con la base de datos.');

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
}

iniciarServidor();