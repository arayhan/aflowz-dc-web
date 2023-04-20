import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import certif from '@/images/certificate_dc_2020.jpg';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

export const generateCertificate = (name, isBulk = false) => {
	let studentname = name;
	let year = new Date().getFullYear();
	let filename = `sertifikat-${name}-${year}`;
	let doc = new jsPDF('landscape', 'mm', 'a4');
	doc.addImage(certif, 'JPEG', 0, 0, 297, 210); // image certif bisa diganti sesuai dengan kebutuhan
	doc.setFont('times');
	/* Name */
	if (studentname.length > 42) {
		doc.setFontSize(20);
		doc.text(148.5, 103, studentname, 'center');
	} else if (studentname.length > 35 && studentname.length <= 42) {
		doc.setFontSize(22);
		doc.text(148.5, 103, studentname, 'center');
	} else if (studentname.length > 21 && studentname.length <= 35) {
		doc.setFontSize(24);
		doc.text(148.5, 103, studentname, 'center');
	} else if (studentname.length > 0 && studentname.length <= 21) {
		doc.setFontSize(28);
		doc.text(148.5, 103, studentname, 'center');
	}

	if (isBulk) return doc;
	else doc.save(filename + '.pdf');
};

export const generateCertificateBulk = (persons, filename) => {
	const zip = new JSZip();

	persons.forEach((person) => {
		const certificate = generateCertificate(person.name, true);
		if (typeof certificate !== 'undefined') {
			try {
				zip.file(person.name + '.pdf', certificate.output('blob'));
			} catch {
				console.log('Something went wrong!');
			}
		}
	});

	zip.generateAsync({ type: 'blob' }).then(function (content) {
		saveAs(content, `${filename}.zip`);
	});
};
