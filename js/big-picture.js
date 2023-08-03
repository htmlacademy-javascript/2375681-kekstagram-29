import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPhoto = document.querySelector('.big-picture');
const bigImgPhoto = bigPhoto.querySelector('.big-picture__img img');
const likesCountPhoto = bigPhoto.querySelector('.likes-count');
const captionPhoto = bigPhoto.querySelector('.social__caption');
const bigPhotoCloseButtonPhoto = bigPhoto.querySelector('.big-picture__cancel');
const socialCommentsPhoto = bigPhoto.querySelector('.social__comments');
const loadCommentsPhoto = bigPhoto.querySelector('.comments-loader');
const socialFooterTextPhoto = bigPhoto.querySelector('.social__footer-text');
const commentItemPhoto = bigPhoto.querySelector('.social__comment-count');
const cloneCommentPhoto = bigPhoto.querySelector('.social__comment');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderComments = () => {
  socialCommentsPhoto.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length){
    loadCommentsPhoto.classList.add('hidden');
  }else{
    loadCommentsPhoto.classList.remove('hidden');
  }


  commentItemPhoto.textContent = `${commentsCount} из ${currentComments.length} коментариев.`;


  const commentsFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = cloneCommentPhoto.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(newComment);
  });

  socialCommentsPhoto.appendChild(commentsFragment);
};


const onLoadCommentsPhotoClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};


const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterTextPhoto.value = '';

};


const onBigPhotoCloseButtonPhotoClick = () => {
  loadCommentsPhoto.removeEventListener('click', onLoadCommentsPhotoClick);
  bigPhotoCloseButtonPhoto.removeEventListener('click', onBigPhotoCloseButtonPhotoClick);
  closeBigPhoto();
};

const onBigPhotoEscKeyDown = (evt) => {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('social__footer-text')
  ) {
    document.removeEventListener('keydown', onBigPhotoEscKeyDown);
    loadCommentsPhoto.removeEventListener('click', onLoadCommentsPhotoClick);
    closeBigPhoto();
  }
};

const showBigPhoto = (photo) => {
  const {url, likes, comments, description} = photo;
  bigPhoto.classList.remove ('hidden');
  document.body.classList.add ('modal-open');

  bigImgPhoto.src = url;
  likesCountPhoto.textContent = likes;
  captionPhoto.textContent = description;

  currentComments = comments.slice();


  loadCommentsPhoto.addEventListener('click', onLoadCommentsPhotoClick);
  document.addEventListener('keydown',onBigPhotoEscKeyDown);
  bigPhotoCloseButtonPhoto.addEventListener('click', onBigPhotoCloseButtonPhotoClick);

  renderComments();
};


export {showBigPhoto};
