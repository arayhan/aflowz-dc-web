import { BannerFeature, TablePenerima } from '@/components/molecules';
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
			<BannerFeature title="Penerima" />
			<div className="bg-gray-100">
				<div className="container py-6">
					<TablePenerima
						params={{ ...params, is_staff: false, is_receiver: true }}
						displayedColumns={['#', 'NIK', 'Nama Penerima', 'Institusi', 'Alamat', 'Detail']}
					/>
				</div>
			</div>
		</div>
	);
};

export default Penerima;
