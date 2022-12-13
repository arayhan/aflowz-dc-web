import { BannerFeature, TableActivity } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Activity = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Kegiatan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="container py-16">
				<TableActivity params={params} />
			</div>
		</div>
	);
};

export default Activity;
