const { Bin } = require('../models/bin');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.binCreate = async (req, res) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxoi58HkA9aeHgq8kxG8LcugHObYxH7MD0B7n0C2w256tIRu9ZpSsRcav2u8Jr8yVwB4g/exec');
        const data = await response.json();
    
        console.log("Datos recibidos de la API de Google:", data);
    
        for (let bin of data) {
            const fecha = new Date(bin.fecha);
            const distanciaPromedio = parseFloat(bin.distancia);
    
            const existingRecord = await Bin.findOne({
            where: { fecha: fecha }
            });
    
            if (existingRecord) {
            await existingRecord.update({ distancia: distanciaPromedio });
            } else {
            await Bin.create({
                distancia: distanciaPromedio,
                fecha: fecha
            });
            }
        }
        const allRecords = await Bin.findAll();
        res.status(200).json(allRecords); 
        } catch (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ error: 'Error al obtener datos o guardar en la base de datos' });
        }
};