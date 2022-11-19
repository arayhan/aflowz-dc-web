import { BannerFeature, TableProgram } from '@/components/molecules';
import { useState } from 'react';
import { ProgramCategoryList } from './sections/ProgramCategoryList';

const Program = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<ProgramCategoryList
					selectedCategory={selectedCategory}
					onSelectCategory={(category) => setSelectedCategory(category)}
				/>
				<div className="py-6 container">
					<TableProgram selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Program;
