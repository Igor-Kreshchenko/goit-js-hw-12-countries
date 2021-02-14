import countryCardTpl from '../templates/country-card.hbs';
import API from './api-service';
import getRefs from './get-refs';

const refs = getRefs();

refs.searchInputRef.addEventListener('input', onSearch);

function onSearch(event) {
  const inputValue = event.target.value;

  API.fetchCountryByName(inputValue)
    .then(renderCountryCard)
    .catch(onFetchError);
}

function renderCountryCard(name) {
  const markup = countryCardTpl(name);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('no such country found');
}
