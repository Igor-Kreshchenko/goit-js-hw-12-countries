import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = getRefs();

refs.searchInputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue)
      .then(promise => {
        if (promise.length > 10) {
          error({
            text: 'Too many matches found. Please enter a more specific query!',
            closer: false,
            sticker: false,
            delay: Infinity,
          });
        } else if (promise.length === 1) {
          renderPage(promise, countryCardTpl);
        } else if (promise.length >= 2 || promise.length <= 10) {
          renderPage(promise, countriesListTpl);
        }
      })
      .catch(onFetchError);
  }

  clearPage();
  return;
}

function renderPage(country, templateFn) {
  const markup = templateFn(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  console.log('no such country found');
}

function clearPage() {
  refs.cardContainer.innerHTML = '';
}
