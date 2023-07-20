import {normalizeString} from './util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_QTY = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = {
  INVALID_VALUE: 'хеш-тег содержит недопустимые символы',
  INVALID_QUANTITY: `нельзя указать больше ${MAX_HASHTAG_QTY} хеш-тегов`,
  INVALID_REPEAT: 'хеш-теги не должны повторяться',
  INVALID_HASHTAG_LENGTH: `максимальная длина одного хеш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_SEPARATOR: 'хеш-теги разделяются пробелами',
  INVALID_FIRST_SIMBOL: 'хеш-тег начинается с символа #',
  LIMIT_DESCRIPTION_LENGTH: `вы ввели максимально допустимое количество символов - ${MAX_DESCRIPTION_LENGTH},`
};

const formElement = document.querySelector('.img-upload__form');  //Форма загрузки нового изображения
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitBtnElement = formElement.querySelector('.img-upload__submit');


const imageUploadForm = document.querySelector('.img-upload__input');  // Форма редактирования изображения
const formEditor = document.querySelector('.img-upload__overlay');  // Кнопка закрытия формы
const uploadCancelButton = document.querySelector('.img-upload__cancel');  // Список всех фильтров

const isEscapeKey = (evt) => evt.key === 'Escape';

const pristine = new Pristine (formElement, {
  classTo: 'field-validate',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate--valid',
  errorTextParent: 'field-validate',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

// <Открытие формы>
const openForm = () => {
  formEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadCancelButton.addEventListener('click', onCloseButtonClick);
  window.addEventListener('keydown', onDocumentKeydown);
};


imageUploadForm.addEventListener('change', () => {
  openForm();
});

// <Закрытие формы>
const closeForm = () => {
  formEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener('click', onCloseButtonClick);
  window.removeEventListener('keydown', onDocumentKeydown);

  imageUploadForm.reset();
  pristine.reset();
};


function onCloseButtonClick () {
  closeForm ();
}


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}


/* <_______________________________________________________></_______________________________________________________> */

let errorAlert = '';
const error = errorAlert;

const showLengthWarning = (evt) => {
  const normalizedText = normalizeString(descriptionInputElement.value);
  if (normalizedText.length === MAX_DESCRIPTION_LENGTH) {
    const warningElement = document.createElement('p', 'warning__message', ErrorMessage.LIMIT_LENGTH);
    const parent = evt.target.parentNode;
    parent.appendChild(warningElement);
  }
};

const hashtagValidator = (inputValue) => {
  errorAlert = '';

  const inputText = normalizeString(inputValue);

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (!inputArray.length) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: ErrorMessage.INVALID_SEPARATOR,
    },
    {
      check: inputArray.some((hashtag) => hashtag[0] !== '#'),
      error: ErrorMessage.INVALID_FIRST_SIMBOL,
    },
    {
      check: inputArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      error: ErrorMessage.INVALID_REPEAT,
    },
    {
      check: inputArray.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH),
      error: ErrorMessage.INVALID_HASHTAG_LENGTH,
    },
    {
      check: inputArray.length > MAX_HASHTAG_QTY,
      error: ErrorMessage.INVALID_QUANTITY,
    },
    {
      check: inputArray.some((hashtag) => !/^#[a-za-яё0-9]{1,19}$/i.test(hashtag)),
      error: ErrorMessage.INVALID_VALUE,
    },
  ];

  return rules.every((rule) =>{
    const isInvalide = rule.check;
    if(isInvalide){
      errorAlert = rule.error;
    }
    return !isInvalide;
  });
};


pristine.addValidator(hashtagInputElement, hashtagValidator, error, 2, false);

const onHashtagInput = () => {
  if (pristine.alidate()) {
    submitBtnElement.disabled = false;
  } else {
    submitBtnElement.disabled = true;
  }
};

descriptionInputElement.addEventListener('input', showLengthWarning);
hashtagInputElement.addEventListener('input', onHashtagInput);


