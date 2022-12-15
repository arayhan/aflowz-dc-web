import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, ChartPeriodeProgram, ChartPenerimaProgram, TableProgram } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const MitraDetail = () => {
	const { programCategoryID } = useParams();
	const { programCategoryDetail, fetchingProgramCategoryDetail, getProgramCategoryDetail } = useProgramStore();

	const [tableProgramParams] = useState({ program_category_id: programCategoryID });

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
								<div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
									<div className="w-full space-y-2">
										<div className="font-light text-xl">Details</div>
										{/* <div className="text-sm text-gray-400">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</div> */}
									</div>
									<div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
										<ButtonAction
											action={ACTION_TYPES.UPDATE}
											linkTo={`/mitra/update/${programCategoryID}`}
											className={'w-full md:w-auto text-base px-5 py-3 rounded-md'}
											text="Update"
										/>
									</div>
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
											{programCategoryDetail?.mitra_pic}
											{programCategoryDetail?.mitra_pic} {`(${programCategoryDetail?.mitra_pic_mobile})`}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Tim Internal</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!programCategoryDetail?.pic_staff.name && '-'}
											{programCategoryDetail?.pic_staff.name && (
												<ButtonAction
													action={ACTION_TYPES.SEE_DETAIL}
													linkTo={`/staff/${programCategoryDetail?.pic_staff.id}`}
													text={`${programCategoryDetail?.pic_staff.name} ${programCategoryDetail?.pic_staff.mobile}`}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Penerima Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaProgram data={programCategoryDetail?.penerima_program} />
									</Card>
								</div>
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Periode Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={programCategoryDetail?.total_program_by_periode} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TableProgram
										title={programCategoryDetail.mitra_name}
										displayedColumns={['#', 'Nama', 'PIC Internal']}
										isShowButtonSeeAll
										isShowFooter={false}
										isReadonly
										params={tableProgramParams}
										enableClickRow
									/>
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
