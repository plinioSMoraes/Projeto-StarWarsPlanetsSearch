import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
// import filterByName from '../helpers/filters';

function Table() {
  const planets = useContext(PlanetContext);
  const [planetsState, setPlanestState] = useState([]);

  const setStateFunc = () => {
    if (planetsState.length === 0 && planets.length > 0) {
      setPlanestState(planets);
    }
  };

  useEffect(() => {
    setStateFunc();
  }, [useContext, useState, setStateFunc]);

  const filterByName = ({ target: { value } }) => {
    const newSearchState = planets.filter(({ name }) => name.includes(value));
    setPlanestState(newSearchState);
  };

  if (planets.length > 0 && planetsState.length > 0) {
    return (
      <main>
        <section className="filters">
          <form htmlFor="">
            Search Planet:
            <input
              data-testid="name-filter"
              placeholder="name"
              onChange={ filterByName }
            />
          </form>
        </section>
        <table>
          <tbody>
            <tr>
              <th>Name </th>
              <th>Rotation Period </th>
              <th>Orbital Period </th>
              <th>Diameter</th>
              <th>Climate </th>
              <th>Gravity </th>
              <th>Terrain </th>
              <th>Surface Water </th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </tbody>
          <tbody>
            {planetsState.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>))}
          </tbody>
        </table>
      </main>
    );
  }
  return (<div>...Carregando</div>);
}

export default Table;
