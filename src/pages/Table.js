import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
// import filterByName from '../helpers/filters';

const COLUMN_OPTIONS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const COMPARISON_OPTIONS = ['maior que', 'menor que', 'igual a'];

function Table() {
  const planets = useContext(PlanetContext);
  const [planetsState, setPlanestState] = useState([]);
  const [filtersState, setFiltersState] = useState([]);

  const setStateFunc = () => {
    if (planetsState.length === 0 && planets.length > 0) {
      setFiltersState([[{}, planets]]); // Estado sem filtros ou backup
      setPlanestState(planets);
    }
  };

  useEffect(() => {
    setStateFunc();
  }, [useContext, useState, setStateFunc]);

  const filterByName = ({ target: { value } }) => { // Filtra os planetas apartir do nome
    const newSearchState = planets.filter(({ name }) => name.includes(value));
    setPlanestState(newSearchState);
  };

  const reducerObj = (event) => { // Transforma o form em um objeto com os valores que eu quero
    const inputValue = event.target.previousSibling;
    const comparisonValue = inputValue.previousSibling;
    const columnValue = comparisonValue.previousSibling;
    const formObj = {
      inputValue: inputValue.value,
      comparisonValue: comparisonValue
        .options[comparisonValue.options.selectedIndex].value,
      columnValue: columnValue.options[columnValue.options.selectedIndex].value };
    return formObj;
  };

  const newFormFilter = (formObj) => { // Filtra os planetas atraves do form
    const newFormSearch = filtersState[filtersState.length - 1][1].filter((planet) => {
      if (planet[formObj.columnValue] === 'unknown') {
        console.log('unknown');
        return '';
      }
      const newPlanets = [];
      switch (formObj.comparisonValue) {
      case 'maior que':
        console.log(`${formObj.inputValue} < ${planet[formObj.columnValue]}`);
        return formObj.inputValue < parseInt(planet[formObj.columnValue], 10)
          ? newPlanets.push(planet) : '';
      case 'menor que':
        console.log(`${formObj.inputValue} > ${planet[formObj.columnValue]}`);
        return formObj.inputValue > parseInt(planet[formObj.columnValue], 10)
          ? newPlanets.push(planet) : '';
      case 'igual a':
        console.log(`${formObj.inputValue} = ${planet[formObj.columnValue]}`);
        return formObj.inputValue === planet[formObj.columnValue]
          ? newPlanets.push(planet) : '';
      default:
      }
      console.log(newPlanets);
      return newPlanets;
    });
    return newFormSearch;
  };

  const filterForm = (event) => { // Adiciona os filtros
    event.preventDefault();
    const formObj = reducerObj(event);
    const newFormSearch = newFormFilter(formObj);
    setFiltersState([...filtersState, [formObj, newFormSearch]]);
    console.log(filtersState);
    setPlanestState(newFormSearch);
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
          <form>
            <select data-testid="column-filter">
              {COLUMN_OPTIONS.map((option) => (
                <option
                  key={ option }
                  value={ option }
                >
                  {option}
                </option>))}
            </select>
            <select data-testid="comparison-filter">
              {COMPARISON_OPTIONS.map((test) => (
                <option
                  key={ test }
                  value={ test }
                >
                  {test}
                </option>))}
            </select>
            <input
              data-testid="value-filter"
              defaultValue={ 0 }
            />
            <button
              type="button"
              data-testid="button-filter"
              onClick={ filterForm }
            >
              Filtrar
            </button>
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
