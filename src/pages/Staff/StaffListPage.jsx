import { BannerFeature, CardStaffOrganizationStructure, SectionShortcutStaffTitle } from '@/components/molecules';
import { TableStaff } from '@/components/molecules/Table/TableStaff/TableStaff';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const StaffListPage = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(search) : {});
	}, [search]);

	return (
		<div>
			<BannerFeature title="List Tim Internal" />
			<div className="bg-gray-100">
				<div className="container flex flex-col items-center gap-6 py-6">
					<CardStaffOrganizationStructure />
					<SectionShortcutStaffTitle selectedShortcut={params.staff_title} />
					<TableStaff params={params} />
				</div>
			</div>
		</div>
	);
};

export default StaffListPage;
