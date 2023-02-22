import { CardOrganizationStructureImage } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { useState } from 'react';

export const CardProgramCategoryOrganizationStructure = ({ programCategoryID }) => {
	const {
		programCategoryDetail,
		fetchingProgramCategoryOrganizationStructureImage,
		processingUploadProgramCategoryOrganizationStructureImage,
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

	return (
		<CardOrganizationStructureImage
			image={programCategoryDetail?.image_url}
			showModal={showModalUploadOrganizationStructure}
			setShowModal={setShowModalUploadOrganizationStructure}
			isLoading={
				fetchingProgramCategoryOrganizationStructureImage || processingUploadProgramCategoryOrganizationStructureImage
			}
			hideDeleteButton
			onDelete={() => deleteProgramCategoryOrganizationStructureImage(programCategoryID)}
			onSubmit={handleUpload}
		/>
	);
};
