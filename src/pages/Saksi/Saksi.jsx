import { BannerFeature } from '@/components/molecules';
import { TableSaksi } from '@/components/molecules/Table/TableSaksi/TableSaksi';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Saksi = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title="List Saksi" />
			<div className="bg-gray-100">
				<div className="container flex flex-col items-center gap-6 py-6">
					<TableSaksi params={params} />
				</div>
			</div>
		</div>
	);
};

export default Saksi;
