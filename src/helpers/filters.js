export function reducerObj(event) { // Transforma o form em um objeto com os valores que eu quero
  const inputValue = event.target.previousSibling;
  const comparisonValue = inputValue.previousSibling;
  const columnValue = comparisonValue.previousSibling;
  const formObj = {
    inputValue: inputValue.value,
    comparisonValue: comparisonValue
      .options[comparisonValue.options.selectedIndex].value,
    columnValue: columnValue.options[columnValue.options.selectedIndex].value };
  return formObj;
}

export function newFormFilter(formObj, filtersState) { // Filtra os planetas atraves do form
  const newFormSearch = filtersState[filtersState.length - 1][1].filter((planet) => {
    if (planet[formObj.columnValue] === 'unknown') {
      return '';
    }
    const newPlanets = [];
    switch (formObj.comparisonValue) {
    case 'maior que':
      return formObj.inputValue < parseInt(planet[formObj.columnValue], 10)
        ? newPlanets.push(planet) : '';
    case 'menor que':
      return formObj.inputValue > parseInt(planet[formObj.columnValue], 10)
        ? newPlanets.push(planet) : '';
    case 'igual a':
      return formObj.inputValue === planet[formObj.columnValue]
        ? newPlanets.push(planet) : '';
    default:
    }
    return newPlanets;
  });
  return newFormSearch;
}
