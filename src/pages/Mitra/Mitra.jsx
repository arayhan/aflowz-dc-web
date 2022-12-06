import { BannerFeature } from '@/components/molecules';
import { TableMitra } from '@/components/molecules/Table/TableMitra/TableMitra';

const Mitra = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature
				title="Mitra"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Home"
			/>
			<div className="container py-16">
				<TableMitra />
			</div>
		</div>
	);
};

export default Mitra;
