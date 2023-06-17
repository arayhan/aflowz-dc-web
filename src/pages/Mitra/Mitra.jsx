import { BannerFeature } from '@/components/molecules';
import { TableMitra } from '@/components/molecules/Table/TableMitra/TableMitra';

const Mitra = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature title="Mitra" />
			<div className="container py-16">
				<TableMitra enableClickRow />
			</div>
		</div>
	);
};

export default Mitra;
