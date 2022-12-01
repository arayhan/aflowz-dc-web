import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProfileHeader } from '@/components/molecules';
import siteHeaderLogo from '@/images/icons/3.png';

export const SiteHeader = () => {
	return (
		<div className="bg-primary-600">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link to={'/'} className="text-white font-extralight text-lg md:text-xl">
						<img src={siteHeaderLogo} className="max-w-[7rem]" />
					</Link>
					<ButtonProfileHeader />
				</div>
			</div>
		</div>
	);
};
