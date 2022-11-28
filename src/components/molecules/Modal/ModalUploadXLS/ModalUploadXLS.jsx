import { Modal } from '@/components/atoms';
import { useState } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const ModalUploadXLS = ({ feature, onClose }) => {
	const [file, setFile] = useState(null);

	const handleChangeFile = (event) => {
		const file = event.target.files[0];

		if (file && file.type.indexOf('sheet') === -1 && file.type.indexOf('csv') === -1) {
			toast.warning('File harus format .csv atau .xls');
			event.target.value = '';
			return;
		}

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
		} else onClose();
	};

	return (
		<Modal
			title={`Upload XLS ${feature}`}
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eligendi."
			onClose={handleClose}
		>
			{file && (
				<div className="flex flex-col items-center justify-center space-y-6">
					<div className="flex items-center justify-center space-x-2 text-gray-400">
						<SiGooglesheets size={20} /> <span>{file.name}</span>
					</div>
					<label
						htmlFor="updateSheetFile"
						className="bg-primary px-5 py-2 rounded-sm text-white cursor-pointer hover:bg-primary-400"
					>
						<div>Ubah File</div>
						<input
							type="file"
							id="updateSheetFile"
							accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
							onChange={handleChangeFile}
							className="hidden"
						/>
					</label>
				</div>
			)}
			{!file && (
				<label
					htmlFor="selectSheetFile"
					className="block border border-dashed text-center px-4 py-16 text-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
				>
					<div>UPLOAD HERE</div>
					<input
						type="file"
						id="selectSheetFile"
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						onChange={handleChangeFile}
						className="hidden"
					/>
				</label>
			)}
		</Modal>
	);
};
