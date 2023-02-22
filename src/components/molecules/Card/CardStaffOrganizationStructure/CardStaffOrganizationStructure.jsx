import { CardOrganizationStructureImage } from '@/components/atoms';
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
		const base64Data = picture.split(',')[1];
		uploadStaffOrganizationStructureImage({ picture: base64Data }, () =>
			setShowModalUploadOrganizationStructure(false)
		);
	};

	useEffect(() => {
		getStaffOrganizationStructureImage();
	}, []);

	return (
		<CardOrganizationStructureImage
			image={staffOrganizationStructureImage}
			showModal={showModalUploadOrganizationStructure}
			setShowModal={setShowModalUploadOrganizationStructure}
			isLoading={fetchingStaffOrganizationStructureImage || processingUploadStaffOrganizationStructureImage}
			onDelete={deleteStaffOrganizationStructureImage}
			onSubmit={handleUpload}
		/>
	);
};
