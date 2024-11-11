import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import TrashControl from './pages/TrashControl';
import TrashGraphic from './pages/TrashGraphic';
import TrashDetails from './pages/TrashDetails';

function App() {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    // Fetch containers from the backend
    const fetchContainers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bins');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setContainers(data);
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    };

    fetchContainers();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route  
          path='/' 
          element={
            <TrashControl  
              containers={containers}
              addContainer={(tipo, ubicacion) => {
                // Add container logic
              }}
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