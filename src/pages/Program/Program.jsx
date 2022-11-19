import { BannerFeature, TableProgram } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramCategoryList } from './sections/ProgramCategoryList';

const Program = () => {
	const params = useParams();
	const { programCategoryList } = useProgramStore();
	const { getProgramCategoryList } = useProgramStore();

	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		getProgramCategoryList();
	}, []);

	useEffect(() => {
		if (params?.categoryID && programCategoryList) {
			const findCategory = programCategoryList?.items.find((category) => category.id === Number(params.categoryID));
			setSelectedCategory(findCategory);
		}
	}, [params, programCategoryList]);

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<ProgramCategoryList selectedCategory={selectedCategory} />
				<div className="py-6 container">
					<TableProgram selectedCategory={selectedCategory} />
				</div>
			</div>
		</div>
	);
};

export default Program;
