const scaleContainer = document.querySelector('.scale');
const scaleField = document.querySelector('.scale__control--value');
const scaledPhoto = document.querySelector('.img-upload__preview img');

const Scale = {
  MIN: 25,
  MAX: 100,
};

scaleField.value = `${Scale.MAX}%`;

const setScale = (value) => {
  scaledPhoto.style.transform = `scale(${value / 100})`;
  scaleField.value = `${value}%`;
};

const calculateScale = (scaleMultiply) => {
  const currentScale = parseInt(scaleField.value, 10);
  const newScale = currentScale + Scale.MIN * scaleMultiply;
  if (newScale < Scale.MIN || newScale > Scale.MAX){
    return;
  }
  setScale(newScale);
};

const onScaleContainerClick = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')){
    calculateScale(1);
  } else if (evt.target.classList.contains('scale__control--smaller')){
    calculateScale(-1);
  }
};

const resetScale = () => {
  setScale(Scale.MAX);
};

scaleContainer.addEventListener('click', onScaleContainerClick);

export {resetScale};
