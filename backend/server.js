const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const { sequelize } = require('./models');
const { router: registroRoutes, fetchAndSaveData } = require('./routes/registro');
const placaRoutes = require('./routes/placa');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
}));

app.use(bodyParser.json());

app.use('/api/basurero', registroRoutes);
app.use('/api/placa', placaRoutes);

// Configurar el cron job para que se ejecute cada 10 segundos
cron.schedule('*/10 * * * * *', fetchAndSaveData);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada con estructura actualizada');
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    })
    .catch(error => console.error('Error al sincronizar la base de datos:', error));