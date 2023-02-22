import { ModalUploadImage } from '@/components/molecules';
import { useAuthStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { convertFileToBase64 } from '@/utils/helpers';
import { FiUsers } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import { ButtonAction } from '../Button/ButtonAction';

export const CardOrganizationStructureImage = ({
	title,
	description,
	image,
	showModal,
	setShowModal,
	onSubmit,
	isLoading,
	onDelete
}) => {
	const { isAdmin } = useAuthStore();

	const handleUpload = async (file) => {
		const picture = await convertFileToBase64(file);
		onSubmit(picture);
	};

	return (
		<div className="w-full max-w-screen-lg bg-white rounded-md shadow-md">
			{showModal && (
				<ModalUploadImage isLoading={isLoading} onClose={() => setShowModal(false)} onSubmit={handleUpload} />
			)}
			<div className="flex flex-col items-start justify-between w-full gap-4 px-6 py-4 lg:flex-row lg:items-center">
				<div className="w-full xl:w-1/3">
					<div className="text-xl font-light capitalize transform:">{title}</div>
					{description && <div className="text-lg font-light">{description}</div>}
				</div>
				<div className="flex flex-col w-full gap-3 xl:w-1/2 md:justify-end md:flex-row">
					{isAdmin && !isLoading && !image && (
						<button
							className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
							onClick={() => setShowModal(true)}
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
				<div className="flex items-center justify-center">
					{isLoading && <Skeleton height={200} />}
					{!isLoading && !image && (
						<div className="w-full px-4 py-16 text-sm text-center text-gray-400 bg-gray-100 rounded-md">
							No Image Uploaded Yet
						</div>
					)}
					{!isLoading && image && <img className="rounded-md" src={image} alt="" />}
				</div>
				{isAdmin && !isLoading && image && (
					<div className="flex items-center justify-center gap-3 text-sm">
						<ButtonAction action={ACTION_TYPES.UPDATE} onClick={() => setShowModal(true)} />
						<ButtonAction action={ACTION_TYPES.DELETE} onClick={onDelete} />
					</div>
				)}
			</div>
		</div>
	);
};

CardOrganizationStructureImage.defaultProps = {
	title: 'Struktur Organisasi'
};
