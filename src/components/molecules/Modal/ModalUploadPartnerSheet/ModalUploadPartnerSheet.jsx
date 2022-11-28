import { Modal } from '@/components/atoms';
import { useState } from 'react';
import * as xlsx from 'xlsx';
import { SiGooglesheets } from 'react-icons/si';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { usePartnerStore } from '@/store';
import { useNavigate } from 'react-router';
import { objectToQueryString } from '@/utils/helpers';

export const ModalUploadPartnerSheet = ({ onClose }) => {
	const navigate = useNavigate();
	const { processingBulkCreatePartner, bulkCreatePartner } = usePartnerStore();

	const MAXIMUM_FILE_SIZE = {
		text: '10MB',
		value: 10 * 1024 * 1024
	};

	const [errors, setErrors] = useState(null);
	const [file, setFile] = useState(null);

	const handleExtractSheetToJSON = () => {
		if (file) {
			const reader = new FileReader();

			reader.readAsArrayBuffer(file);
			reader.onload = (event) => {
				const data = event.target.result;
				const workbook = xlsx.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);

				const params = json.map((data) => {
					const allValuesToStringResult = data;
					Object.keys(data).forEach((key) => {
						allValuesToStringResult[key] = data[key].toString();
					});
					return allValuesToStringResult;
				});

				bulkCreatePartner(params, ({ payload, success }) => {
					if (success) {
						const queryParams = { order_by: 'create_date', order_by_type: 'desc' };
						const queryString = objectToQueryString(queryParams);
						setErrors(null);
						navigate('/partner' + queryString);
					} else {
						setErrors(payload);
					}
				});
			};
		}
	};

	const handleChangeFile = (event) => {
		const file = event.target.files[0];

		if (file && file.type.indexOf('sheet') === -1 && file.type.indexOf('csv') === -1) {
			toast.warning('File harus format .csv atau .xls');
			event.target.value = '';
			return;
		} else if (file && file.size > MAXIMUM_FILE_SIZE.value) {
			toast.warning(`File tidak boleh lebih dari ${MAXIMUM_FILE_SIZE.text}`);
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
		} else if (!errors) {
			onClose();
		} else return undefined;
	};

	return (
		<Modal
			title={`Upload Sheet Penerima Program`}
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eligendi."
			submitButtonText={'Upload'}
			isLoading={processingBulkCreatePartner}
			onSubmit={handleExtractSheetToJSON}
			onClose={handleClose}
		>
			<div className="space-y-6">
				{errors && (
					<div className="bg-red-500 text-white rounded-md overflow-y-scroll max-h-[300px]">
						<div className="p-3">Errors :</div>
						<hr className="border-red-400" />
						<div className="p-3 space-y-2">
							{errors.map((error) => (
								<div key={error.nik_number} className="space-y-2">
									<div className="text-sm">
										{error.name} - {error.nik_number}
									</div>
									<div className="text-xs bg-red-400 p-2 rounded-md">
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
			</div>
		</Modal>
	);
};
