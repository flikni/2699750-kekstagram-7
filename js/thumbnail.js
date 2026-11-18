
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};


const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnailElement = createThumbnail(photo);
    fragment.appendChild(thumbnailElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
