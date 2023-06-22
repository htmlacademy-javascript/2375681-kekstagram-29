// eslint-disable-next-line no-unused-vars
const PHOTO_COUNT = 25;
// eslint-disable-next-line no-unused-vars
const Likes = {
  MIN: 15,
  MAX: 200
};

// eslint-disable-next-line no-unused-vars
const description = ['Закат на берегу моря',
  'Романтический ужин на балконе с видом на горы',
  'Уютный вечер в семейном кругу',
  'Улочки старого города',
  'Красота в глазах смотрящего',
];

// eslint-disable-next-line no-unused-vars
const photos = [];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateComments() {
  const nameList = ['Александр', 'Дарина', 'Илья', 'Марина', 'Андрей', 'Светлана', 'Константин', 'Вера'];
  const commentList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Лица у людей на фотке перекошены, как будто их избивают.'
  ];
  const comments = [];
  const numberOfComments = getRandomInteger(0, 30);
  for (let i = 1; i <= numberOfComments; i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      name: nameList[getRandomInteger(0, nameList.length - 1)],
      message: commentList[getRandomInteger(0,commentList.length - 1)],
    });
  }
  return comments;
}


const addPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: generateComments(),
});


const addPhotos = () => {
  for (let i = 1; i <= PHOTO_COUNT; i ++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();


export {getRandomInteger, generateComments, addPhotos, addPhoto};
