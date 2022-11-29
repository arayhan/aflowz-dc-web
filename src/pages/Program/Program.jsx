import { BannerFeature, SectionSelectProgramCategory, TableProgram } from '@/components/molecules';
import { useState } from 'react';

const Program = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleSelectCategory = (category) => {
		if (category.id === selectedCategory?.id) setSelectedCategory(null);
		else setSelectedCategory(category);
	};

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<SectionSelectProgramCategory selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
				<div className="py-6 container">
					<TableProgram selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Program;
