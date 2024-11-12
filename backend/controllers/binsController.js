// controllers/binsController.js
const { Bin } = require('../models');
const axios = require('axios');
const Sequelize = require('sequelize');



const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQneu5Gq-KmX3MrdGiuecPZgowfpvTE-wX73yHVEGFiTQx-KoQSWdo13DCMsoCvMS3zrzpsphZeiSXT/pub?gid=0&single=true&output=csv';

// Función para calcular el porcentaje de llenado
const calcularPorcentajeLlenado = (distancia, alturaMaxima = 30) => {
  const porcentaje = ((alturaMaxima - distancia) / alturaMaxima) * 100;
  return Math.min(Math.max(porcentaje, 0), 100);
};

// Función para sincronizar datos con Google Sheets y limpiar registros obsoletos
// Función para sincronizar datos con Google Sheets
const sincronizarDatosConSheet = async () => {
  try {
    const response = await axios.get(`${GOOGLE_SHEET_CSV_URL}&cachebuster=${Date.now()}`);
    const rows = response.data.split('\n').slice(1); // Omite la cabecera

    const nuevosSensorIds = [];
    const sheetDataPromises = rows.map(async (row) => {
      const [fecha, sensorId, distanciaPromedio] = row.split(',');

      // Validar cada valor y omitir filas incompletas o inválidas
      if (!fecha || !sensorId || !distanciaPromedio || isNaN(sensorId) || isNaN(distanciaPromedio)) {
        console.warn(`Fila inválida ignorada: ${row}`);
        return null;
      }

      const parsedFecha = new Date(Date.parse(fecha));
      if (isNaN(parsedFecha)) {
        console.warn(`Fecha inválida: ${fecha}`);
        return null;
      }

      const parsedSensorId = parseInt(sensorId);
      nuevosSensorIds.push(parsedSensorId);
      const porcentajeLlenado = calcularPorcentajeLlenado(parseFloat(distanciaPromedio));

      // Buscar el registro existente
      const existingBin = await Bin.findOne({ where: { sensorId: parsedSensorId } });
      if (existingBin) {
        // Actualizar registro existente
        return existingBin.update({
          fecha: parsedFecha,
          distanciaPromedio: parseFloat(distanciaPromedio),
          porcentajeLlenado,
        });
      } else {
        // Crear nuevo registro si no existe
        return Bin.create({
          fecha: parsedFecha,
          sensorId: parsedSensorId,
          distanciaPromedio: parseFloat(distanciaPromedio),
          porcentajeLlenado,
        });
      }
    });

    await Promise.all(sheetDataPromises.filter(p => p !== null));

    // Eliminar registros obsoletos
    await Bin.destroy({
      where: {
        sensorId: {
          [Sequelize.Op.notIn]: nuevosSensorIds,
        },
      },
    });

    console.log('Datos sincronizados correctamente y registros obsoletos eliminados.');
  } catch (error) {
    console.error('Error al sincronizar los datos:', error);
  }
};




exports.binCreate = async (req, res) => {
  await sincronizarDatosConSheet();
  res.json({ message: 'Datos sincronizados correctamente.' });
};

exports.binFindData = async (req, res) => {
  try {
    const data = await Bin.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

exports.sincronizarDatosConSheet = sincronizarDatosConSheet;
