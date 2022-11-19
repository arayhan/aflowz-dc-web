import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { IoMdClose, IoMdWarning, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdErrorOutline, MdInfoOutline } from 'react-icons/md';
import classNames from 'classnames';
import reportWebVitals from './reportWebVitals';
import { VARIANT_TYPES } from './utils/constants';
import App from '@/App';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AlertTemplate = ({ style, options, message, close }) => {
	const variantClasses = classNames({
		'bg-red-500 text-white': options.type === VARIANT_TYPES.ERROR || options.type === VARIANT_TYPES.DANGER,
		'bg-blue-500 text-white': options.type === VARIANT_TYPES.INFO,
		'bg-gray-100 text-gray-800': options.type === VARIANT_TYPES.LOADING,
		'bg-green-500 text-white': options.type === VARIANT_TYPES.SUCCESS,
		'bg-yellow-500 text-white': options.type === VARIANT_TYPES.WARNING
	});
	return (
		<div className="fixed top-4 right-4">
			<div className={`flex items-center px-3 py-2 rounded-md space-x-3 ${variantClasses}`}>
				<div className="flex items-center space-x-2">
					<span>
						{options.type === VARIANT_TYPES.ERROR && <MdErrorOutline />}
						{options.type === VARIANT_TYPES.DANGER && <MdErrorOutline />}
						{options.type === VARIANT_TYPES.INFO && <MdInfoOutline />}
						{options.type === VARIANT_TYPES.LOADING && <BiLoaderAlt />}
						{options.type === VARIANT_TYPES.SUCCESS && <IoMdCheckmarkCircleOutline />}
						{options.type === VARIANT_TYPES.WARNING && <IoMdWarning />}
					</span>
					<span>{message}</span>
				</div>
				<button className="p-2 rounded-md hover:bg-white hover:bg-opacity-10" onClick={close}>
					<IoMdClose />
				</button>
			</div>
		</div>
	);
};

root.render(
	<BrowserRouter>
		<ToastContainer />
		<App />
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
