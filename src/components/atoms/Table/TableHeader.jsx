import {
	ModalUploadSheetFollowers,
	ModalUploadSheetKonstituen,
	ModalUploadSheetPenerima
} from '@/components/molecules';
import { useProgramStore } from '@/store';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { queryStringToObject } from '@/utils/helpers';
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
	onClickDownloadData,
	showButtonCreate,
	showButtonSeeAll,
	showButtonDownloadData,
	showButtonUploadSheetKandidat,
	showButtonUploadSheetFollowers,
	showButtonUploadSheetPenerimaGeneral,
	showButtonUploadSheetPenerimaConfirmed,
	showButtonUploadSheetKonstituen,
	showButtonUploadOrganizationStructure,
	showButtonCheckout,
	showCounter,
	setShowModalUploadOrganizationStructure
}) => {
	const location = useLocation();
	const params = location.search ? queryStringToObject(location.search) : {};

	const { programDetail } = useProgramStore();

	const isPIP =
		programDetail?.program_name?.toLowerCase().includes('pip') ||
		params?.keyword?.toLowerCase().includes('pip') ||
		false;
	const isKIP =
		programDetail?.program_name?.toLowerCase().includes('kip') ||
		params?.keyword?.toLowerCase().includes('kip') ||
		false;
	const isPIPorKIP = isPIP || isKIP || false;

	const [showModalUploadSheetKandidat, setShowModalUploadSheetKandidat] = useState(false);
	const [showModalUploadSheetPenerima, setShowModalUploadSheetPenerima] = useState(false);
	const [showModalUploadSheetPenerimaGeneral, setShowModalUploadSheetPenerimaGeneral] = useState(false);
	const [showModalUploadSheetFollowers, setShowModalUploadSheetFollowers] = useState(false);
	const [showModalUploadSheetKonstituen, setShowModalUploadSheetKonstituen] = useState(false);

	return (
		<div className="flex flex-col items-start justify-between w-full gap-4 lg:flex-row lg:items-center">
			{showModalUploadSheetKandidat && (
				<ModalUploadSheetPenerima
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					status={STATUS_PENERIMA_TYPES.CANDIDATE}
					onClose={() => setShowModalUploadSheetKandidat(false)}
				/>
			)}
			{showModalUploadSheetFollowers && (
				<ModalUploadSheetFollowers
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					onClose={() => setShowModalUploadSheetFollowers(false)}
				/>
			)}
			{showModalUploadSheetPenerimaGeneral && (
				<ModalUploadSheetPenerima
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					onClose={() => setShowModalUploadSheetPenerimaGeneral(false)}
				/>
			)}
			{showModalUploadSheetPenerima && (
				<ModalUploadSheetPenerima
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					status={statusPenerima}
					onClose={() => setShowModalUploadSheetPenerima(false)}
				/>
			)}
			{showModalUploadSheetKonstituen && (
				<ModalUploadSheetKonstituen onClose={() => setShowModalUploadSheetKonstituen(false)} />
			)}
			<div className="w-full xl:w-1/2">
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
				{showButtonDownloadData && (
					<>
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
							onClick={onClickDownloadData}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Download Data</span>
						</button>
					</>
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
				{!isReadonly && showButtonUploadSheetKandidat && (
					<>
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
							onClick={() => setShowModalUploadSheetKandidat(true)}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Upload Usulan</span>
						</button>
					</>
				)}
				{!isReadonly && showButtonUploadSheetPenerimaGeneral && (
					<>
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
							onClick={() => setShowModalUploadSheetPenerimaGeneral(true)}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Upload Penerima Program</span>
						</button>
					</>
				)}
				{!isReadonly && showButtonUploadSheetPenerimaConfirmed && (
					<>
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
				{!isReadonly && showButtonUploadSheetKonstituen && (
					<>
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
							onClick={() => setShowModalUploadSheetKonstituen(true)}
						>
							<span className="w-4">
								<SiGooglesheets size={16} />
							</span>
							<span className="text-sm">Upload Konstituen Program</span>
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
