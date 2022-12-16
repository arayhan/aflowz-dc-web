import { BannerFeature } from '@/components/molecules';
import { TableStaff } from '@/components/molecules/Table/TableStaff/TableStaff';

const StaffListPage = () => {
	return (
		<div>
			<BannerFeature title="List Tim Internal" />
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TableStaff />
				</div>
			</div>
		</div>
	);
};

export default StaffListPage;
