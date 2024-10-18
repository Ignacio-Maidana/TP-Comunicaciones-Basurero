import React, { useState } from 'react';
import './App.css';
import TrashControl from './pages/TrashControl'

function App() {

  const [containers, setContainers] = useState([]);
  const [containerCounter, setContainerCounter] = useState(1);

  const addContainer = (type, location) => {
    const newContainer = {type, location, id:containerCounter}
    setContainers([...containers, newContainer])
    setContainerCounter(containerCounter + 1)
  }

  const deleteContainer = (containerId) => {
    setContainers(containers.filter(item => item.id !== containerId))
    setContainerCounter(containerCounter - 1)
  }

  const updateContainer = (type, location, id) => {
    const updatedContainers = [...containers];
    // Encontrar el índice del contenedor con el id correspondiente
    const containerIndex = updatedContainers.findIndex(container => container.id === id);
  
    if (containerIndex !== -1) {
      // Actualizar los datos del contenedor correspondiente
      updatedContainers[containerIndex] = { type, location, id };
      setContainers(updatedContainers);
    } else {
      console.error(`No se encontró el contenedor con id: ${id}`);
    }
  };

  return (
      <TrashControl addContainer={addContainer}
                    deleteContainer={deleteContainer}
                    updateContainer = {updateContainer}
                    containers={containers}/>
  );
}


export default App;
