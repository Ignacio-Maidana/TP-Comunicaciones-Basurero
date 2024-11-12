const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's49989962@gmail.com',
        pass: 'eqfi rfkq eyjh kcol'
    }
});

const sendAlertEmail = async (containerId, porcentaje) => {
    try {
        const mailOptions = {
            from: 's49989962@gmail.com',
            to: '45089726@ddvs.edu.ar',
            subject: '¡Alerta de Contenedor Casi Lleno!',
            html: `
                <h1>Alerta de Nivel de Llenado</h1>
                <p>El contenedor N° ${containerId} ha alcanzado un ${porcentaje}% de su capacidad.</p>
                <p>Por favor, programe su recolección.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error detallado al enviar el correo:', error);
        throw error; // Relanzar el error para manejarlo en el llamador
    }
};

    // Verificar la conexión al iniciar el servicio
    transporter.verify(function(error, success) {
        if (error) {
            console.error('Error en la configuración del servicio de correo:', error);
        } else {
            console.log('Servidor de correo listo para enviar mensajes');
        }
});

module.exports = { sendAlertEmail };