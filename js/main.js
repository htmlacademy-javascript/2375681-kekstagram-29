import {renderPhotos} from './pictures.js';
import './form-validate.js';
import './scale.js';
import './effects.js';
import {loadData} from './fetch.js';
import './sort-of-photos.js';


let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};

const errorAlert = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.zIndex = '100';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '22px';
  messageAlert.style.backgroundColor = 'orange';
  messageAlert.textContent = 'Ошибка загрузки!';
  document.body.append(messageAlert);
};

loadData(onSuccess, errorAlert);


renderPhotos(photos);

export {photos};
