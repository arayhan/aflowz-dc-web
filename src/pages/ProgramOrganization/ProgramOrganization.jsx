import { BannerFeature, TableProgramOrganization } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgramOrganization = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title="Program Organization Structure" />
			<div className="bg-gray-100">
				<div className="container py-6">
					<TableProgramOrganization params={params} setParams={setParams} displayedFilters={['position_id']} />
				</div>
			</div>
		</div>
	);
};

export default ProgramOrganization;
