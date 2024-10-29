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
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error updating bin');
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return {}; // Retorna un objeto vacío si la respuesta no tiene JSON
  }
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
    const response = await fetch(`${API_URL}/bins/${id}/weekly`);
    if (!response.ok) {
      throw new Error('Error fetching weekly data');
    }
    return response.json();
  };
  
  export const getMonthlyData = async (id) => {
    const response = await fetch(`${API_URL}/bins/${id}/monthly`);
    if (!response.ok) {
      throw new Error('Error fetching monthly data');
    }
    return response.json();
  };