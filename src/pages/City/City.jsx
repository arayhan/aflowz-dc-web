import { BannerFeature } from '@/components/molecules';
import { TableCity } from '@/components/molecules';

const City = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature title="Kota" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="container py-16">
				<TableCity />
			</div>
		</div>
	);
};

export default City;
