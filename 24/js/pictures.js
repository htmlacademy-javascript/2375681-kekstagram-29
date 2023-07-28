import {showBigPhoto} from './big-picture.js';


const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');


const renderPhoto = (photo) => {
  const {url, comments, likes, description, id} = photo;
  const element = templateFragment.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.elementId = id;

  const onElementClick = (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  };

  element.addEventListener ('click', onElementClick);

  return element;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (photos) => {

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.appendChild(fragment);
};

const removePhotos = () => {
  const photos = picturesContainer.querySelectorAll('.picture');
  if(photos){
    photos.forEach((photo) => photo.remove());
  }
};


export {renderPhotos, removePhotos};
