
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
const uploadPhotoForm = effectsForm.querySelector('.img-upload__preview img');
const effectsSliderForm = effectsForm.querySelector('.effect-level__slider');
const effectsLevelValueForm = effectsForm.querySelector('.effect-level__value');
const effectsSwitchSliderForm = effectsForm.querySelector('.effect-level');
const effectForm = document.querySelector('.effects');

let selectedEffect = DEFAULT_EFFECT;

const updateSlider = () => {
  effectsSliderForm.classList.remove('hidden');
  effectsSwitchSliderForm.classList.remove('hidden');
  effectsSliderForm.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });

  if (selectedEffect === DEFAULT_EFFECT) {
    effectsSliderForm.classList.add('hidden');
    effectsSwitchSliderForm.classList.add('hidden');
  }
};

const onEffectFormChange = (evt) => {
  if (evt.target.type === 'radio') {
    selectedEffect = EFFECTS[evt.target.value];
    updateSlider();
  }
};


noUiSlider.create((effectsSliderForm), {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

const onEffectsSliderFormUpdate = () => {
  uploadPhotoForm.style.filter = 'none';
  uploadPhotoForm.className = '';
  effectsLevelValueForm.value = '';
  if(selectedEffect === DEFAULT_EFFECT) {
    return;
  }
  const sliderValue = effectsSliderForm.noUiSlider.get();
  uploadPhotoForm.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  uploadPhotoForm.classList.add(`effects__preview--${selectedEffect.name}`);
  effectsLevelValueForm.value = sliderValue;
};

updateSlider();

effectForm.addEventListener('change', onEffectFormChange);
effectsSliderForm.noUiSlider.on('update', onEffectsSliderFormUpdate);

const resetSlider = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetSlider };
