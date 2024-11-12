const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const { Placa, Registro } = require('../models');
const { sendAlertEmail } = require('../services/mailService');

const fetchAndSaveData = async () => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwdm9KzeB2_icRBjobv3eJzrbpikl8CRtw4mQ5MeYy9Xm_3AnoHm_98A2BpJFtKINLLMA/exec');
        if (!response.ok) {
            throw new Error(`Error al obtener datos de Google Sheets: ${response.statusText}`);
        }
        const data = await response.json();

        console.log("Datos recibidos de la API de Google:", data);

        const distancia = parseFloat(data.distancia);
        const porcentaje = ((20 - distancia) / 15) * 100; // Calcular el porcentaje de llenado

        // Validar que el porcentaje sea positivo
        if (porcentaje < 0) {
            console.log('Porcentaje negativo, registro descartado');
            return;
        }

        // Crear la fecha en la zona horaria de Buenos Aires y ajustar a medianoche
        const fecha = moment().tz('America/Argentina/Buenos_Aires').subtract(3, 'hours').toDate();

        // Suponiendo que tienes una placa con id 1
        const placaId = 1;

        await Registro.create({
            distancia: distancia,
            porcentaje: porcentaje,
            fecha: fecha,
            placaId: placaId
        });

        // Verificar si el porcentaje es mayor o igual a 90%
        if (porcentaje >= 90) {
            console.log('Porcentaje crítico detectado:', porcentaje);
            try {
                await sendAlertEmail(placaId, porcentaje.toFixed(2));
                console.log('Email de alerta enviado con éxito');
            } catch (emailError) {
                console.error('Error al enviar el email de alerta:', emailError);
            }
        }

        console.log('Datos guardados en la base de datos');
    } catch (error) {
        console.error('Error al obtener datos o guardar en la base de datos:', error);
    }
};

router.get('/datos-sheet', async (req, res) => {
    try {
        await fetchAndSaveData();
        const allRecords = await Registro.findAll();
        res.status(200).json(allRecords); 
    } catch (error) {
        console.error('Error al obtener datos o guardar en la base de datos:', error);
        res.status(500).json({ error: `Error al obtener datos o guardar en la base de datos: ${error.message}` });
    }
});

module.exports = { router, fetchAndSaveData };