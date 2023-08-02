
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

const effectsForm = document.querySelector('.img-upload__form');
// const effectsList = effectsForm.querySelector('.effects__list');
const uploadPhoto = effectsForm.querySelector('.img-upload__preview img');
const effectsSlider = effectsForm.querySelector('.effect-level__slider');
const effectsLevelValue = effectsForm.querySelector('.effect-level__value');
const effectsSwitchSlider = effectsForm.querySelector('.effect-level');
const effects = document.querySelector('.effects');

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

const onEffectsListChange = (evt) => {
  if (evt.target.type === 'radio') {
    selectedEffect = EFFECTS[evt.target.value];
    updateSlider();
  }
};


noUiSlider.create((effectsSlider), {
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

effects.addEventListener('change', onEffectsListChange);
effectsSlider.noUiSlider.on('update', onEffectsSliderUpdate);

const resetSlider = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetSlider };
