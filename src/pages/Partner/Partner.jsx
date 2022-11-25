import { BannerFeature, SectionSelectProgramCategory, TablePartner } from '@/components/molecules';
import { useState } from 'react';

const Partner = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Partner" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<SectionSelectProgramCategory
					selectedCategory={selectedCategory}
					onSelectCategory={(category) => setSelectedCategory(category)}
				/>
				<div className="py-6 container">
					<TablePartner selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Partner;
