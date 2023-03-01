import { CardOrganizationStructureImage } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { useEffect, useState } from 'react';

export const CardProgramOrganizationStructure = () => {
	const {
		programOrganizationStructureImage,
		fetchingProgramOrganizationStructureImage,
		processingUploadProgramOrganizationStructureImage,
		getProgramOrganizationStructureImage,
		uploadProgramOrganizationStructureImage,
		deleteProgramOrganizationStructureImage
	} = useProgramStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	const handleUpload = (picture) => {
		const base64Data = picture.split(',')[1];
		uploadProgramOrganizationStructureImage({ picture: base64Data }, () =>
			setShowModalUploadOrganizationStructure(false)
		);
	};

	useEffect(() => {
		getProgramOrganizationStructureImage();
	}, []);

	return (
		<CardOrganizationStructureImage
			image={programOrganizationStructureImage}
			showModal={showModalUploadOrganizationStructure}
			setShowModal={setShowModalUploadOrganizationStructure}
			isLoading={fetchingProgramOrganizationStructureImage || processingUploadProgramOrganizationStructureImage}
			onDelete={deleteProgramOrganizationStructureImage}
			onSubmit={handleUpload}
		/>
	);
};
