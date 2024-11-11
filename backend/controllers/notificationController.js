const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Notificacion, Basurero, Empleado } = require('../models');
const cron = require('node-cron');  // Con esto programamos las tareas periódicas
const { Op } = require('sequelize');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com', // Reemplaza con tu correo de Gmail
        pass: 'tu_contraseña_o_contraseña_de_aplicación' // Reemplaza con tu contraseña o contraseña de aplicación        
    }
});

const sendNotificationEmails = async (nivelLlenadoActual, basureroId) => {
    try {
        const mailOptions = {
            from: 'tu_correo@gmail.com', // Remitente
            to: 'destinatario@gmail.com', // Destinatario
            subject: 'Asunto del correo',
            text: `El nivel de llenado del basurero ha alcanzado ${nivelLlenadoActual}%. Por favor, revisa el sistema.`
        };

        await transporter.sendMail(mailOptions);

        await Notificacion.create({
            contenido: `Notificación de llenado: nivel alcanzado ${nivelLlenadoActual}%`,               
            idBasurero: basureroId  
            });
    } catch (error) {
        console.error('Error al enviar correos o registrar notificación:', error);
    }
};

const verificarNivelLlenado = async () => {
    try {
        const limiteLlenado = 85;  
        const ultimoRegistro = await Basurero.findOne({
        order: [['fecha', 'DESC']],  
        });

        if (ultimoRegistro) {
            const nivelLlenado = Math.min(Math.round((ultimoRegistro.distancia_promedio / 32) * 100), 100);

            // Si el nivel de llenado supera el límite, enviamos la notificación
            if (nivelLlenado >= limiteLlenado) {
                await sendNotificationEmails(nivelLlenado, ultimoRegistro.id);
            }
        }
    } catch (error) {
        console.error('Error al verificar el nivel de llenado:', error);
    }
};

// Programar la verificación cada minuto
cron.schedule('* * * * *', verificarNivelLlenado);