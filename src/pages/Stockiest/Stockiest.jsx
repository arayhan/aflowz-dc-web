import { BannerFeature, SectionSelectProductCategory, TableStockiest } from '@/components/molecules/index';
import { useEffect, useState } from 'react';

const Stockiest = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Daftar Barang" backButtonLinkTo={'/'} backButtonText="Kembali ke Home" />
			<div className="bg-gray-100">
				<SectionSelectProductCategory
					selectedCategory={selectedCategory}
					onSelectCategory={(category) => setSelectedCategory(category)}
				/>
				<div className="py-6 container">
					<TableStockiest selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Stockiest;
