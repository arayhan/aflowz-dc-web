import { BannerFeature, TablePenerima } from '@/components/molecules';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { queryStringToObject } from '@/utils/helpers';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Penerima = () => {
	const { search } = useLocation();

	const PARAMS = search ? queryStringToObject(search) : {};
	const IS_ANONYMOUS_DATA = Boolean(PARAMS.is_no_nik_number && PARAMS.is_no_nisn_number);

	return (
		<div>
			<BannerFeature
				title={`${
					PARAMS?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE
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
							PARAMS?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE
								? 'Calon Penerima Program'
								: 'Penerima Program'
						} `}
						isNeedAbort
						params={{
							...PARAMS,
							...(IS_ANONYMOUS_DATA
								? { is_receiver: true }
								: { candidate_status: PARAMS?.candidate_status || STATUS_PENERIMA_TYPES.CONFIRMED })
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
