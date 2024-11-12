// server.js
const express = require('express');
const app = express();
const binsRoutes = require('./routes/binsRoutes');
const cors = require('cors');
const { sequelize } = require('./models');
const PORT = 3001;
const { sincronizarDatosConSheet } = require('./controllers/binsController');

app.use(cors());
app.use(express.json());

app.use('/api/bins', binsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

setInterval(sincronizarDatosConSheet, 10000);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(err => console.log('Error al sincronizar Sequelize:', err));
