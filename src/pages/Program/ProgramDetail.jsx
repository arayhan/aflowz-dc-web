import { BannerFeature } from '@/components/molecules';
import { useProgramStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { PieChartPriaWanita } from './components/PieChartPriaWanita';

const ProgramDetail = () => {
	const params = useParams();
	const { programDetail, fetchingProgramDetail, getProgramDetail } = useProgramStore();

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={programDetail ? `Program ${programDetail.program_name}` : 'Program'}
				loading={fetchingProgramDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					<div className="space-y-6">
						{fetchingProgramDetail && <ProgramDetailSkeleton />}
						{!fetchingProgramDetail && programDetail && (
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 md:col-span-5 xl:col-span-3 bg-white rounded-md">
									<PieChartPriaWanita
										totalPria={programDetail?.total_pria || 19}
										totalWanita={programDetail?.total_wanita || 32}
									/>
								</div>
								<div className="col-span-12 md:col-span-7 xl:col-span-9 bg-white rounded-md">
									<div className="p-4 space-y-2">
										<div className="font-light text-xl">Details</div>
										<div className="text-sm text-gray-400">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</div>
									</div>
									<hr />
									<div className="p-5">
										<div className="grid grid-cols-12 gap-y-1 text-sm">
											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-200 px-3 py-2">Nama Program</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{programDetail?.program_name}</div>
											<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-200 px-3 py-2">PIC</div>
											<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
												{programDetail?.village_pic}{' '}
												{programDetail?.village_pic_mobile && `${programDetail?.village_pic_mobile}`}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

const ProgramDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		<div className="col-span-3 bg-white p-4 rounded-md">
			<div className="space-y-3 flex flex-col">
				<Skeleton width={200} height={20} />
				<hr />
				<div className="flex items-center justify-center">
					<Skeleton className="w-52 h-52 rounded-full" />
				</div>
			</div>
		</div>
		<div className="col-span-9 bg-white p-5 md:p-8 rounded-md">
			<div className="grid grid-cols-12 gap-x-4 gap-y-2">
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
				<Skeleton inline containerClassName="col-span-4 md:col-span-3 lg:col-span-2" />
				<Skeleton inline containerClassName="col-span-8 md:col-span-9 lg:col-span-10" />
			</div>
		</div>
	</div>
);

export default ProgramDetail;
