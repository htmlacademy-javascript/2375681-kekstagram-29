const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};
const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const normalizeString = (str) => str.toLowerCase().trim();

export {normalizeString,isEscapeKey};


