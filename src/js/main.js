import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import { showNotification } from './error-notification';

const refs = getRefs();

refs.searchInputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue).then(checkPromise).catch(onError);
  }

  clearPage();
}

function checkPromise(data) {
  if (data.length === 1) {
    renderPage(data, countryCardTpl);
  } else if (data.length >= 2 && data.length <= 10) {
    renderPage(data, countriesListTpl);
  } else {
    showNotification(
      'Too many matches found. Please enter a more specific query!',
    );
  }
}

function onError() {
  showNotification('Wrong request! Please, try again');
}

function renderPage(country, templateFn) {
  const markup = templateFn(country);
  refs.cardContainer.innerHTML = markup;
}

function clearPage() {
  refs.cardContainer.innerHTML = '';
}
