import { BannerFeature, TableProgram } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramCategoryMenu } from './sections/ProgramCategoryMenu';

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
				<ProgramCategoryMenu selectedCategory={selectedCategory} />
				<div className="py-6 container">
					<div className="bg-white p-6 rounded-md space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-lg font-extralight">{selectedCategory?.name || 'All Category'}</div>
								<div className="text-sm text-gray-400">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
								</div>
							</div>
						</div>
						<hr />
						<div className="p-4">
							<TableProgram category={selectedCategory} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Program;
