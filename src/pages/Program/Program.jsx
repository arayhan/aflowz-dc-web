import { BannerFeature, TableProgram } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Program = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { getProgramCategoryList } = useProgramStore();
	const { fetchingProgramCategoryList, programCategoryList } = useProgramStore();

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
				<div className="bg-white p-6 rounded-md">
					{!fetchingProgramCategoryList && programCategoryList?.total && (
						<div className="container space-y-6">
							<div className="space-y-3 text-center">
								<div className="text-2xl font-extralight">Select Category</div>
								<div className="text-sm text-gray-400">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repellendus obcaecati repudiandae,
									quaerat soluta fuga.
								</div>
							</div>
							<div className="space-y-6">
								<div className="flex flex-wrap justify-center gap-4">
									{programCategoryList.items.map((category) => (
										<button
											key={category.id}
											className={`flex w-32 flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100 cursor-pointer space-y-2 ${
												params?.categoryID && Number(params?.categoryID) === category.id
													? 'bg-primary-100 bg-opacity-20 border-primary-500 border-opacity-20'
													: ''
											}`}
											onClick={() => navigate('/program/' + category.id)}
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

				<div className="py-6 container">
					<div className="bg-white p-6 rounded-md space-y-6">
						<div>
							<div className="text-lg font-extralight">{selectedCategory?.name || 'All Category'}</div>
							<div className="text-sm text-gray-400">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
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
