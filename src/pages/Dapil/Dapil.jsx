import { BannerFeature } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dapil = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature
				title="Dapil"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Home"
			/>
			<div className="container py-16">{/* <TableDapil params={params} /> */}</div>
		</div>
	);
};

export default Dapil;
