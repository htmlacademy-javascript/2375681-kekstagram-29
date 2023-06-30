

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const renderPhoto = (photo) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__img').alt = photo.description;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  element.querySelector('.picture__likes').textContent = photo.likes;
  return element;
};

const renderPhotos = (photos) => {
  const fragment = document.createCommentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.appendChild(fragment);
};


export {renderPhotos};
