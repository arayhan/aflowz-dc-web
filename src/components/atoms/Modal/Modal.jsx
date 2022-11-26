import React from 'react';
import { Button } from '../Button/Button';

export const Modal = ({ title, description, children, onClose }) => {
	return (
		<div className="fixed left-0 top-0 w-full h-screen flex items-center justify-center">
			<div onClick={onClose} className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30" />
			<div className="relative bg-white rounded-md shadow-md w-full max-w-screen-lg m-8">
				<div className="p-8">
					<div className="text-xl font-light">{title}</div>
					<div className="text-gray-400">{description}</div>
				</div>
				<hr />
				<div className="p-8">{children}</div>
				<hr />
				<div className="p-8 flex items-center justify-between">
					<Button className={'px-6 py-2 rounded-sm'} variant={'danger'} onClick={onClose}>
						Cancel
					</Button>
					<Button className={'px-6 py-2 rounded-sm'} variant={'primary'}>
						Upload
					</Button>
				</div>
			</div>
		</div>
	);
};
