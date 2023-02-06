import { Modal } from '@/components/atoms';
import { useState } from 'react';
import { SiImagej } from 'react-icons/si';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { usePartnerStore } from '@/store';
import { useNavigate } from 'react-router';
import { objectToQueryString } from '@/utils/helpers';
import { BiImage } from 'react-icons/bi';

export const ModalUploadImage = ({ onClose }) => {
	const navigate = useNavigate();
	const { processingBulkCreatePartner, bulkCreatePartner } = usePartnerStore();

	const ALLOWED_IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.svg'];
	const MAXIMUM_FILE_SIZE = {
		text: '10MB',
		value: 10 * 1024 * 1024
	};

	const [errors, setErrors] = useState(null);
	const [file, setFile] = useState(null);

	const handleUpload = () => {
		if (file) {
			console.log({ file });
		}
	};

	const handleChangeFile = (event) => {
		const file = event.target.files[0];
		const ext = file.name.split('.').pop();

		if (file && !ALLOWED_IMAGE_EXTENSIONS.includes(`.${ext}`)) {
			toast.warning('File harus format gambar');
			event.target.value = '';
			return;
		} else if (file && file.size > MAXIMUM_FILE_SIZE.value) {
			toast.warning(`File tidak boleh lebih dari ${MAXIMUM_FILE_SIZE.text}`);
			event.target.value = '';
			return;
		}

		setErrors(null);
		setFile(file);
	};

	const handleClose = () => {
		if (file) {
			Swal.fire({
				title: 'Apakah anda yakin ingin membatalkan?',
				text: 'File yang sudah anda input akan direset',
				icon: 'warning',
				showCancelButton: true
			}).then((result) => {
				if (result.isConfirmed) {
					onClose();
				}
			});
		} else if (!errors) {
			onClose();
		} else return undefined;
	};

	return (
		<Modal
			title={`Upload Struktur Organisasi`}
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eligendi."
			submitButtonText={'Upload'}
			isLoading={processingBulkCreatePartner}
			onSubmit={handleUpload}
			onClose={handleClose}
		>
			<div className="space-y-6">
				{errors && errors.length > 0 && (
					<div className="bg-red-500 text-white rounded-md overflow-y-scroll max-h-[300px]">
						<div className="p-3">Errors :</div>
						<hr className="border-red-400" />
						<div className="p-3 space-y-2">
							{errors.map((error) => (
								<div key={error.nik_number} className="space-y-2">
									<div className="text-sm">
										{error.name} - {error.nik_number}
									</div>
									<div className="p-2 text-xs bg-red-400 rounded-md">
										{Object.keys(error.list_error_message).map((key) => (
											<div key={key} className="grid grid-cols-6">
												<span>{key}</span>
												<span className="col-span-5">{error.list_error_message[key]}</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{file && (
					<div className="flex flex-col items-center justify-center space-y-6">
						<div className="overflow-y-scroll h-96">
							<img src={URL.createObjectURL(file)} alt="struktur organisasi" />
						</div>
						<div className="flex items-center justify-center space-x-2 text-gray-400">
							<BiImage size={20} /> <span>{file.name}</span>
						</div>
						<label
							htmlFor="updateImageFile"
							className="px-5 py-2 text-white rounded-sm cursor-pointer bg-primary hover:bg-primary-400"
						>
							<div>Ubah File</div>
							<input
								type="file"
								id="updateImageFile"
								accept={ALLOWED_IMAGE_EXTENSIONS.join(', ')}
								onChange={handleChangeFile}
								className="hidden"
							/>
						</label>
					</div>
				)}
				{!file && (
					<label
						htmlFor="selectImageFile"
						className="block px-4 py-16 text-center text-gray-300 border border-dashed rounded-md cursor-pointer hover:bg-gray-100"
					>
						<div>UPLOAD HERE</div>
						<input
							type="file"
							id="selectImageFile"
							accept={ALLOWED_IMAGE_EXTENSIONS.join(', ')}
							onChange={handleChangeFile}
							className="hidden"
						/>
					</label>
				)}
			</div>
		</Modal>
	);
};
