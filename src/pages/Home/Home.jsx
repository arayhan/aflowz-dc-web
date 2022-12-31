import { BannerHome, SectionSelectFeatures } from '@/components/molecules';
import { TablePenerimaAllCity } from '@/components/molecules/Table/TablePenerima/TablePenerimaAllCity';

const Home = () => {
	return (
		<div>
			<BannerHome />
			<TablePenerimaAllCity />
			<SectionSelectFeatures />
		</div>
	);
};

export default Home;
