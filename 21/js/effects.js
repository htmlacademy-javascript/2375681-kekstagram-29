const EFFECTS = {
  none: {
    name: 'none',
    min: 1,
    max: 100,
    step: 1,
    start: 100,
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const DEFAULT_EFFECT = EFFECTS['none'];

const effectsList = document.querySelector('.effects__list');
const uploadPhoto = document.querySelector('.img-upload__preview');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');
const effectsSwitchSlider = document.querySelector('.effect-level');

let selectedEffect = DEFAULT_EFFECT;

const updateSlider = () => {
  effectsSlider.classList.remove('hidden');
  effectsSwitchSlider.classList.remove('hidden');
  effectsSlider.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });

  if (selectedEffect === DEFAULT_EFFECT) {
    effectsSlider.classList.add('hidden');
    effectsSwitchSlider.classList.add('hidden');
  }
};

const onEffectsListClick = (evt) => {
  if (evt.target.type === 'radio') {
    selectedEffect = EFFECTS[evt.target.value];
    updateSlider();
  }
};

noUiSlider.create(effectsSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

const onEffectsSliderUpdate = () => {
  uploadPhoto.style.filter = 'none';
  uploadPhoto.className = '';
  effectsLevelValue.value = '';
  if(selectedEffect === DEFAULT_EFFECT) {
    return;
  }
  const sliderValue = effectsSlider.noUiSlider.get();
  uploadPhoto.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  uploadPhoto.classList.add(`effects__preview--${selectedEffect.name}`);
  effectsLevelValue.value = sliderValue;
};

updateSlider();

effectsList.addEventListener('click', onEffectsListClick);
effectsSlider.noUiSlider.on('update', onEffectsSliderUpdate);

const resetEffects = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

export {resetEffects};

