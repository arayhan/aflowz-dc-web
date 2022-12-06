import { BannerFeature, SectionShortcutProgram, TableProgram } from '@/components/molecules';
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
			<BannerFeature
				title="Program"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Home"
			/>
			<div className="bg-gray-100">
				<SectionShortcutProgram params={params} selectedShortcut={params.keyword} />
				<div className="py-6 container">
					<TableProgram params={params} />
				</div>
			</div>
		</div>
	);
};

export default Program;
