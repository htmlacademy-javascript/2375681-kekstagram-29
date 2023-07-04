import {showBigPhoto} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const renderPhoto = (photo) => {
  const {url, comments, likes, description} = photo;
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  const onElementClick = (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  };

  element.addEventListener ('click', onElementClick);
  return element;
};

const renderPhotos = (photos) => {

  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.appendChild(fragment);
};


export {renderPhotos};
