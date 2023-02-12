import { CardOrganizationStructure } from '@/components/atoms';
import { usePartnerStore, useProgramStore } from '@/store';
import { useEffect, useState } from 'react';

export const CardProgramCategoryOrganizationStructure = () => {
	const {
		staffOrganizationStructureImage,
		fetchingStaffOrganizationStructureImage,
		processingUploadStaffOrganizationStructureImage,
		getStaffOrganizationStructureImage,
		uploadStaffOrganizationStructureImage,
		deleteStaffOrganizationStructureImage
	} = usePartnerStore();

	const {
		programCategoryOrganizationStructure,
		fetchingProgramCategoryOrganizationStructure,
		processingUploadProgramCategoryOrganizationStructure,
		getProgramCategoryOrganizationStructure,
		updateProgramCategoryOrganizationStructure,
		deleteProgramCategoryOrganizationStructure
	} = useProgramStore();

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
