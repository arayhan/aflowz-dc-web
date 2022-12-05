import { BannerFeature } from '@/components/molecules';
import { TableMitra } from '@/components/molecules/Table/TableMitra/TableMitra';

const Mitra = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Halaman Utama"
				title="Mitra"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
			<div className="container py-16">
				<TableMitra />
			</div>
		</div>
	);
};

export default Mitra;
