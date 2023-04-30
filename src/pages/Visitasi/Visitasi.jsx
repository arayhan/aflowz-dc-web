import { BannerFeature, TableVisitasi } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Visitasi = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(decodeURI(search)) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="List Visitasi" />
			{params && (
				<div className="container py-16">
					<TableVisitasi params={params} />
				</div>
			)}
		</div>
	);
};

export default Visitasi;
