import { Modal } from '@/components/atoms';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { BiImage } from 'react-icons/bi';
import { convertFileToBase64 } from '@/utils/helpers';

export const ModalUploadImage = ({ isLoading, onClose, onSubmit }) => {
	const ALLOWED_IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.svg'];
	const MAXIMUM_FILE_SIZE = {
		text: '10MB',
		value: 10 * 1024 * 1024
	};

	const [errors, setErrors] = useState(null);
	const [base64File, setBase64File] = useState(null);
	const [file, setFile] = useState(null);

	const handleUpload = () => {
		if (file) onSubmit(file);
	};

	const handleChangeFile = async (event) => {
		const file = event.target.files[0];
		const ext = file.name.split('.').pop();
		const base64 = await convertFileToBase64(file);

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
		setBase64File(base64);
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
			isLoading={isLoading}
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
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="overflow-y-scroll h-[350px]">
							<img src={URL.createObjectURL(file)} alt="struktur organisasi" />
						</div>
						<div className="flex items-center gap-4">
							<div className="text-gray-400">
								<BiImage size={20} />
							</div>
							<div className="text-sm text-gray-400 break-all">{file.name}</div>
							<label
								htmlFor="updateImageFile"
								className="px-5 py-2 text-sm text-white rounded-sm cursor-pointer bg-primary hover:bg-primary-400 min-w-[100px] text-center"
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
