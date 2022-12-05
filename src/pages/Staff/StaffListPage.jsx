import { BannerFeature } from '@/components/molecules';
import { TableStaff } from '@/components/molecules/Table/TableStaff/TableStaff';

const StaffListPage = () => {
	return (
		<div>
			<BannerFeature
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Halaman Utama"
				title="List Tim Internal"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
			<div className="bg-gray-100">
				<div className="py-6 container">
					<TableStaff />
				</div>
			</div>
		</div>
	);
};

export default StaffListPage;
