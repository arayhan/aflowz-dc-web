import { Breadcrumb } from '@/components/atoms';
import { useEffect } from 'react';
import { useState } from 'react';

export const DapilBreadcrumbs = ({ TPSData, onClickItem }) => {
	const BREADCRUMB_LABELS = ['Pilih Kota', 'Pilih Kecamatan', 'Pilih Desa/Kelurahan', 'Pilih TPS'];

	const [completedItemCount, setCompletedItemCount] = useState(0);

	const handleClickItem = (item) => {};

	useEffect(() => {
		const TPSDataValues = Object.values(TPSData);
		const selectedTPSData = TPSDataValues.filter((value) => value !== null);
		setCompletedItemCount(selectedTPSData.length);
	}, [TPSData]);

	return (
		<Breadcrumb labels={BREADCRUMB_LABELS} completedItemCount={completedItemCount} onClickItem={handleClickItem} />
	);
};

DapilBreadcrumbs.defaultProps = {
	TPSData: { city: null, district: null, village: null, tps: null },
	onClickItem: () => {}
};
