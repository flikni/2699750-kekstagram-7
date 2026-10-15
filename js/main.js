const PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Замечательный закат на море',
  'Утренняя чашка кофе',
  'Прогулка по осеннему парку',
  'Мой любимый кот',
  'Архитектура старого города',
  'Вкусный обед в кафе',
  'Рабочий процесс',
  'Вечерний город в огнях'
];

const NAMES = [
  'Артём',
  'Елена',
  'Иван',
  'Мария',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Анна'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'

];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower +1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length-1)];

const generateMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const selectedMessage = [];

  for (let i = 0; i < messageCount; i++) {
    const randomMsg = getRandomArrayElement(MESSAGE);
    if (!selectedMessage.includes(randomMsg)){
      selectedMessage.push(randomMsg);
    }
  }
  return selectedMessage.join(' ');
};

let commentIdCounter = 1;

const createComment = () => ({
  id: commentIdCounter++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, createComment);
};

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments(),
});

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index));

createPhotos();
