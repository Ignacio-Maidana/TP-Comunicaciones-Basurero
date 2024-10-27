// backend/controllers/binsController.js
const Bin = require('../models/bins'); // Ensure the import matches the file name

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
        const [updatedCount, updatedBins] = await Bin.update(updatedData, {
            where: { id: id },
            returning: true, // To return the updated instance
        });
        if (updatedCount === 0) {
            res.status(404).json({ error: "Basurero no encontrado" });
        } else {
            res.status(200).json(updatedBins[0]); // Return the updated instance
        }
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
