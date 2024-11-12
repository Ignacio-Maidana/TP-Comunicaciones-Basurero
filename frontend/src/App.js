import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import TrashControl from './pages/TrashControl';
import TrashDetails from './pages/TrashDetails';

function App() {
  const [containers, setContainers] = useState([]);

  const addContainer = async (tipo, ubicacion, sensorId) => {
    try {
        const response = await fetch('http://localhost:3001/api/bins/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo,
                ubicacion,
                sensorId,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el contenedor');
        }

        const newContainer = await response.json();
        // Lógica para actualizar el estado o realizar otras acciones
        console.log('Contenedor agregado:', newContainer);
    } catch (error) {
        console.error('Error en el envío del contenedor:', error);
    }
};



  return (
    <BrowserRouter>
      <Routes>
        <Route  
          path='/' 
          element={
            <TrashControl  
              containers={containers}
              addContainer={addContainer}
              deleteContainer={(id) => {
                // Delete container logic
              }}
              updateContainer={(tipo, ubicacion, id) => {
                // Update container logic
              }}
            />
          } 
        />
        <Route  
          path='/container/:id'
          element={<TrashDetails/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;