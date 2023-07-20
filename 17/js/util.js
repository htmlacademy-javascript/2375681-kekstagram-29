const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const normalizeString = (str) => str.toLowerCase().trim();

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   closeUploadPopup();
// };

// export {onFormSubmit};


export {getRandomInteger, normalizeString};
