import { BannerFeature, TableProgram } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Program = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		if (search) setParams(queryStringToObject(search));
	}, [search]);

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TableProgram params={params} />
				</div>
			</div>
		</div>
	);
};

export default Program;
