import { BannerFeature, TablePenerima } from '@/components/molecules';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Penerima = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	const IS_ANONYMOUS_DATA = Boolean(params.is_no_nik_number && params.is_no_nisn_number);

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature
				title={`${
					params?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE
						? 'Calon Penerima'
						: IS_ANONYMOUS_DATA
						? 'Penerima Anonymous'
						: 'Penerima'
				} `}
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
						params={{
							...params,
							...(IS_ANONYMOUS_DATA
								? { is_receiver: true }
								: { candidate_status: params?.candidate_status || STATUS_PENERIMA_TYPES.CONFIRMED })
						}}
						displayedColumns={[
							'#',
							'NIK',
							'NISN',
							'Nama Penerima',
							'Institusi',
							'Alamat',
							'Program',
							'Jumlah Followers'
						]}
						isKIP
						isPIP
						isShowButtonUploadAnonymousData
						isShowButtonSeeAnonymousData
						isShowBulkDownloadCertificate
					/>
				</div>
			</div>
		</div>
	);
};

export default Penerima;
