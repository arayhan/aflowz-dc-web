import { BannerFeature, TablePenerima } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Penerima = () => {
	const location = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		if (location.search) {
			const _params = queryStringToObject(location.search);
			setParams(_params);
		}
	}, [location.search]);

	return (
		<div>
			<BannerFeature title="Penerima" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TablePenerima params={params} />
				</div>
			</div>
		</div>
	);
};

export default Penerima;
