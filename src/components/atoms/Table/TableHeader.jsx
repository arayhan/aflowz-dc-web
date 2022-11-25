import React from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

export const TableHeader = ({ title, description, isReadonly }) => {
	const location = useLocation();

	return (
		<div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
			<div>
				<div className="text-xl font-light">{title}</div>
				<div className="text-sm text-gray-400">{description}</div>
			</div>
			{isReadonly && (
				<div className="w-full xl:w-1/3 flex flex-col sm:justify-end sm:flex-row gap-3">
					<button className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all">
						<span className="w-4">
							<SiGooglesheets size={16} />
						</span>
						<span className="text-sm">Upload XLS</span>
					</button>
					<Link
						to={`${location.pathname}/create`}
						className="block bg-blue-500 hover:bg-blue-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 rounded-sm transition-all text-center text-sm"
					>
						<span>Create Program</span>
					</Link>
				</div>
			)}
		</div>
	);
};
