import { useProgramStore } from '@/store';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const ProgramCategoryList = ({ selectedCategory, onSelectCategory }) => {
	const { fetchingProgramCategoryList, programCategoryList } = useProgramStore();

	return (
		<div className="bg-white rounded-md">
			<div>
				<div className="container space-y-3 text-center p-6 pb-3">
					<div className="text-2xl font-extralight">Select Category</div>
					<div className="text-sm text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis repellendus obcaecati repudiandae, quaerat
						soluta fuga.
					</div>
				</div>
				{(fetchingProgramCategoryList || programCategoryList === null) && (
					<div className="container max-w-screen-md p-5">
						<Skeleton inline containerClassName="grid grid-cols-3 gap-3" height={50} count={3} />
					</div>
				)}
				{!fetchingProgramCategoryList && programCategoryList?.total > 0 && (
					<div className="overflow-x-scroll p-5">
						<div className="flex xl:justify-center gap-3">
							{programCategoryList.items.map((category) => (
								<button
									key={category.id}
									className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
										selectedCategory && selectedCategory.id === category.id
											? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
											: 'text-gray-400 hover:bg-gray-100'
									}`}
									onClick={() => onSelectCategory(category)}
								>
									<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
									<div className="text-xs">{category.name}</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
