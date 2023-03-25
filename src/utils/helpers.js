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

	const isEmpty = array[0][0] === '';

	return isEmpty ? '' : Object.fromEntries(array);
};

export const objectToQueryString = (obj, isEncodeURI = false) => {
	return Object.keys(obj).reduce((str, value, i) => {
		const key = isEncodeURI ? encodeURIComponent(value) : value;
		const val = isEncodeURI ? encodeURIComponent(obj[key]) : obj[key];
		const delimiter = i === 0 ? '?' : '&';
		return [str, delimiter, key, '=', val].join('');
	}, '');
};

export const addQueryParams = (url, params) => {
	const queryObject = queryStringToObject(url);
	return objectToQueryString(url ? { ...queryObject, ...params } : params);
};

export const removeQueryParams = (url, params) => {
	const object = queryStringToObject(url);
	if (Object.keys(object).length > 0 && params in object) delete object[params];
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

export const convertFileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

export const createArrayWithRange = (min, max) => {
	const rangeRec = (min, max, vals) => {
		if (min > max) return vals;
		vals.push(min);
		return rangeRec(min + 1, max, vals);
	};

	return rangeRec(min, max, []);
};

export const exportToCsv = (filename, rows) => {
	const processRow = (row) => {
		let finalVal = '';
		for (let j = 0; j < row.length; j += 1) {
			let innerValue = row[j] === null ? '' : row[j].toString();
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			}
			let result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0) result = `"${result}"`;
			if (j > 0) finalVal += ',';
			finalVal += result;
		}
		return `${finalVal}\n`;
	};

	let csvFile = '';
	for (let i = 0; i < rows.length; i += 1) {
		csvFile += processRow(rows[i]);
	}

	const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) {
		// IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		const link = document.createElement('a');

		// feature detection
		// Browsers that support HTML5 download attribute
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};
