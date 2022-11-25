import React, { useState } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from '../Modal/Modal';

export const TableHeader = ({ title, description, isReadonly }) => {
	const location = useLocation();

	const [showUploadForm, setShowUploadForm] = useState(false);

	return (
		<div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
			{showUploadForm && (
				<Modal
					title="Upload XLS Program"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eligendi."
					onClose={() => setShowUploadForm(false)}
				>
					<label
						htmlFor="uploadXls"
						className="block border border-dashed text-center px-4 py-16 text-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
					>
						<div>UPLOAD HERE</div>
						<input type="file" id="uploadXls" className="hidden" />
					</label>
				</Modal>
			)}
			<div>
				<div className="text-xl font-light">{title}</div>
				<div className="text-sm text-gray-400">{description}</div>
			</div>
			{!isReadonly && (
				<div className="w-full xl:w-1/3 flex flex-col sm:justify-end sm:flex-row gap-3">
					<button
						className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all"
						onClick={() => setShowUploadForm(true)}
					>
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
