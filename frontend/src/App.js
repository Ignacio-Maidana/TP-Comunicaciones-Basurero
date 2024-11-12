import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrashControl from './pages/TrashControl';
import TrashDetails from './pages/TrashDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrashControl />} />
        <Route path="/details/:id" element={<TrashDetails />} />
      </Routes>
    </Router>
  );
};

export default App;