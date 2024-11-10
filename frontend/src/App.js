import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import TrashControl from './pages/TrashControl';
import TrashGraphic from './pages/TrashGraphic';
import TrashDetails from './pages/TrashDetails';
import { getAllBins, addBin, updateBin, deleteBin, saveSensorData } from './api';

function App() {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    fetchContainers();
    saveSensorData();
  }, []);

  const fetchContainers = async () => {
    try {
      const data = await getAllBins();
      setContainers(data);
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
  };

  const addContainer = async (type, location) => {
    try {
      const newContainer = await addBin({ tipo: type, ubicacion: location });
      setContainers([...containers, newContainer]);
    } catch (error) {
      console.error('Error adding container:', error);
    }
  };

  const deleteContainer = async (containerId) => {
    try {
      await deleteBin(containerId);
      setContainers(containers.filter(item => item.id !== containerId));
    } catch (error) {
      console.error('Error deleting container:', error);
    }
  };

  const updateContainer = async (type, location, id) => {
    try {
      const updatedContainer = await updateBin(id, { tipo: type, ubicacion: location });
      setContainers(containers.map(container =>
        container.id === id ? updatedContainer : container
      ));
    } catch (error) {
      console.error('Error updating container:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route  
          path='/' 
          element={
            <TrashControl  
              addContainer={addContainer} 
              deleteContainer={deleteContainer}
              updateContainer={updateContainer}
              containers={containers}
            />
          } 
        />
        <Route  
          path='/graphs' 
          element={<TrashGraphic containers={containers}/>} 
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