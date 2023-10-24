import { Button } from '@/components/atoms';
import React from 'react';

export const CardDetailTotal = ({ value, title, buttonText, linkTo, className = '' }) => {
	return (
		<div className={`bg-white rounded-md ${className}`}>
			<div className="flex flex-col items-center justify-center px-3 py-6 space-y-1 text-center">
				<span className="text-2xl md:text-4xl font-extralight">{value}</span>
				<div className="text-sm font-light text-gray-400">{title}</div>
			</div>
			{linkTo && (
				<>
					<hr />
					<div className="p-3">
						<Button className={'w-full px-5 py-2 rounded-sm text-sm'} linkTo={linkTo} variant={'info'}>
							{buttonText || 'Lihat Semua'}
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
