import { BannerHome, SectionSelectFeatures } from '@/components/molecules';
import { TablePenerimaAllCity } from '@/components/molecules/Table/TablePenerima/TablePenerimaAllCity';

const Home = () => {
	return (
		<div>
			<BannerHome />
			<SectionSelectFeatures />
			<TablePenerimaAllCity />
		</div>
	);
};

export default Home;
