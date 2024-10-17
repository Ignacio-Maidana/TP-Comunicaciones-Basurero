import React, { useState } from 'react';
import './App.css';
import TrashControl from './pages/TrashControl'

function App() {

  const [container, setContainer] = useState([]);

  const addContainer = (newContainer) => {
    setContainer([...container, newContainer])
  }

  const deleteContainer = (containerId) => {
    setContainer(container.filter(item => item.id !== containerId))
  }

  return (
      <TrashControl addContainer={addContainer}
                    deleteContainer={deleteContainer}
                    container={container}/>
  );
}


export default App;
