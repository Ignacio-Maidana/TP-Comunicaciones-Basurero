import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import TrashControl from './pages/TrashControl';
import TrashGraphic from './pages/TrashGraphic';
import TrashDetails from './pages/TrashDetails';

function App() {
  const [containers, setContainers] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route  
          path='/' 
          element={
            <TrashControl  
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