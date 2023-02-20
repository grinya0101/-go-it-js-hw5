import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


console.log('AAADD');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(responseProcessing, DEBOUNCE_DELAY));

function responseProcessing(e) {
  
  fetchCountries(e).then(data => {
    console.log(data);

    inputSpecificName(data);
    renderCartsAll(data);
    renderCartOneCuntry(data);
  }).catch(r => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });

  ulEl.innerHTML = '';
}



function inputSpecificName(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
}

function renderCartsAll(data) {
  if (data.length >= 2 && data.length < 10) {
    const markup = data
      .map(({ name, flags }) => {
        return `<li class="item"><img class="country" src="${flags.svg}">${name.common}</li>`;
      })
      .join('');

    ulEl.innerHTML = markup;
  }
}



function renderCartOneCuntry(data) {
  if (data.length === 1) {
    const markupOneCountry = data
      .map(({ name, flags, capital, population, languages }) => {
        return `<li class="item"><img class="country" src="${flags.svg}"><p>${
          name.common
        }</p></li>
      <p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(
          languages
        )}</p>`;
      })
      .join('');

    ulEl.innerHTML = markupOneCountry;
  }
}
