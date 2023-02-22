import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/dewi-coryati/api/v1`;

const http = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		'API-KEY': process.env.REACT_APP_API_KEY
	}
});

export { http, baseURL };
