
import { isEscapeKey } from './util.js';

const COMMENTS_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const commentTemplate = socialComments.querySelector('.social__comment');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);

  const commentPicture = commentElement.querySelector('.social__picture');
  commentPicture.src = avatar;
  commentPicture.alt = name;

  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderCommentsPortion = () => {
  const fragment = document.createDocumentFragment();

  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PORTION
  );

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  socialComments.append(fragment);

  shownCommentsCount = Math.min(
    shownCommentsCount + COMMENTS_PORTION,
    currentComments.length
  );

  commentCount.replaceChildren(
    document.createTextNode(`${shownCommentsCount} из `),
    commentsCount,
    document.createTextNode(' комментариев')
  );

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};


function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCloseButtonClick = () => {
  closeBigPicture();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

const openBigPicture = (photo) => {
  currentComments = photo.comments;
  shownCommentsCount = 0;

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;
  commentsCount.textContent = currentComments.length;
  socialCaption.textContent = photo.description;

  socialComments.replaceChildren();

  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');

  renderCommentsPortion();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
