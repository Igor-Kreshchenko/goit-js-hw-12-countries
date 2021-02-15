import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import { throwError } from './error-notification';

const refs = getRefs();

refs.searchInputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue).then(result => {
      if (result.length > 10) {
        throwError(
          'Too many matches found. Please enter a more specific query!',
        );
      } else if (result.length === 1) {
        renderPage(result, countryCardTpl);
      } else if (result.length >= 2 || result.length <= 10) {
        renderPage(result, countriesListTpl);
      } else if (result.status === 404) {
        throwError('There is no such country. Try one more time');
      }

      return result;
    });
  }

  clearPage();
  return;
}

function renderPage(country, templateFn) {
  const markup = templateFn(country);
  refs.cardContainer.innerHTML = markup;
}

function clearPage() {
  refs.cardContainer.innerHTML = '';
}
