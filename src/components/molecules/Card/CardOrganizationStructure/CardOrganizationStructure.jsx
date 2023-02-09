import { ButtonAction } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES, ORGANIZATION_TYPE } from '@/utils/constants';
import { convertBase64, convertFileToBase64 } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import { ModalUploadImage } from '../../Modal/ModalUploadImage/ModalUploadImage';

export const CardOrganizationStructure = ({ title, description, type }) => {
	const { isAdmin } = useAuthStore();
	const {
		staffOrganizationStructureImage,
		fetchingStaffOrganizationStructureImage,
		processingUploadStaffOrganizationStructureImage,
		getStaffOrganizationStructureImage,
		uploadStaffOrganizationStructureImage,
		deleteStaffOrganizationStructureImage
	} = usePartnerStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	const handleUpload = async (file) => {
		const picture = await convertFileToBase64(file);

		if (type === ORGANIZATION_TYPE.TIM_INTERNAL) {
			uploadStaffOrganizationStructureImage({ picture }, () => setShowModalUploadOrganizationStructure(false));
		}
	};

	useEffect(() => {
		if (type === ORGANIZATION_TYPE.TIM_INTERNAL) getStaffOrganizationStructureImage();
	}, [type]);

	return (
		<div className="w-full max-w-screen-lg bg-white rounded-md shadow-md">
			{showModalUploadOrganizationStructure && (
				<ModalUploadImage
					isLoading={processingUploadStaffOrganizationStructureImage}
					onClose={() => setShowModalUploadOrganizationStructure(false)}
					onSubmit={handleUpload}
				/>
			)}
			<div className="flex flex-col items-start justify-between w-full gap-4 px-6 py-4 lg:flex-row lg:items-center">
				<div className="w-full xl:w-1/3">
					<div className="text-xl font-light capitalize transform:">{title}</div>
					{description && <div className="text-lg font-light">{description}</div>}
				</div>
				<div className="flex flex-col w-full gap-3 xl:w-1/2 md:justify-end md:flex-row">
					{isAdmin && !fetchingStaffOrganizationStructureImage && !staffOrganizationStructureImage && (
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
							onClick={() => setShowModalUploadOrganizationStructure(true)}
						>
							<span className="w-4">
								<FiUsers size={16} />
							</span>
							<span className="text-sm">Upload Struktur Organisasi</span>
						</button>
					)}
				</div>
			</div>

			<hr />

			<div className="px-6 py-4 space-y-4">
				<div>
					{fetchingStaffOrganizationStructureImage && <Skeleton height={200} />}
					{!fetchingStaffOrganizationStructureImage && !staffOrganizationStructureImage && (
						<div className="px-4 py-16 text-sm text-center text-gray-400 bg-gray-100 rounded-md">
							No Image Uploaded Yet
						</div>
					)}
					{!fetchingStaffOrganizationStructureImage && staffOrganizationStructureImage && (
						<img
							className="rounded-md"
							src="https://slidemodel.com/wp-content/uploads/01-organizational-structures-charts-cover-1.png"
							alt=""
						/>
					)}
				</div>
				{isAdmin && !fetchingStaffOrganizationStructureImage && staffOrganizationStructureImage && (
					<div className="flex items-center justify-center gap-3 text-sm">
						<ButtonAction action={ACTION_TYPES.UPDATE} onClick={() => setShowModalUploadOrganizationStructure(true)} />
						<ButtonAction action={ACTION_TYPES.DELETE} onClick={deleteStaffOrganizationStructureImage} />
					</div>
				)}
			</div>
		</div>
	);
};

CardOrganizationStructure.defaultProps = {
	title: 'Struktur Organisasi'
};
