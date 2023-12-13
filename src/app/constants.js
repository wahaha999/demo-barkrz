import axios from "axios";

// export const API_URL = 'https://barkrz-backend-staging.herokuapp.com/api/';
// export const BASE_URL = 'https://barkrz-backend-staging.herokuapp.com/';

export const API_URL = "https://admin.barkrz.com/api/";
export const BASE_URL = "https://admin.barkrz.com/";
export const KLAVIYO_URL = "https://a.klaviyo.com/api/v2/"

// export const API_URL = "http://localhost:8000/api/";
// export const BASE_URL = 'http://localhost:8000/';

// export const API_URL = 'https://192.168.6.216/api/';
// export const BASE_URL = 'https://192.168.6.216/';

export const get = async (endpoint, header) => {
  return axios.get(`${API_URL}${endpoint}`, header);
};

export const post = async (endpoint, data, options) => {
  return axios.post(`${API_URL}${endpoint}`, data, options);
};

export const klaviyoPost = async (endpoint, data, options) => {
  return axios.post(`${KLAVIYO_URL}${endpoint}`, data, options);
};

export const temperamentArr = {
  friendly: "Friendly",
  withkids: "With Kids",
  withdogs: "With Dogs",
  withcats: "With Cats",
  skittish: "Skittish",
  aggressive: "Aggressive",
  calm: "Calm",
  playful: "Playful",
};

export const temperamentIcons = [
  "fa-heart",
  "fa-heart",
  "fa-bone",
  "fa-heart",
  "fa-grin-beam",
  "fa-heart",
  "fa-heart",
  "fa-heart",
];
