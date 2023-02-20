function fetchCountries(country) {
  const url = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(r => {
    if (!r.ok) {
      throw new Error();
    }
    return r.json();
  });
}

export { fetchCountries };
