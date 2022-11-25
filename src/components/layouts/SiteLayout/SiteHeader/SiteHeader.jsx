import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProfileHeader } from '@/components/molecules';

export const SiteHeader = () => {
	return (
		<div className="bg-primary-600">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link to={'/'} className="text-white font-extralight text-lg md:text-xl">
						DC Web
					</Link>
					<ButtonProfileHeader />
				</div>
			</div>
		</div>
	);
};
