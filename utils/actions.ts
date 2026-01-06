import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://social-media-app-backend-khaki.vercel.app/api/actions';
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

export const likePost = async (postId: string) => {
    try {
        const res = await api.post(`/posts/${postId}/like`);
        return res.data;
    } catch (error: any) {
        console.error('Error liking post:', error);
        throw error;
    }
};

export const createComment = async (postId: string, content: string, commentId?: string) => {
    try {
        const apiUrl = commentId ? `/posts/${postId}/comments/${commentId}/reply` : `/posts/${postId}/comment`
        const res = await api.post(apiUrl, { content });
        return res.data;
    } catch (error: any) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const getComments = async (postId: string) => {
    try {
        const res = await api.get(`/posts/${postId}/comments`);

        console.log(res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
