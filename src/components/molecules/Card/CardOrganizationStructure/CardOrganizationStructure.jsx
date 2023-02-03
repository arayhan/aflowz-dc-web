import { useAuthStore } from '@/store';
import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { ModalUploadSheetPenerima } from '../../Modal/ModalUploadSheetPenerima/ModalUploadSheetPenerima';

export const CardOrganizationStructure = ({ title, description, type }) => {
	const { isAdmin } = useAuthStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	return (
		<div className="bg-white rounded-md shadow-md">
			{showModalUploadOrganizationStructure && (
				<ModalUploadSheetPenerima onClose={() => setShowModalUploadOrganizationStructure(false)} />
			)}
			<div className="flex flex-col items-start justify-between w-full gap-4 px-6 py-4 lg:flex-row lg:items-center">
				<div className="w-full xl:w-1/3">
					<div className="text-xl font-light capitalize transform:">{title}</div>
					{description && <div className="text-lg font-light">{description}</div>}
				</div>
				<div className="flex flex-col w-full gap-3 xl:w-1/2 md:justify-end md:flex-row">
					{isAdmin && (
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

			<div className="px-6 py-4">test</div>
		</div>
	);
};

CardOrganizationStructure.defaultProps = {
	title: 'Struktur Organisasi'
};
