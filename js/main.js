import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';
const photos = createPhotos();
renderThumbnails(photos);
