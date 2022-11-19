import { BannerFeature } from '@/components/molecules';
import { MitraList } from '@/components/sections';
import { useState } from 'react';

const Mitra = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Mitra" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<MitraList selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)} />
			</div>
		</div>
	);
};

export default Mitra;
