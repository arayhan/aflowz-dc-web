import { BannerFeature, TableProgram } from '@/components/molecules';
import { MitraList } from '@/components/sections';
import { useState } from 'react';

const Program = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<MitraList selectedCategory={selectedCategory} onSelectCategory={(category) => setSelectedCategory(category)} />
				<div className="py-6 container">
					<TableProgram selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Program;
