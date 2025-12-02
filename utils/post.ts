import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'http://localhost:5000/api/posts';
const API_URL = 'https://social-media-app-backend-khaki.vercel.app/api/auth';
const TOKEN_KEY = "auth_token";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createPost = async (data: {
  content: string;
  image: string;
  isPublic?: boolean;
}) => {
  const res = await api.post('/', data);
  console.log(res)
  return res.data;
};
