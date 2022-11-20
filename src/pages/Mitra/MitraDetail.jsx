import { BannerFeature } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const MitraDetail = () => {
	const params = useParams();
	const { programCategoryList, fetchingProgramCategoryList, getProgramCategoryList } = useProgramStore();

	const [categoryDetail, setCategoryDetail] = useState(null);

	useEffect(() => {
		if (programCategoryList?.total > 0) {
			const findCategory = programCategoryList.items.find((category) => category.id === Number(params.mitraID));
			console.log({ params, programCategoryList, findCategory });
			if (findCategory) setCategoryDetail(findCategory);
		}
	}, [params, programCategoryList]);

	useEffect(() => {
		getProgramCategoryList();
	}, []);

	return (
		<div>
			<BannerFeature
				title={categoryDetail ? `${categoryDetail.name}` : 'Mitra'}
				loading={fetchingProgramCategoryList}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					<div className="bg-white p-5 md:p-8 rounded-md">
						{fetchingProgramCategoryList && <MitraDetailSkeleton />}
						{!fetchingProgramCategoryList && categoryDetail && (
							<div className="grid grid-cols-12 gap-x-4 gap-y-6 text-sm md:text-base">
								<div className="col-span-4 md:col-span-2 text-primary-600">Name</div>
								<div className="col-span-8 md:col-span-10 border-l px-6">{categoryDetail?.name}</div>
								<div className="col-span-4 md:col-span-2 text-primary-600">Alias</div>
								<div className="col-span-8 md:col-span-10 border-l px-6">{categoryDetail?.name_alias}</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

const MitraDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-x-4 gap-y-2">
		<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
		<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
		<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
		<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
		<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
		<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
	</div>
);

export default MitraDetail;
