
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

let photos = [];

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');

  image.src = url;
  image.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.dataset.photoId = id;

  return pictureElement;
};

const onPicturesContainerClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail || !picturesContainer.contains(thumbnail)) {
    return;
  }

  evt.preventDefault();

  const photoId = Number(thumbnail.dataset.photoId);
  const selectedPhoto = photos.find((photo) => photo.id === photoId);

  if (selectedPhoto) {
    openBigPicture(selectedPhoto);
  }
};

const renderThumbnails = (photosData) => {
  photos = photosData;

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  picturesContainer.append(fragment);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

export { renderThumbnails };
