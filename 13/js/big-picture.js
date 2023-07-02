

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img');
const likesCount = bigPhoto.querySelector('.likes-count');
const photoCaption = bigPhoto.querySelector('.social__caption');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');

const showBigPhoto = (photo) => {
  const {url, comments, likes, description} = photo;
  bigPhoto.classList.remove ('hidden');
  document.body.classList.add ('modal-open');

  bigPhotoImg.src = url;
  likesCount .textContent = likes;
  photoCaption.textContent = description;

  const onBigPhotoEscKeyDown = (evt) => {
    if(evt.keyCode === 27){
      closeBigPhoto();
    }
  };
  document.addEventListener('keydown',onBigPhotoEscKeyDown);


  const onBigPhotoCloseButtonClick = (evt) => {
    closeBigPhoto();
  };

  bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseButtonClick);


  const closeBigPhoto = () => {
    bigPhoto.classList.add('hidden');
    document.body.classList.remove('.modal-open');
    document.removeEventListener('keydown', onBigPhotoEscKeyDown);
  };
};

export {showBigPhoto};
