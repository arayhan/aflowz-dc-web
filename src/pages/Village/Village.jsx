import { BannerFeature, TableVillage } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Village = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Desa" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="container py-16">
				<TableVillage params={params} />
			</div>
		</div>
	);
};

export default Village;
