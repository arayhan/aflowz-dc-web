import { BannerFeature, TableProgram } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';

const Program = () => {
	const { getProgramCategoryList } = useProgramStore();
	const { fetchingProgramCategoryList, programCategoryList } = useProgramStore();

	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		getProgramCategoryList();
	}, []);

	useEffect(() => {
		if (programCategoryList?.total > 0) setSelectedCategory(programCategoryList.items[0]);
	}, [programCategoryList]);

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="bg-white p-6 rounded-md">
					{!fetchingProgramCategoryList && programCategoryList?.total && (
						<div className="container">
							<div className="space-y-6">
								<div className="flex flex-wrap gap-4">
									{programCategoryList.items.map((category) => (
										<button
											key={category.id}
											className={`flex w-32 flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100 cursor-pointer space-y-2 ${
												selectedCategory &&
												selectedCategory.id === category.id &&
												'bg-primary-100 bg-opacity-20 border-primary-500 border-opacity-20'
											}`}
											onClick={() => setSelectedCategory(category)}
										>
											<img className="w-12" src={require('@/images/icons/box.svg').default} alt="" />
											<div className="text-xs text-gray-400">{category.name}</div>
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{selectedCategory && (
					<div className="py-6">
						<div className="container bg-white p-6 rounded-md space-y-6">
							<div>
								<div className="text-lg font-extralight">{selectedCategory.name}</div>
								<div className="text-sm text-gray-400">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
								</div>
							</div>
							<hr />
							<div className="p-4">
								<TableProgram selectedCategory={selectedCategory} />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Program;
