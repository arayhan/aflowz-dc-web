import { ModalUploadSheetFollowers, ModalUploadSheetPenerima } from '@/components/molecules';
import { ButtonPrintCertificateMulti } from '@/components/molecules/index';
import React, { useState } from 'react';
import { SiGooglesheets, SiGroupon } from 'react-icons/si';
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
	showButtonUploadOrganizationStructure,
	showButtonCheckout,
	showCounter,
	setShowModalUploadOrganizationStructure
}) => {
	const location = useLocation();

	const [showModalUploadSheetPenerima, setShowModalUploadSheetPenerima] = useState(false);
	const [showModalUploadSheetFollowers, setShowModalUploadSheetFollowers] = useState(false);

	return (
		<div className="flex flex-col items-start justify-between w-full gap-4 lg:flex-row lg:items-center">
			{showModalUploadSheetFollowers && (
				<ModalUploadSheetFollowers onClose={() => setShowModalUploadSheetFollowers(false)} />
			)}
			{showModalUploadSheetPenerima && (
				<ModalUploadSheetPenerima onClose={() => setShowModalUploadSheetPenerima(false)} />
			)}
			<div className="w-full xl:w-1/3">
				<div className="text-xl font-light capitalize transform:">{title}</div>
				<div className={showCounter ? 'text-lg font-light transform: capitalize' : 'hidden text-sm text-gray-400'}>
					{description}
				</div>
			</div>
			<div className="flex flex-col w-full gap-3 xl:w-1/2 md:justify-end md:flex-row">
				{showButtonSeeAll && seeAllLink && (
					<Link
						to={seeAllLink}
						className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-sm text-center text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
					>
						<span>Lihat Semua</span>
					</Link>
				)}
				{!isReadonly && showButtonUploadSheetFollowers && (
					<button
						className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
						onClick={() => setShowModalUploadSheetFollowers(true)}
					>
						<span className="w-4">
							<SiGooglesheets size={16} />
						</span>
						<span className="text-sm">Upload Followers</span>
					</button>
				)}
				{!isReadonly && showButtonUploadOrganizationStructure && (
					<button
						className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
						onClick={() => setShowModalUploadOrganizationStructure(true)}
					>
						<span className="text-sm">Upload Struktur Organisasi</span>
					</button>
				)}
				{!isReadonly && showButtonUploadSheetPenerima && (
					<>
						{/* <div className="mx-2">
							<ButtonPrintCertificateMulti names={listPenerima} />
						</div> */}
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
							onClick={() => setShowModalUploadSheetPenerima(true)}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Upload Penerima Program</span>
						</button>
					</>
				)}
				{!isReadonly && showButtonCreate && (
					<Link
						to={`${featurePath || location.pathname}/create`}
						className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-sm text-center text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
					>
						<span>Create {feature}</span>
					</Link>
				)}
				{!isReadonly && showButtonCheckout && (
					<Link
						to={`${featurePath || location.pathname}/move`}
						className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-sm text-center text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
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
