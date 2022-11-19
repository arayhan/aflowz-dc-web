import { BannerFeature } from '@/components/molecules';
import { useState } from 'react';
import { ProgramCategoryList } from '../Program/sections/ProgramCategoryList';

const Mitra = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Mitra" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<ProgramCategoryList
					selectedCategory={selectedCategory}
					onSelectCategory={(category) => setSelectedCategory(category)}
				/>
			</div>
		</div>
	);
};

export default Mitra;
