import { ModalUploadPartnerSheet } from '@/components/molecules';
import React, { useState } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

export const TableHeader = ({
	feature,
	title,
	description,
	isReadonly,
	showButtonCreate,
	showButtonUploadPartnerSheet
}) => {
	const location = useLocation();

	const [showModalUploadPartnerSheet, setShowModalUploadPartnerSheet] = useState(false);

	return (
		<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
			{showModalUploadPartnerSheet && <ModalUploadPartnerSheet onClose={() => setShowModalUploadPartnerSheet(false)} />}
			<div>
				<div className="text-xl font-light">{title}</div>
				<div className="text-sm text-gray-400">{description}</div>
			</div>
			{!isReadonly && (
				<div className="w-full xl:w-1/3 flex flex-col md:justify-end md:flex-row gap-3">
					{showButtonUploadPartnerSheet && (
						<button
							className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all"
							onClick={() => setShowModalUploadPartnerSheet(true)}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Upload Sheet Penerima Program</span>
						</button>
					)}
					{showButtonCreate && (
						<Link
							to={`${location.pathname}/create`}
							className="block bg-blue-500 hover:bg-blue-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 rounded-sm transition-all text-center text-sm"
						>
							<span>Create {feature}</span>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

TableHeader.defaultProps = {
	showButtonCreate: true
};
