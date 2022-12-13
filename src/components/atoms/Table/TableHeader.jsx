import { ModalUploadSheetFollowers, ModalUploadSheetPenerima } from '@/components/molecules';
import React, { useState } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

export const TableHeader = ({
	feature,
	featurePath,
	title,
	description,
	isReadonly,
	seeAllLink,
	showButtonCreate,
	showButtonSeeAll,
	showButtonUploadSheetFollowers,
	showButtonUploadSheetPenerima,
	showButtonCheckout
}) => {
	const location = useLocation();

	const [showModalUploadSheetPenerima, setShowModalUploadSheetPenerima] = useState(false);
	const [showModalUploadSheetFollowers, setShowModalUploadSheetFollowers] = useState(false);

	return (
		<div className="w-full flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
			{showModalUploadSheetFollowers && (
				<ModalUploadSheetFollowers onClose={() => setShowModalUploadSheetFollowers(false)} />
			)}
			{showModalUploadSheetPenerima && (
				<ModalUploadSheetPenerima onClose={() => setShowModalUploadSheetPenerima(false)} />
			)}
			<div>
				<div className="text-xl font-light transform: capitalize">{title}</div>
				<div className="text-sm text-gray-400">{description}</div>
			</div>
			<div className="w-full xl:w-1/2 flex flex-col md:justify-end md:flex-row gap-3">
				{showButtonSeeAll && seeAllLink && (
					<Link
						to={seeAllLink}
						className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 rounded-sm transition-all text-center text-sm"
					>
						<span>Lihat Semua</span>
					</Link>
				)}
				{!isReadonly && showButtonUploadSheetFollowers && (
					<button
						className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all"
						onClick={() => setShowModalUploadSheetFollowers(true)}
					>
						<span className="w-4">
							<SiGooglesheets size={16} />
						</span>
						<span className="text-sm">Upload Followers</span>
					</button>
				)}
				{!isReadonly && showButtonUploadSheetPenerima && (
					<button
						className="bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 flex items-center justify-center rounded-sm transition-all"
						onClick={() => setShowModalUploadSheetPenerima(true)}
					>
						<span className="w-4">
							<SiGooglesheets size={16} />
						</span>
						<span className="text-sm">Upload Penerima Program</span>
					</button>
				)}
				{!isReadonly && showButtonCreate && (
					<Link
						to={`${featurePath || location.pathname}/create`}
						className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 rounded-sm transition-all text-center text-sm"
					>
						<span>Create {feature}</span>
					</Link>
				)}
				{!isReadonly && showButtonCheckout && (
					<Link
						to={`${featurePath || location.pathname}/move`}
						className="flex items-center justify-center bg-green-500 hover:bg-green-600 w-full lg:w-auto space-x-2 text-white px-5 py-3 rounded-sm transition-all text-center text-sm"
					>
						<span>Checkin / Checkout {feature}</span>
					</Link>
				)}
			</div>
		</div>
	);
};

TableHeader.defaultProps = {
	showButtonCreate: true,
	showButtonFilter: false,
	onClickButtonFilter: () => {}
};
