import axios from 'axios';

const http = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'API-KEY': process.env.REACT_APP_API_KEY
	}
});

export { http };
