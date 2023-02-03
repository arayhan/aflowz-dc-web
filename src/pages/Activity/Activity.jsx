import { BannerFeature, TableActivity, SectionSelectCategoryActivity } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Activity = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(decodeURI(search)) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="List Kegiatan" />
			<SectionSelectCategoryActivity params={params} selectedCategoryID={params.category_id} />
			{params.category_id && (
				<div className="container py-16">
					<TableActivity params={params} />
				</div>
			)}
		</div>
	);
};

export default Activity;
