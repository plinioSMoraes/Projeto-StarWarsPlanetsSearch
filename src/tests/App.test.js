import fetch from '../../cypress/mocks/fetch';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
const { waitFor, screen } = require('@testing-library/react');

const allCategory = 'All-category-filter';
// Jeito certo de mockar o fetch com .then() no código:
// https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app

jest.setTimeout(10000);

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Testes da implementação da Tabela', () => {
  test('Quantidade de items está correta', async () => {
    renderWithRouter(<App/ >);
    await waitFor(
      () => {
        expect(screen.getByTestId('name-filter')).toBeInTheDocument();
        expect(screen.getByTestId('column-filter')).toBeInTheDocument();
        expect(screen.getByTestId('value-filter')).toBeInTheDocument();
        expect(screen.getByTestId('button-filter')).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
  });
  test('As requisições certas são feitas na tela de comidas', async () => {
    renderWithRouter('/meals');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    );
    await waitFor(() => {
      expect(screen.getByTestId('Iguaria-category-filter')).toBeInTheDocument();
    });
  });
  test('As requisições certas são feitas na tela de bebidas', async () => {
    renderWithRouter('/drinks');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
    await waitFor(() => {
      expect(screen.getByTestId('Natural-category-filter')).toBeInTheDocument();
    });
  });
});

// describe('Testa os botões de categoria', () => {
//   test('Clicando numa categoria de bebidas', async () => {
//     renderWithRouter('/drinks');
//     await waitFor(() => {
//       const categoryBtn = screen.getByTestId('Natural-category-filter');
//       userEvent.click(categoryBtn);
//     });
//     expect(fetch).toHaveBeenCalledWith(
//       'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Natural',
//     );
//   });
//   test('Clicando numa categoria de comidas', async () => {
//     renderWithRouter('/meals');
//     await waitFor(() => {
//       const categoryBtn = screen.getByTestId('Iguaria-category-filter');
//       userEvent.click(categoryBtn);
//     });
//     expect(fetch).toHaveBeenCalledWith(
//       'https://www.themealdb.com/api/json/v1/1/filter.php?c=Iguaria',
//     );
//   });
//   test('Clicando no botão all categories na página meals', () => {
//     renderWithRouter('/meals');
//     const categoryBtn = screen.getByTestId(allCategory);
//     userEvent.click(categoryBtn);
//     expect(fetch).not.toHaveBeenCalledWith(
//       'https://www.themealdb.com/api/json/v1/1/filter.php?c=All',
//     );
//   });
//   test('Clicando em um botão de categoria duas vezes', async () => {
//     renderWithRouter('/drinks');
//     const categoryBtn = screen.getByTestId(allCategory);
//     userEvent.click(categoryBtn);
//     expect(fetch).not.toHaveBeenCalledWith(
//       'https://www.themealdb.com/api/json/v1/1/filter.php?c=All',
//     );
//     expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
//     expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
//     expect(screen.getAllByRole('button')).toHaveLength(10);
//   });
// });

// test('Teste referente ao componente Favorite', async () => {
//   jest.spyOn(global, 'fetch');
//   global.fetch.mockResolvedValue({
//     json: jest.fn().mockResolvedValue(oneMeal),
//   });
//   const favoriteObj = [{
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   }];
//   jest.spyOn(storageLocal, 'getItemByKey');
//   const { history } = renderWithRouter(<App />);
//   history.push('/meals/52771');
//   await waitFor(() => expect(global.fetch).toHaveBeenCalled());
//   userEvent.click(screen.getByTestId('favorite-btn'));
//   const storage = storageLocal.getItemByKey('favoriteRecipes');
//   expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual(favoriteObj);

//   expect(storage[0].id).toBe('52771');

//   userEvent.click(screen.getByTestId('favorite-btn'));

//   expect(storageLocal.getItemByKey('favoriteRecipes')).toEqual([]);
// });


