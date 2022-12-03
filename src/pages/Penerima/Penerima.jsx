import { BannerFeature, TablePenerima } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Penerima = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => search && setParams(queryStringToObject(search)), [search]);

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
