// backend/controllers/binsController.js
const Bin = require('../models/bins');
const BinHistory = require('../models/BinHistory');
const { Op } = require('sequelize');

// Obtener todos los basureros
exports.getAllBins = async (req, res) => {
    try {
        const bins = await Bin.findAll(); // Fetch all bins
        res.status(200).json(bins);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo basureros', error });
    }
};

// Agregar un nuevo basurero
exports.addBin = async (req, res) => {
    try {
        const newBin = req.body;
        const bin = await Bin.create(newBin); // Create a new bin
        res.status(201).json(bin);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar basurero', error });
    }
};

// Actualizar un basurero existente
exports.updateBin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // Primero actualiza
        await Bin.update(updatedData, {
            where: { id: id }
        });
        
        // Luego obtiene el registro actualizado
        const updatedBin = await Bin.findByPk(id);
        
        if (!updatedBin) {
            return res.status(404).json({ error: "Basurero no encontrado" });
        }
        
        res.status(200).json(updatedBin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un basurero
exports.deleteBin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await Bin.destroy({
            where: { id: id },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Basurero no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener datos semanales de un basurero
exports.getWeeklyData = async (req, res) => {
    try {
        const { id } = req.params;
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weeklyData = await BinHistory.findAll({
            where: {
                binId: id,
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['fecha', 'ASC']]
        });

        const formattedData = {
            labels: weeklyData.map(data => data.fecha.toISOString().split('T')[0]),
            datasets: [{
                label: 'Kg Estimados',
                data: weeklyData.map(data => data.kg_estimados)
            }, {
                label: 'Basura Recolectada',
                data: weeklyData.map(data => data.basura_recolectada)
            }]
        };

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo datos semanales', error });
    }
};

// Obtener datos mensuales de un basurero
exports.getMonthlyData = async (req, res) => {
    try {
        const { id } = req.params;
        const endDate = new Date();
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate());

        const monthlyData = await BinHistory.findAll({
            where: {
                binId: id,
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['fecha', 'ASC']]
        });

        const formattedData = {
            labels: monthlyData.map(data => data.fecha.toISOString().split('T')[0]),
            datasets: [{
                label: 'Kg Estimados',
                data: monthlyData.map(data => data.kg_estimados)
            }, {
                label: 'Basura Recolectada',
                data: monthlyData.map(data => data.basura_recolectada)
            }]
        };

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo datos mensuales', error });
    }
};
// En binsController.js

exports.addHistoryData = async (req, res) => {
    try {
        const { binId, kg_estimados, basura_recolectada, fecha } = req.body;
        const historyData = await BinHistory.create({
            binId,
            kg_estimados,
            basura_recolectada,
            fecha: new Date(fecha)
        });
        res.status(201).json(historyData);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar datos históricos', error: error.message });
    }
};