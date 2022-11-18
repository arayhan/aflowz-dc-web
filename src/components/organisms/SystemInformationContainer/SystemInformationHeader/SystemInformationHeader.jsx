import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderProfileButton } from './HeaderProfileButton/HeaderProfileButton';

export const SystemInformationHeader = () => {
	return (
		<div className="bg-primary-600">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link to={'/'} className="text-white font-extralight text-xl">
						DC Web
					</Link>
					<HeaderProfileButton />
				</div>
			</div>
		</div>
	);
};
