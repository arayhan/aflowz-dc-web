import { BannerFeature, TablePenerima } from '@/components/molecules';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Penerima = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature
				title={`${params?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE ? 'Calon Penerima' : 'Penerima'} `}
			/>
			<div className="bg-gray-100">
				<div className="container py-6">
					<TablePenerima
						title={`${
							params?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE
								? 'Calon Penerima Program'
								: 'Penerima Program'
						} `}
						isNeedAbort
						params={{ ...params, candidate_status: params?.candidate_status || STATUS_PENERIMA_TYPES.CONFIRMED }}
						displayedColumns={['#', 'NIK', 'NISN', 'Nama Penerima', 'Institusi', 'Alamat', 'Program']}
						isShowBulkDownloadCertificate
					/>
				</div>
			</div>
		</div>
	);
};

export default Penerima;
