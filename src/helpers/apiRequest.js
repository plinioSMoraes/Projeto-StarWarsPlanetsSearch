const ENDPOINT = 'https://swapi.dev/api/planets';

const apiRequest = async () => {
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data.results;
};

export default apiRequest;
