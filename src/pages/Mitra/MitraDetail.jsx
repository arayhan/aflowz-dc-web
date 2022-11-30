import { Card } from '@/components/atoms';
import { BannerFeature, ChartPenerimaMitra, ChartProgramByPeriode } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const MitraDetail = () => {
	const { programCategoryID } = useParams();
	const { programCategoryDetail, fetchingProgramCategoryDetail, getProgramCategoryDetail } = useProgramStore();

	useEffect(() => {
		if (programCategoryID) getProgramCategoryDetail(programCategoryID);
	}, [programCategoryID]);

	return (
		<div>
			<BannerFeature
				title={programCategoryDetail ? `${programCategoryDetail.mitra_name}` : 'Mitra'}
				loading={fetchingProgramCategoryDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					{fetchingProgramCategoryDetail && <MitraDetailSkeleton />}
					{!fetchingProgramCategoryDetail && programCategoryDetail && (
						<div className="space-y-4">
							<div className="col-span-12 bg-white rounded-md">
								<div className="p-4 space-y-2">
									<div className="font-light text-xl">Details</div>
									<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
								</div>
								<hr />
								<div className="p-5">
									<div className="grid grid-cols-12 gap-y-1 text-sm">
										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Nama Mitra</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{programCategoryDetail?.mitra_name}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Kementerian</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{programCategoryDetail?.mitra_pic}{' '}
											{programCategoryDetail?.mitra_pic_mobile && `(${programCategoryDetail?.mitra_pic_mobile})`}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">
											PIC Staff Internal
										</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{programCategoryDetail?.pic_staff.name}{' '}
											{programCategoryDetail?.pic_staff.mobile && `(${programCategoryDetail?.pic_staff.mobile})`}
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<div className="bg-white rounded-md px-10 md:px-16 py-6">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">
											{programCategoryDetail?.total_penerima_program_mitra || 0}
										</span>
										<div className="font-light text-gray-400">Total Penerima</div>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Penerima Mitra'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaMitra
											total={programCategoryDetail?.total_penerima_program_mitra}
											penerima={programCategoryDetail?.penerima_program}
										/>
									</Card>
								</div>
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Program by Periode'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartProgramByPeriode
											total={programCategoryDetail?.total_program_by_periode.length}
											penerima={programCategoryDetail?.total_program_by_periode}
										/>
									</Card>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const MitraDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		{[1, 2, 3].map((item) => (
			<div key={item} className="col-span-12 md:col-span-4 bg-white p-4 rounded-md">
				<div className="space-y-3 flex flex-col">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 md:w-52 md:h-52 rounded-full" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 bg-white p-5 md:p-8 rounded-md">
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

export default MitraDetail;
