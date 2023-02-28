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

	const isPIP = params?.keyword === 'PIP';
	const isKIP = params?.keyword === 'KIP';
	const isPIPorKIP = params?.keyword === 'PIP' || params?.keyword === 'KIP';

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title={`Program ${isPIPorKIP ? (isPIP ? 'PIP' : 'KIP') : ''}`} />
			<div className="bg-gray-100">
				{!isPIPorKIP && <SectionSelectProgramCategory selectedCategoryID={params.category_id} />}
				{(isPIPorKIP || params.category_id) && (
					<div className="container py-6">
						<TableProgram params={params} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Program;
