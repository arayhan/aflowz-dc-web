import { BannerFeature, TableVillage } from '@/components/molecules';

const Village = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature
				title="Desa"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/'}
				backButtonText="Kembali ke Home"
			/>
			<div className="container py-16">
				<TableVillage />
			</div>
		</div>
	);
};

export default Village;
