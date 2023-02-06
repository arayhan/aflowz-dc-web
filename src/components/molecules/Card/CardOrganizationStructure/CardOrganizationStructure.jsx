import { ButtonAction } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { ModalUploadImage } from '../../Modal/ModalUploadImage/ModalUploadImage';

export const CardOrganizationStructure = ({ title, description, type, handleDelete }) => {
	const { isAdmin } = useAuthStore();

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	return (
		<div className="max-w-screen-lg bg-white rounded-md shadow-md">
			{showModalUploadOrganizationStructure && (
				<ModalUploadImage onClose={() => setShowModalUploadOrganizationStructure(false)} />
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

			<div className="px-6 py-4 space-y-4">
				<div>
					<img
						className="rounded-md"
						src="https://slidemodel.com/wp-content/uploads/01-organizational-structures-charts-cover-1.png"
						alt=""
					/>
				</div>
				<div className="flex flex-col text-sm">
					<div className="grid items-center w-full grid-cols-3 hover:md:bg-gray-50">
						<div className="font-semibold sm:border-r sm:px-3 sm:py-1">PIC</div>
						<div className="flex items-center justify-between col-span-2 gap-4 sm:py-3 sm:px-6">
							<div>John Doe</div>
							<div className="flex gap-2">
								<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/staff/1`} />
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/staff/update/1`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => handleDelete(row.row.original.id)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CardOrganizationStructure.defaultProps = {
	title: 'Struktur Organisasi'
};
