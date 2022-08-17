import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29314229-ace3923ce808763a4f54eb251';
const SEARCH_PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalPage = 0;
  }

  async fetchImages() {
    try {
      const searchOptions = {
        params: {
          ...SEARCH_PARAMS,
          q: this.searchQuery,
          page: this.page,
          per_page: this.per_page,
        },
      };

      this.incrementPage();
      const url = `${BASE_URL}?key=${API_KEY}`;
      return axios.get(url, searchOptions);
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
