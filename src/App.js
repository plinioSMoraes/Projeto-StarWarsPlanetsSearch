import React from 'react';
import './App.css';
import PlanetProvider from './context/PlanetProvider';
import Table from './pages/Table';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;
