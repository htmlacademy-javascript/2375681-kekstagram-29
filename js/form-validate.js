import {normalizeString} from '../util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_QTY = 5;
const MAX_HASHTAG_LENGTH = 20;

const ErrorMessage = { // Константы для описания ошибки написания хештега
  INVALID_VALUE: 'хеш-тег содержит недопустимые символы',
  INVALID_QUANTITY: `нельзя указать больше ${MAX_HASHTAG_QTY} хеш-тегов`,
  INVALID_REPEAT: 'хеш-теги не должны повторяться',
  INVALID_HASHTAG_LENGTH: `максимальная длина одного хеш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_SEPARATOR: 'хеш-теги разделяются пробелами',
  INVALID_FIRST_SIMBOL: 'хеш-тег начинается с символа #',
  LIMIT_DESCRIPTION_LENGTH: `вы ввели максимально допустимое количество символов - ${MAX_DESCRIPTION_LENGTH},`
};

const formElement = document.querySelector('.img-upload__form'); //Форма загрузки нового изображения
const hashtagInputElement = formElement.querySelector('.text__hashtags'); // Поле с хештегами
const descriptionInputElement = formElement.querySelector('.text__description');
const submitBtnElement = formElement.querySelector('.img-upload__submit');


const imageUploadForm = formElement.querySelector('.img-upload__input'); // Поле для загрузки фотографий
const formOverlay = formElement.querySelector('.img-upload__overlay'); // Форма редактирования изображения
const uploadCancelButton = formElement.querySelector('.img-upload__cancel'); // Кнопка закрытия формы


const pristine = new Pristine (formElement, { // Создаём Пристин
  classTo: 'field-validate',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate--valid',
  errorTextParent: 'field-validate',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});


// <Открытие формы>

const isEscapeKey = (evt) => evt.key === 'Escape';

const onImageUploadFormChange = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadCancelButton.addEventListener('click', onCloseButtonClick); // Обработчик для закрытия формы крестиком
  document.addEventListener('keydown', onDocumentKeydown); // Обработчик для закрытия формы ESC
};


imageUploadForm.addEventListener('change',onImageUploadFormChange);

// <Закрытие формы>

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imageUploadForm.reset(); // Сбрасываем значение формы
  pristine.reset(); // Сбрасываем Пристин

  uploadCancelButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

};


function onCloseButtonClick () { // Функция для закрытия формы крестиком
  closeForm ();
}


function onDocumentKeydown (evt) {// Функция для закрытия формы ESC
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}


/* <_______________________________________________________>Валидация</_______________________________________________________> */

let errorAlert = ''; //Передаём переменную с пустым текстом(изначально текст пустой)
const error = () => errorAlert; //Функция для того, чтобы Пристин перерисовал текст(Пристин не работает динамически, без функции текст останется пустым)

const showLengthWarning = (evt) => {
  const normalizedText = normalizeString(descriptionInputElement.value);
  if (normalizedText.length === MAX_DESCRIPTION_LENGTH) {
    const warningElement = document.createElement('p', 'warning__message', ErrorMessage.LIMIT_LENGTH);
    const parent = evt.target.parentNode;
    parent.appendChild(warningElement);
  }
};

const hashtagValidator = (inputValue) => { //Функция  проверки, правильно ли заполнено поле для хештегов
  errorAlert = ''; //Обнуляем все ошибки при первом клике

  const inputText = normalizeString(inputValue); //Приводим строку к нижнему регистру и обрезаем пробелы в начале и в конце

  if (!inputText) { // Проверка нормализации строки - если после трима не осталось ничего, форма валидна. Хештеги не обязательны
    return true;
  }

  const inputArray = inputText.split(/\s+/); //Регулярка для разделения хештегов между собой пробелами(в ней собраны все разделительные символы)

  if (!inputArray.length) { //Проверяем, существует ли массив с хештегами
    return true;
  }

  const rules = [ // В данном объекте важен порядок следования правил
    {
      check: inputArray.some((hashtag) => hashtag.indexOf('#', 1) >= 1), // Правила написания хештегов. Метод some вернёт true, если хотя бы один элемент соответствует условию
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

  return rules.every((rule) =>{ // Методом every(возвращает true или false, должны соответствовать все элементы для true) перебераем объект правил
    const isInvalide = rule.check; //Проверяет, ошибочно ли правило для хештега
    if(isInvalide){
      errorAlert = rule.error; // Если ошибочно, высветится соответствующее сообщение об ошибке
    }
    return !isInvalide; // Если нет, то всё ништяк
  });
};

pristine.addValidator(hashtagInputElement, hashtagValidator, error, 2, false);//Чтобы Пристин заработал, навешиваем на поле для хештегов один из методов валидации

const onHashtagInput = () => { // Функция обработчика события на поле для хештегов => деактивирует кнопку 'Опубликовать' при  неправильно введённом хештеге
  if (pristine.validate()) { // Запускает внешнюю библиотеку валидации
    submitBtnElement.disabled = false;
  } else {
    submitBtnElement.disabled = true;
  }
};

descriptionInputElement.addEventListener('input', showLengthWarning);
hashtagInputElement.addEventListener('input', onHashtagInput); // Навешиваем событие ввода любым способом(с клавиатуры, кнопкой мыши) на поле для хештегов

export {onImageUploadFormChange, closeForm};
