const scaleContainer = document.querySelector('.scale');
const scaleFieldContainer = document.querySelector('.scale__control--value');
const scaledPhotoContainer = document.querySelector('.img-upload__preview img');

const Scale = {
  MIN: 25,
  MAX: 100,
};

scaleFieldContainer.value = `${Scale.MAX}%`;

const setScale = (value) => {
  scaledPhotoContainer.style.transform = `scale(${value / 100})`;
  scaleFieldContainer.value = `${value}%`;
};

const calculateScale = (scaleMultiply) => {
  const currentScale = parseInt(scaleFieldContainer.value, 10);
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
