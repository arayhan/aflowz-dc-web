import { BannerFeature, TableVillage } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RealCountVillage = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Real Count - Kecamatan" />
			<div className="container py-16">
				<TableVillage params={params} isRealCount />
			</div>
		</div>
	);
};

export default RealCountVillage;
