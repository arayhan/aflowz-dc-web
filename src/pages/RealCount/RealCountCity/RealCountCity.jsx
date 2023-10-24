import { BannerFeature, TableCity } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RealCountCity = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="Real Count - Kota" />
			<div className="container py-16">
				<TableCity params={params} isRealCount />
			</div>
		</div>
	);
};
