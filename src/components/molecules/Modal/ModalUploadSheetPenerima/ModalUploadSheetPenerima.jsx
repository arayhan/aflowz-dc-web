import { Modal } from '@/components/atoms';
import { useState } from 'react';
import * as xlsx from 'xlsx';
import { SiGooglesheets } from 'react-icons/si';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { usePartnerStore, useProgramStore } from '@/store';
import { useNavigate } from 'react-router';
import { isPIP, objectToQueryString } from '@/utils/helpers';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';

export const ModalUploadSheetPenerima = ({ status, onClose }) => {
	const navigate = useNavigate();
	const {
		processingBulkCreatePartner,
		processingBulkCreatePartnerCandidate,
		processingBulkCreatePartnerConfirm,
		bulkCreatePartner,
		bulkCreatePartnerCandidate,
		bulkCreatePartnerConfirm
	} = usePartnerStore();
	const { programDetail } = useProgramStore();

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

				if (json.length > 0) {
					let params;

					if (status === STATUS_PENERIMA_TYPES.CONFIRMED || status === STATUS_PENERIMA_TYPES.CANDIDATE) {
						params = json.map((data) => {
							const allValuesToStringResult = {};
							const neededKeys = [
								'nik_number',
								'nisn_number',
								'program_name',
								'program_periode',
								'program_mitra',
								'account_number',
								'virtual_account',
								'no_sk'
							];

							if (status === STATUS_PENERIMA_TYPES.CONFIRMED || status === STATUS_PENERIMA_TYPES.CANDIDATE) {
								allValuesToStringResult['name'] = data?.name?.toString() || data?.['Nama']?.toString() || '';
								allValuesToStringResult['nisn_number'] =
									data?.nisn_number?.toString() || data?.['NISN']?.toString() || '';
								allValuesToStringResult['mobile'] = data?.mobile?.toString() || data?.['No HP']?.toString() || '';
								allValuesToStringResult['address'] = data?.address?.toString() || data?.['Alamat']?.toString() || '';
								allValuesToStringResult['city'] = data?.city?.toString() || data?.['Kabupaten']?.toString() || '';
								allValuesToStringResult['district'] =
									data?.district?.toString() || data?.['Kecamatan']?.toString() || '';
								allValuesToStringResult['village'] = data?.village?.toString() || data?.['Desa']?.toString() || '';
								allValuesToStringResult['institusi'] =
									data?.institusi?.toString() || data?.['Institusi']?.toString() || '';
								allValuesToStringResult['gender'] = data?.gender?.toString() || data?.['Gender']?.toString() || '';
								allValuesToStringResult['program_periode'] =
									programDetail?.program_periode || data?.program_periode?.toString() || '';
								allValuesToStringResult['staff_name'] = data?.staff_name?.toString() || '';
								allValuesToStringResult['programs'] = [];

								if (isPIP(programDetail?.program_name)) {
									allValuesToStringResult['account_number'] = data?.account_number?.toString() || '';
									allValuesToStringResult['virtual_account'] = data?.virtual_account?.toString() || '';
									allValuesToStringResult['no_sk'] = data?.no_sk?.toString() || '';
								} else {
									allValuesToStringResult['nik_number'] =
										data?.nik_number?.toString() || data?.['NIK']?.toString() || '';
								}

								if (status === STATUS_PENERIMA_TYPES.CANDIDATE) {
									Object.keys(data).forEach((key) => {
										if (!neededKeys.includes(key)) {
											allValuesToStringResult[key] = data[key]?.toString() || '';
										}
									});
								}
							} else {
								Object.keys(data).forEach((key) => {
									allValuesToStringResult[key] = data[key]?.toString() || '';
									allValuesToStringResult['programs'] = [];
								});
							}

							return allValuesToStringResult;
						});
					} else {
						const allValuesToStringResult = {};
						allValuesToStringResult['program_name'] =
							programDetail?.program_name || data?.program_name?.toString() || '';
						allValuesToStringResult['program_mitra'] = 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI';
						allValuesToStringResult['program_periode'] =
							programDetail?.program_periode || data?.program_periode?.toString() || '';

						params = json.map((data) => {
							const allValuesToStringResult = data;
							Object.keys(data).forEach((key) => {
								allValuesToStringResult[key] = data[key]?.toString() || '';
								allValuesToStringResult['programs'] = [];
							});
							return allValuesToStringResult;
						});
					}

					const bulkCreateCallback = ({ payload, success }) => {
						if (success) {
							const queryParams = { order_by: 'create_date', order_by_type: 'desc' };
							const queryString = objectToQueryString(queryParams);
							setErrors(null);
							onClose();
							if (status === STATUS_PENERIMA_TYPES.CONFIRMED) {
								navigate('/penerima' + queryString);
							} else navigate('/program/' + programDetail.program_id);
						} else {
							setErrors(payload);
						}
					};

					if (status === STATUS_PENERIMA_TYPES.CANDIDATE) bulkCreatePartnerCandidate(params, bulkCreateCallback);
					else if (status === STATUS_PENERIMA_TYPES.CONFIRMED) bulkCreatePartnerConfirm(params, bulkCreateCallback);
					else bulkCreatePartner(params, bulkCreateCallback);
				} else {
					toast.warning('Data kosong');
				}
			};
		}
	};

	const handleChangeFile = (event) => {
		const file = event.target.files[0];

		if (file && file.type.indexOf('sheet') === -1 && file.type.indexOf('csv') === -1) {
			toast.warning('File harus format .csv, .xls atau .xlsx');
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
			title={
				status === STATUS_PENERIMA_TYPES.CANDIDATE
					? `Upload Sheet Calon Penerima Program`
					: `Upload Sheet Penerima Program`
			}
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eligendi."
			submitButtonText={'Upload'}
			isLoading={
				processingBulkCreatePartner || processingBulkCreatePartnerCandidate || processingBulkCreatePartnerConfirm
			}
			onSubmit={handleExtractSheetToJSON}
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
									{(error?.name || error?.nik_number) && (
										<div className="text-sm">
											{error.name} - {error.nik_number}
										</div>
									)}
									<div className="p-2 text-xs bg-red-400 rounded-md">
										<div>row {error.data_row} :</div>
										{Object.keys(error.list_error_message).map((key) => (
											<div key={key} className="flex">
												<div className="inline-block">{key}</div>
												<div className="px-2">:</div>
												<div className="inline-block col-span-5">{error.list_error_message[key]}</div>
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
							className="px-5 py-2 text-white rounded-sm cursor-pointer bg-primary hover:bg-primary-400"
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
						className="block px-4 py-16 text-center text-gray-300 border border-dashed rounded-md cursor-pointer hover:bg-gray-100"
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
