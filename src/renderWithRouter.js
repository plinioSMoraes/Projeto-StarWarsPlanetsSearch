import { render } from '@testing-library/react';
import createBrowserHistory from 'history';
import React from 'react';
import App from './App';

const renderWithRouter = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources, history };
};

export default renderWithRouter;
