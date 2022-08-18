import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/NewsApiService';
import LoadMoreBtn from './js/loadMoreBtn';
import imagesTpl from './templets/image-cards.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btn: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  event.preventDefault();

  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  if (!newsApiService.searchQuery) {
    Notiflix.Notify.failure('What are we looking for?');
    return;
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();

  newsApiService.fetchImages().then(({ data }) => {
    newsApiService.loadedNow += data.hits.length;

    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${data.total} images.`);
    appendImagesMarkup(data.hits);
    lightbox.refresh();
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
