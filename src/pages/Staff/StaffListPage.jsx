import { BannerFeature, CardStaffOrganizationStructure } from '@/components/molecules';
import { TableStaff } from '@/components/molecules/Table/TableStaff/TableStaff';

const StaffListPage = () => {
	return (
		<div>
			<BannerFeature title="List Tim Internal" />
			<div className="bg-gray-100">
				<div className="container flex flex-col items-center gap-6 py-6">
					<CardStaffOrganizationStructure />
					<TableStaff />
				</div>
			</div>
		</div>
	);
};

export default StaffListPage;
