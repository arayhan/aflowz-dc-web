import { FaDownload } from 'react-icons/fa';
import { usePartnerStore } from '@/store';
import { toast } from 'react-toastify';

export const ButtonPrintMultiplePenerimaCertificate = ({ params, disabled }) => {
	const { getPenerimaList } = usePartnerStore();

	const handlePrint = () => {
		getPenerimaList({ ...params, offset: 0 }, async ({ success, payload }) => {
			if (success && payload?.items.length > 0) {
				const penerimaIDs = payload?.items.map((item) => item.id);
				const url = `https://dcstg.timtangguhdc.id/web/binary/download_document/dc_partner.download_license_report/${
					params?.program_id
				}/${penerimaIDs.join(',')}`;
				window.open(url, '_blank');
			} else {
				toast.loading(payload?.items.length === 0 ? 'Data is empty' : 'Download Certificate Failed', {
					type: payload?.items.length === 0 ? 'warning' : 'error',
					isLoading: false,
					autoClose: 1500
				});
			}
		});
	};

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
