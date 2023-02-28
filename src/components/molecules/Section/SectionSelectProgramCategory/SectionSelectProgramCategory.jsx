import { useProgramStore } from '@/store';
import { addQueryParams, removeQueryParams } from '@/utils/helpers';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

export const SectionSelectProgramCategory = ({ selectedCategoryID }) => {
	const navigate = useNavigate();

	const { fetchingProgramCategoryList, programCategoryList, getProgramCategoryList } = useProgramStore();

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/program' + updatedParams, { replace: true });
	};

	const handleSelectCategoryID = (categoryID) => {
		handleSetFilter(
			'program_category_id',
			Number(selectedCategoryID) !== categoryID ? { program_category_id: categoryID } : null
		);
	};

	useEffect(() => {
		getProgramCategoryList();
	}, []);

	return (
		<section className="bg-white rounded-md">
			<div>
				<div className="container pt-6 pb-4 space-y-3 text-left 2xl:text-center">
					<div className="text-xl md:text-2xl font-extralight">Select Mitra</div>
				</div>
				{(fetchingProgramCategoryList || programCategoryList === null) && (
					<div className="container max-w-screen-md pb-6">
						<Skeleton inline containerClassName="grid grid-cols-3 gap-3" height={50} count={3} />
					</div>
				)}
				{!fetchingProgramCategoryList && programCategoryList?.total > 0 && (
					<div className="container">
						<div className="flex gap-3 pb-4 overflow-x-scroll md:pb-6 2xl:justify-center">
							{programCategoryList.items.map((category) => (
								<button
									key={category.id}
									className={`w-[200px] min-w-[200px] lg:w-[250px] lg:min-w-[250px] flex items-center text-left border px-2 py-2 rounded-md cursor-pointer space-x-2 ${
										selectedCategoryID && Number(selectedCategoryID) === category.id
											? 'bg-primary-500  border-primary-500 hover:bg-primary-500 text-white'
											: 'text-gray-400 hover:bg-gray-100'
									}`}
									onClick={() => handleSelectCategoryID(category.id)}
								>
									<img className="w-10" src={require('@/images/icons/box.svg').default} alt="" />
									<div className="text-xs">{category.name}</div>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};
