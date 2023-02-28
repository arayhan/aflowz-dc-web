import {
	BannerFeature,
	SectionSelectProgramCategory,
	SectionShortcutProgram,
	TableProgram
} from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Program = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title="Program" />
			<div className="bg-gray-100">
				<SectionSelectProgramCategory selectedCategoryID={params.category_id} />
				{params.category_id && (
					<div className="container py-6">
						<TableProgram params={params} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Program;
