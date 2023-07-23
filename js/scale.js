const scaleContainer = document.querySelector('.scale'); // Контейнер с элементами
const scaleField = document.querySelector('.scale__control--value'); // Поле с значением в %
const scaledPhoto = document.querySelector('.img-upload__preview img'); // Фото, которое нужно масштабировать

const Scale = { //Mинимальное и максимальное значение(значение по умолчанию и шаг совпадают, можно не указывать)
  MIN: 25,
  MAX: 100,
};

scaleField.value = `${Scale.MAX}%`; //

const setScale = (scaleValue) => { // Функция изменения масштаба фотки
  scaledPhoto.style.transform = `scale(${scaleValue / scaleContainer.MAX})`;
  scaleField.value = `${scaleValue}%`; // Для нового значения подставляем % к числу
};

const calculateScale = (scaleMultiply) => {
  const currentScale = parseInt(scaleField.value, 10); // Текущее значение в % приводим к числу(parseInt откинет символ %)
  const newScale = currentScale + Scale.MIN * scaleMultiply; // Текущее значение + 25(шаг) * 1(увеличиваем фотку)
  if (newScale < Scale.MIN || newScale > Scale.MAX){ // Проверяем, не вышло ли значение за диапазон от 25 до 100
    return;
  }
  setScale(newScale); // Изменяем размер картинки
};

const onScaleContainerClick = (evt) => { // Функция-проверка обработчика на контейнер =>
  if (evt.target.classList.contains('.scale__control--bigger')){ // Если цель клика содержит класс scale__control--bigger =>
    calculateScale(1); // увеличиваем фото
  } else if (evt.target.classList.contains('.scale__control--smaller')){ // Если цель клика содержит класс scale__control--smaller =>
    calculateScale(-1); // уменьшаем фото
  }
};

const resetScale = () => {
  setScale(Scale.MAX);
};

scaleContainer.addEventListener('click', onScaleContainerClick); // Навешиваем на контейнер с элементами обработчик(это т.н. делегирование)

export {resetScale};
