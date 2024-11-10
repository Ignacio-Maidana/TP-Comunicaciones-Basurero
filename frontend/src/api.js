const API_URL = 'http://localhost:3001/api/bins';

export const getAllBins = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching bins');
  }
  return response.json();
};

export const addBin = async (binData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(binData),
  });
  if (!response.ok) {
    throw new Error('Error adding bin');
  }
  return response.json();
};

export const updateBin = async (id, data) => {
  const binData = {
    tipo: data.tipo,
    ubicacion: data.ubicacion,
    estado: data.estado
  };

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(binData)
  });

  if (!response.ok) {
    throw new Error('Error updating bin');
  }

  return response.json();
};

export const deleteBin = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting bin');
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json(); 
  } else {
    return {};
  }
};

export const getWeeklyData = async (id) => {
  const response = await fetch(`${API_URL}/${id}/weekly`);
  if (!response.ok) {
    throw new Error('Error fetching weekly data');
  }
  return response.json();
};

export const getMonthlyData = async (id) => {
  const response = await fetch(`${API_URL}/${id}/monthly`);
  if (!response.ok) {
    throw new Error('Error fetching monthly data');
  }
  return response.json();
};

export const fetchSensorData = async () => {
  const response = await fetch('https://script.google.com/macros/s/AKfycbxoi58HkA9aeHgq8kxG8LcugHObYxH7MD0B7n0C2w256tIRu9ZpSsRcav2u8Jr8yVwB4g/exec');
  if (!response.ok) {
    throw new Error('Error fetching sensor data');
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

export const saveSensorData = async () => {
  try {
    const sensorData = await fetchSensorData();
    console.log('Datos del sensor a enviar:', JSON.stringify(sensorData, null, 2));
    const response = await fetch('http://localhost:3001/api/bins/sensor-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensorData),
    });
    if (!response.ok) {
      throw new Error('Error guardando datos del sensor');
    }
    console.log('Datos del sensor guardados exitosamente');
  } catch (error) {
    console.error('Error:', error);
  }
};