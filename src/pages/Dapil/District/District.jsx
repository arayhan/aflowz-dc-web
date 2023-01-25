import { BannerFeature } from '@/components/molecules';
import { TableDistrict } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const District = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Kecamatan" />
			<div className="container py-16">
				<TableDistrict params={params} />
			</div>
		</div>
	);
};

export default District;
