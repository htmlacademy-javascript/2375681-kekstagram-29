import {closeForm,isEscapeKey} from './form-validate.js';
import {uploadData} from './fetch.js';

const errorMessage = document.querySelector('#error').textContent.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const formUpload = document.querySelector('.img-upload__form');

const closePopup = () => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  popup.remove();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePopup();
  }
};

const onPopupClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeydown);
  }
};


const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  document.body.appendChild(message);
  document.addEventListener('keydown', onEscKeydown);
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  const errorButton = messageFragment.querySelector('.error__button');

  showMessage(messageFragment);

  errorButton.addEventListener('click', () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    closePopup();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      messageFragment.remove();

      document.querySelector('.img-upload__overlay').classList.remove('hidden');

      document.removeEventListener('keydown', onEscKeydown);
    }
  });
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  const successButton = messageFragment.querySelector('.success__button');

  showMessage(messageFragment);

  successButton.addEventListener('click', () => {
    closeForm();
    closePopup();
  });
};

const onSuccess = ()=> {
  closeForm();
  showSuccessMessage();
};

const errorAlert = () => {
  showErrorMessage();
  closeForm();
};

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = document.querySelector('.img-upload__submit');
  submitButton.disabled = true;

  uploadData(() => {
    onSuccess();
    submitButton.disabled = false;
  }, () => {
    errorAlert();
    submitButton.disabled = false;
  },'POST', new FormData(evt.target));
};

formUpload.addEventListener('submit', onFormUploadSubmit);
