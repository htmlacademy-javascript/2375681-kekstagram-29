import { renderPhotos, removePhotos } from './pictures.js';
import { photos } from './main.js';

const DELAY = 500;


const COUNT_OF_FILTER = 10;
const BTN_ACTIVE_CLASS = 'img-filters__button--active';

const filtersContainer = document.querySelector('.img-filters');
const filtersFormContainer = filtersContainer.querySelector('.img-filters__form');

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

const debounce = (callback, timeOfDelay = DELAY) => {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, rest), timeOfDelay);
  };
};


const selectedFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos).slice(0, COUNT_OF_FILTER),
  'filter-discussed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length),
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onFiltersFormContainerClick = debounce((evt) => {
  if (isButton(evt)){
    removePhotos();
  }
  renderPhotos(selectedFilters[evt.target.id]());
});

const onButtonClick = (evt) => {
  if (isButton(evt)){
    const selectedButton = filtersFormContainer.querySelector(`.${BTN_ACTIVE_CLASS}`);

    if (selectedButton){
      selectedButton.classList.remove(BTN_ACTIVE_CLASS);
    }

    evt.target.classList.add(BTN_ACTIVE_CLASS);

    removePhotos();
  }
};

filtersFormContainer.addEventListener('click', onFiltersFormContainerClick);

filtersFormContainer.addEventListener('click', onButtonClick);
