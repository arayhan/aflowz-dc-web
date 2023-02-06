import { BannerFeature, CardOrganizationStructure } from '@/components/molecules';
import { TableStaff } from '@/components/molecules/Table/TableStaff/TableStaff';
import { ORGANIZATION_TYPE } from '@/utils/constants';

const StaffListPage = () => {
	return (
		<div>
			<BannerFeature title="List Tim Internal" />
			<div className="bg-gray-100">
				<div className="container flex flex-col items-center gap-6 py-6">
					<CardOrganizationStructure type={ORGANIZATION_TYPE.TIM_INTERNAL} />
					<TableStaff />
				</div>
			</div>
		</div>
	);
};

export default StaffListPage;
