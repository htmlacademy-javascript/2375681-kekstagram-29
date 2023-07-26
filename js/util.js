const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const normalizeString = (str) => str.toLowerCase().trim();

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   closeUploadPopup();
// };

// export {onFormSubmit};


//   commentsSelected.forEach((comment) => {
//     const newComment = document.createElement('li');
//     const imgComment = document.createElement('img');
//     const textComment = document.createElement('p');

//     newComment.classList.add('.social__comment');
//     imgComment.classList.add('.social__picture');
//     textComment.classList.add('.sotial__text');

//     imgComment.src = comment.avatar;
//     imgComment.alt = comment.name;
//     textComment.textContent = comment.message;

//     newComment.appendChild(imgComment);
//     newComment.appendChild(textComment);


export {getRandomInteger, normalizeString};
