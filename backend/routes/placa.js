const express = require('express');
const router = express.Router();
const { Placa, Registro } = require('../models');
const moment = require('moment-timezone');
const { sendAlertEmail } = require('../services/mailService');

// Ruta para obtener todas las placas con sus registros
router.get('/', async (req, res) => {
    try {
        const placas = await Placa.findAll({
            include: [{
                model: Registro,
                as: 'registros',
                limit: 1,
                order: [['fecha', 'DESC']], // Asegurarse de que obtengamos el registro más reciente
                separate: true // Esto fuerza a Sequelize a hacer una consulta separada para los registros
            }]
        });
        res.status(200).json(placas);
    } catch (error) {
        console.error('Error al obtener las placas:', error);
        res.status(500).json({ error: 'Error al obtener las placas' });
    }
});

// Ruta para obtener los registros de una placa específica
router.get('/:id/registros', async (req, res) => {
    try {
        const registros = await Registro.findAll({
            where: { placaId: req.params.id },
            order: [['fecha', 'DESC']]
        });
        res.status(200).json(registros);
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});

// Ruta para restablecer el porcentaje de llenado a 0
router.post('/:id/reset', async (req, res) => {
    try {
        const fecha = moment().tz('America/Argentina/Buenos_Aires').subtract(3, 'hours').toDate();
        await Registro.create({
            distancia: 20,
            porcentaje: 0,
            fecha: fecha,
            placaId: req.params.id
        });
        res.status(200).json({ message: 'Porcentaje de llenado restablecido a 0' });
    } catch (error) {
        console.error('Error al restablecer el porcentaje de llenado:', error);
        res.status(500).json({ error: 'Error al restablecer el porcentaje de llenado' });
    }
});

// Ruta para obtener la última lectura
router.post('/:id/last-reading', async (req, res) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwdm9KzeB2_icRBjobv3eJzrbpikl8CRtw4mQ5MeYy9Xm_3AnoHm_98A2BpJFtKINLLMA/exec');
        if (!response.ok) {
            throw new Error(`Error al obtener datos de Google Sheets: ${response.statusText}`);
        }
        const data = await response.json();

        const distancia = parseFloat(data.distancia);
        const porcentaje = ((20 - distancia) / 15) * 100; // Calcular el porcentaje de llenado

        // Validar que el porcentaje sea positivo
        if (porcentaje < 0) {
            console.log('Porcentaje negativo, registro descartado');
            return res.status(400).json({ error: 'Porcentaje negativo, registro descartado' });
        }

        // Crear la fecha en la zona horaria de Buenos Aires
        const fecha = moment().tz('America/Argentina/Buenos_Aires').subtract(3, 'hours').toDate();

        await Registro.create({
            distancia: distancia,
            porcentaje: porcentaje,
            fecha: fecha,
            placaId: req.params.id
        });

        // Verificar si el porcentaje es mayor o igual a 90%
        if (porcentaje >= 90) {
            await sendAlertEmail(req.params.id, porcentaje.toFixed(2));
        }

        res.status(200).json({ message: 'Última lectura obtenida y guardada' });
    } catch (error) {
        console.error('Error al obtener la última lectura:', error);
        res.status(500).json({ error: 'Error al obtener la última lectura' });
    }
});



// Ruta para crear una placa de ejemplo
router.post('/crear', async (req, res) => {
    try {
        const placa = await Placa.create({ nombre: 'Placa de Ejemplo' });
        res.status(201).json(placa);
    } catch (error) {
        console.error('Error al crear la placa:', error);
        res.status(500).json({ error: 'Error al crear la placa' });
    }
});

module.exports = router;