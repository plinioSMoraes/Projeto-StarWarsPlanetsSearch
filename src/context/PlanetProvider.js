import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import apiRequest from '../helpers/apiRequest';
import PlanetContext from './PlanetContext';

const getPlanets = async (setState) => {
  const planets = await apiRequest();
  setState(planets);
};

function PlanetProvider({ children }) {
  const [state, setState] = useState([]);
  useEffect(() => {
    getPlanets(setState);
  }, [getPlanets, setState]);
  return (
    <PlanetContext.Provider value={ state }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetProvider;
