import { CardOrganizationStructure } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import { useEffect, useState } from 'react';

export const CardStaffOrganizationStructure = () => {
	const {
		staffOrganizationStructureImage,
		fetchingStaffOrganizationStructureImage,
		processingUploadStaffOrganizationStructureImage,
		getStaffOrganizationStructureImage,
		uploadStaffOrganizationStructureImage,
		deleteStaffOrganizationStructureImage
	} = usePartnerStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	const handleUpload = (picture) => {
		uploadStaffOrganizationStructureImage({ picture }, () => setShowModalUploadOrganizationStructure(false));
	};

	useEffect(() => {
		getStaffOrganizationStructureImage();
	}, []);

	return (
		<CardOrganizationStructure
			image={staffOrganizationStructureImage}
			showModal={showModalUploadOrganizationStructure}
			setShowModal={setShowModalUploadOrganizationStructure}
			isLoading={fetchingStaffOrganizationStructureImage || processingUploadStaffOrganizationStructureImage}
			onDelete={deleteStaffOrganizationStructureImage}
			onSubmit={handleUpload}
		/>
	);
};
