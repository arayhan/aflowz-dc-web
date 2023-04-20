import React, { useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useKonstituenStore, usePartnerStore, useProgramStore } from '@/store';
import { toast } from 'react-toastify';
import { generateCertificateBulk } from '@/utils/helpers';

export const ButtonPrintMultiplePenerimaCertificate = ({ params, disabled }) => {
	const { getPenerimaList } = usePartnerStore();
	const { konstituen, getKonstituen } = useKonstituenStore();
	const { program, getProgram } = useProgramStore();

	const handlePrint = () => {
		const loader = toast.loading('Downloading...');
		getPenerimaList({ ...params, offset: 0, limit: 1000 }, ({ success, payload }) => {
			if (success && payload?.items.length > 0) {
				toast.update(loader, { render: 'Zipping...', isLoading: true });
				generateCertificateBulk(payload.items, `Sertifikat - ${program.name} - ${konstituen.name}`);
				toast.update(loader, { type: 'success', render: 'Certificate Downloaded', isLoading: false, autoClose: 1500 });
			} else {
				toast.update(loader, {
					type: 'error',
					render: 'Download Certificate Failed',
					isLoading: false,
					autoClose: 1500
				});
			}
		});
	};

	useEffect(() => {
		if (params?.konstituen_id) getKonstituen(params?.konstituen_id);
		if (params?.program_id) getProgram(params?.program_id);
	}, [params]);

	return (
		<div>
			<button
				className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-sm text-white transition-all bg-green-500 rounded-sm disabled:bg-green-300 hover:bg-green-600 lg:w-auto"
				onClick={handlePrint}
				disabled={disabled}
			>
				<span className="w-5">
					<FaDownload />
				</span>
				<span>Bulk Download Sertifikat</span>
			</button>
		</div>
	);
};
