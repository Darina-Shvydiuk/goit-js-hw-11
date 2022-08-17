import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29314229-ace3923ce808763a4f54eb251';

export async function fetchImages(queryUser) {
  const options = {
    key: API_KEY,
    q: queryUser,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(`${BASE_URL}?${options}`);
  return response.data;
}
