import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import { newFormFilter, reducerObj } from '../helpers/filters';

const COLUMN_OPTIONS = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const ORDER_OPTIONS = ['population', 'orbital_period', 'diameter',
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

  const filterByName = ({ target: { value } }) => { // Filtra os planetas apartir do nome
    const newSearchState = planets.filter(({ name }) => name.includes(value));
    const previousFilters = [].concat(filtersState);
    console.log(previousFilters);
    previousFilters[0][1] = newSearchState;
    setFiltersState(previousFilters);
  };

  const handleFilterBtn = ({ target }) => {
    const newFilters = [].concat(filtersState);
    filtersState.forEach((filter, index) => {
      if (filter[0].columnValue === target.innerText) {
        COLUMN_OPTIONS.push(filter[0].columnValue);
        newFilters.splice(index, 1);
      }
    });
    setFiltersState(newFilters);
    console.log(filtersState);
  };

  const deleteAllFilters = () => {
    if (filtersState.length > 0) {
      setFiltersState([[{}, planets]]);
    }
  };

  const filterForm = (event) => { // Adiciona os filtros
    event.preventDefault();
    const formObj = reducerObj(event);
    const newFormSearch = newFormFilter(formObj, filtersState);
    setFiltersState([...filtersState, [formObj, newFormSearch]]);
    COLUMN_OPTIONS.splice(COLUMN_OPTIONS.indexOf(formObj.columnValue), 1); // Remove a opçao que ja foi filtrada
    setPlanestState(newFormSearch);
  };

  const handleOrder = ({ target }) => {
    const desc = target.previousSibling;
    const asc = desc.previousSibling;
    let order = asc.previousSibling;
    order = order.options[order.options.selectedIndex].value;
    const arrangedFilter = [].concat(filtersState);

    // remove os unknown
    let newArr = [];
    for (let prev = 0; prev < arrangedFilter[0][1].length; prev += 1) {
      console.log(arrangedFilter[0][1]);
      if (arrangedFilter[0][1][prev][order] === 'unknown') {
        newArr = [...newArr, arrangedFilter[0][1].splice(prev, 1)];
        prev -= 1;
      }
    }
    // ate aqui

    if (desc.firstChild.checked) { // organiza o resto do array em ordem decrescente
      arrangedFilter[0][1].sort((a, b) => {
        console.log('descendente');
        return parseInt(b[order], 10) - parseInt(a[order], 10);
      });
    }

    if (asc.firstChild.checked) { // organiza o resto do arr e orden crescente
      arrangedFilter[0][1].sort((a, b) => {
        console.log('ascendente');
        return parseInt(a[order], 10) - parseInt(b[order], 10);
      });
    }
    newArr.forEach((arr) => { // bota de volta os unknown no final do arr
      const newAttribute = arrangedFilter[0][1].length;
      console.log(newAttribute);
      const item = arr[0];
      arrangedFilter[0][1][newAttribute] = item;
    });

    setFiltersState(arrangedFilter);
  };

  useEffect(() => {
    setStateFunc();
  }, [useContext, useState, setStateFunc]);

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
        <section>
          <button
            type="button"
            onClick={ deleteAllFilters }
            data-testid="button-remove-filters"
          >
            Delete All
          </button>
          {filtersState.map((filter, index) => {
            if (index > 0) {
              console.log(filtersState);
              return (
                <div
                  data-testid="filter"
                  key={ `Button Filter - ${index} ` }
                >
                  <button
                    type="button"
                    onClick={ handleFilterBtn }
                  >
                    {filter[0].columnValue}
                  </button>
                </div>
              );
            }
            return '';
          })}
        </section>
        <section>
          <form>
            <select data-testid="column-sort">
              {ORDER_OPTIONS.map((option, index) => (
                <option
                  key={ `${option} - ${index}` }
                  value={ option }
                >
                  {option}
                </option>))}
            </select>
            <label htmlFor="ASC" data-testid="column-sort-input-asc">
              <input type="radio" id="ASC" name="order" value="ASC" />
              ASCENDENTE
            </label>
            <label htmlFor="DESC" data-testid="column-sort-input-desc">
              <input type="radio" id="DESC" name="order" value="DESC" />
              DESCENDENTE
            </label>
            <button
              data-testid="column-sort-button"
              type="button"
              onClick={ handleOrder }
            >
              ORDENAR
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
            {filtersState[filtersState.length - 1][1].map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{planet.name}</td>
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
