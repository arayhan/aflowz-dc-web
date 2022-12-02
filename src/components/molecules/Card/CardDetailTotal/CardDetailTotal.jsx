import { Button } from '@/components/atoms';
import React from 'react';

export const CardDetailTotal = ({ value, title, buttonText, linkTo }) => {
	return (
		<div className="bg-white rounded-md">
			<div className="flex flex-col items-center justify-center space-y-1 text-center px-10 md:px-16 py-6">
				<span className="text-2xl md:text-4xl font-extralight">{value}</span>
				<div className="font-light text-gray-400">{title}</div>
			</div>
			<hr />
			<div className="p-3">
				<Button className={'w-full px-5 py-2 rounded-sm text-sm'} linkTo={linkTo} variant={'info'}>
					{buttonText || 'Lihat Semua'}
				</Button>
			</div>
		</div>
	);
};
