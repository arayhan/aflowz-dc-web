import { CardOrganizationStructureImage } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { useEffect, useState } from 'react';

export const CardProgramCategoryOrganizationStructure = ({ programCategoryID }) => {
	const {
		programCategoryOrganizationStructureImage,
		fetchingProgramCategoryOrganizationStructureImage,
		processingUploadProgramCategoryOrganizationStructureImage,
		getProgramCategoryOrganizationStructureImage,
		uploadProgramCategoryOrganizationStructureImage,
		deleteProgramCategoryOrganizationStructureImage
	} = useProgramStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	const handleUpload = (picture) => {
		const base64Data = picture.split(',')[1];
		uploadProgramCategoryOrganizationStructureImage(programCategoryID, { picture: base64Data }, () =>
			setShowModalUploadOrganizationStructure(false)
		);
	};

	useEffect(() => {
		getProgramCategoryOrganizationStructureImage(programCategoryID);
	}, []);

	return (
		<CardOrganizationStructureImage
			image={programCategoryOrganizationStructureImage}
			showModal={showModalUploadOrganizationStructure}
			setShowModal={setShowModalUploadOrganizationStructure}
			isLoading={
				fetchingProgramCategoryOrganizationStructureImage || processingUploadProgramCategoryOrganizationStructureImage
			}
			onDelete={deleteProgramCategoryOrganizationStructureImage}
			onSubmit={handleUpload}
		/>
	);
};
