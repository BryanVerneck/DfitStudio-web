import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://dfitstudio-api.onrender.com',
});
