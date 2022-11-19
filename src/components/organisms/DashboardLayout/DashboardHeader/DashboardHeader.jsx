import { ButtonProfileHeader } from '@/components/molecules';
import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardHeader = () => {
	return (
		<div>
			<div className="bg-primary-600">
				<div className="container">
					<div className="flex items-center justify-between">
						<Link to={'/'} className="text-white font-extralight text-xl">
							DC Web
						</Link>
						<ButtonProfileHeader />
					</div>
				</div>
			</div>
		</div>
	);
};
