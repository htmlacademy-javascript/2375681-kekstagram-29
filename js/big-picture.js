import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const likesCount = bigPhoto.querySelector('.likes-count');
const photoCaption = bigPhoto.querySelector('.social__caption');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');
const socialComments = bigPhoto.querySelector('.social__comments');
const loadComments = bigPhoto.querySelector('.comments-loader');
const socialFooterText = bigPhoto.querySelector('.social__footer-text');
const commentItem = bigPhoto.querySelector('.social__comment-count');
const cloneComment = bigPhoto.querySelector('.social__comment');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length){
    loadComments.classList.add('hidden');
  }else{
    loadComments.classList.remove('hidden');
  }


  commentItem.textContent = `${commentsCount} из ${currentComments.length} коментариев.`;


  const commentsFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = cloneComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(newComment);
  });

  socialComments.appendChild(commentsFragment);
};


const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};


const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';

};


const onBigPhotoCloseButtonClick = () => {
  loadComments.removeEventListener('click', onLoadCommentsButtonClick);
  bigPhotoCloseButton.removeEventListener('click', onBigPhotoCloseButtonClick);
  closeBigPhoto();
};

const onBigPhotoEscKeyDown = (evt) => {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('social__footer-text')
  ) {
    document.removeEventListener('keydown', onBigPhotoEscKeyDown);
    loadComments.removeEventListener('click', onLoadCommentsButtonClick);
    closeBigPhoto();
  }
};

const showBigPhoto = (photo) => {
  const {url, likes, comments, description} = photo;
  bigPhoto.classList.remove ('hidden');
  document.body.classList.add ('modal-open');

  bigPhotoImg.src = url;
  likesCount .textContent = likes;
  photoCaption.textContent = description;

  currentComments = comments.slice();


  loadComments.addEventListener('click', onLoadCommentsButtonClick);
  document.addEventListener('keydown',onBigPhotoEscKeyDown);
  bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseButtonClick);

  renderComments();
};


export {showBigPhoto};
