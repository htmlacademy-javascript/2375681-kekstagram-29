import {getRandomInteger} from './util.js';

const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 25;


const LIKES = {
  MIN: 15,
  MAX: 200
};


const description = [
  'Закат на берегу моря',
  'Романтический ужин на балконе с видом на горы',
  'Уютный вечер в семейном кругу',
  'Улочки старого города',
  'Красота в глазах смотрящего',
];

const nameList = ['Александр', 'Дарина', 'Илья', 'Марина', 'Андрей', 'Светлана', 'Константин', 'Вера'];
const commentList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Лица у людей на фотке перекошены, как будто их избивают.',
  'Мы не знаем, что это такое. Если бы мы знали, что это такое, мы не знаем, что это такое.',
  'Вау!',
  'Упс! Вот это да!',
  'Круто!',
  'Никогда такого не было, и вот опять',
  'Вот как так-то?',
  ')))))',
  'Хочу туда',
  'А так можно было?',
  'Это законно?',
  'Были там в пошлом году',
  'Тема не раскрыта',
];


function generateComments() {
  const comments = [];
  for (let i = 1; i <= getRandomInteger(0, 30); i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      name: nameList[getRandomInteger(0, nameList.length - 1)],
      message: commentList[getRandomInteger(0,commentList.length - 1)],
    });
  }
  return comments;
}


const photos = [];

const addPhoto = (id) => ({
  id: getRandomInteger(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT),
  url: `photos/${id}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: generateComments(),
});


const addPhotos = () => {
  for (let i = 1; i <= MAX_PHOTO_COUNT; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();

export {generateComments, photos};
