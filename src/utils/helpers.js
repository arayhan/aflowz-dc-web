import { toast } from 'react-toastify';

export const toastRequestResult = (loader, success, successText, failedText) => {
	toast.update(loader, {
		type: success ? 'success' : 'error',
		render: success ? successText || 'Success' : failedText || 'Failed',
		isLoading: false,
		autoClose: 1500
	});
};

export const slugify = (str) =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

export const queryStringToObject = (queryString) => {
	const pairs = queryString.substring(1).split('&');

	const array = pairs.map((el) => {
		const parts = el.split('=');
		return parts;
	});

	return Object.fromEntries(array);
};

export const objectToQueryString = (obj, isEncodeURI = false) => {
	return Object.keys(obj).reduce((str, value, i) => {
		const key = isEncodeURI ? encodeURIComponent(value) : value;
		const val = isEncodeURI ? encodeURIComponent(obj[key]) : obj[key];
		const delimiter = i === 0 ? '?' : '&';
		return [str, delimiter, key, '=', val].join('');
	}, '');
};

export const removeQueryParams = (url, params) => {
	const object = queryStringToObject(url);
	if (params in object) delete object[params];
	const result = objectToQueryString(object);
	return result;
};

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
