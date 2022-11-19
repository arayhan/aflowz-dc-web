import { BannerFeature } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ProgramDetail = () => {
	const params = useParams();
	const { programDetail, fetchingProgramDetail, getProgramDetail } = useProgramStore();

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={programDetail ? `Program ${programDetail.name}` : 'Program'}
				loading={fetchingProgramDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					<div className="bg-white p-5 md:p-8 rounded-md">
						{fetchingProgramDetail && (
							<div className="grid grid-cols-12 gap-x-4 gap-y-2">
								<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
								<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
								<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
								<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
								<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
								<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
							</div>
						)}
						{!fetchingProgramDetail && programDetail && (
							<div className="grid grid-cols-12 gap-x-4 gap-y-6 text-sm md:text-base">
								<div className="col-span-4 md:col-span-2 text-primary-600">PIC</div>
								<div className="col-span-8 md:col-span-10 border-l px-6">{programDetail?.pic}</div>
								<div className="col-span-4 md:col-span-2 text-primary-600">Periode</div>
								<div className="col-span-8 md:col-span-10 border-l px-6">{programDetail?.periode}</div>
								<div className="col-span-4 md:col-span-2 text-primary-600">Category</div>
								<div className="col-span-8 md:col-span-10 border-l px-6">
									{programDetail?.program_category?.name && (
										<Link
											to={`/mitra/${programDetail.program_category.id}`}
											className="inline-block bg-primary px-3 md:px-5 py-2 text-white rounded-md hover:bg-primary-400 transition-all text-xs md:text-sm"
										>
											{programDetail.program_category.name}
										</Link>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProgramDetail;
