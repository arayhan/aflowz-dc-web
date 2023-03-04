import { BannerFeature, TableKonstituen, SectionSelectKonstituenType } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Konstituen = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title="List Institusi" />
			<div className="bg-gray-100">
				<SectionSelectKonstituenType selectedKonstituen={params?.konstituen_type} />
				<div className="container py-6">
					<TableKonstituen params={params} />
				</div>
			</div>
		</div>
	);
};

export default Konstituen;
