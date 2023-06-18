import { Button, ButtonAction, Card } from '@/components/atoms';
import {
	BannerFeature,
	ChartPeriodeProgram,
	ChartPenerimaProgram,
	TableDetailTimeline,
	TableDetailPenerimaProgram,
	TableDetailTotalProgramByCity
} from '@/components/molecules';
import { CardProgramCategoryOrganizationStructure } from '@/components/molecules/Card/CardProgramCategoryOrganizationStructure/CardProgramCategoryOrganizationStructure';
import { useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const MitraDetail = () => {
	const { programCategoryID } = useParams();
	const {
		programCategoryDetail,
		fetchingProgramCategoryDetail,
		getProgramCategoryDetail,
		deleteProgramCategoryTimeline
	} = useProgramStore();

	useEffect(() => {
		if (programCategoryID) getProgramCategoryDetail(programCategoryID);
	}, [programCategoryID]);

	return (
		<div>
			<BannerFeature
				title={programCategoryDetail ? `${programCategoryDetail.mitra_name}` : 'Mitra'}
				loading={fetchingProgramCategoryDetail}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingProgramCategoryDetail && <MitraDetailSkeleton />}
					{!fetchingProgramCategoryDetail && programCategoryDetail && (
						<div className="space-y-4">
							<div className="col-span-12 bg-white rounded-md">
								<div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
									<div className="w-full space-y-2">
										<div className="text-xl font-light">Details</div>
										{/* <div className="text-sm text-gray-400">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</div> */}
									</div>
									<div className="flex flex-col items-center justify-end w-full gap-4 md:flex-row">
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
									<div className="grid grid-cols-12 text-sm gap-y-1">
										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Mitra</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{programCategoryDetail?.mitra_name}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Kementerian</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{programCategoryDetail?.mitra_pic}
											{programCategoryDetail?.mitra_pic} {`(${programCategoryDetail?.mitra_pic_mobile})`}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Tim Internal</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!programCategoryDetail?.pic_staff.name && '-'}
											{programCategoryDetail?.pic_staff.name && (
												<ButtonAction
													action={ACTION_TYPES.SEE_DETAIL}
													linkTo={`/staff/${programCategoryDetail?.pic_staff.id}`}
													text={`${programCategoryDetail?.pic_staff.name} ${programCategoryDetail?.pic_staff.mobile}`}
												/>
											)}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Alamat Mitra</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{programCategoryDetail?.mitra_address}
										</div>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
								<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg sm:col-start-2 md:col-start-3 md:px-10">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">
											{programCategoryDetail?.total_penerima_program_mitra || 0}
										</span>
										<div className="font-light text-gray-400">Total Penerima</div>
									</div>
								</div>
							</div>

							<div className="flex items-center justify-center">
								<CardProgramCategoryOrganizationStructure programCategoryID={programCategoryID} />
							</div>

							<div className="col-span-12 bg-white rounded-md">
								<Card
									title={`Timeline`}
									description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
									bodyClassName={'overflow-x-scroll'}
									rightComponent={
										<Button
											className={'w-full md:w-auto px-5 py-2 rounded-sm text-sm'}
											variant="primary"
											linkTo={`/mitra/${programCategoryID}/timeline/create`}
										>
											Create
										</Button>
									}
								>
									<TableDetailTimeline
										timelineData={programCategoryDetail?.program_plans_timeline}
										actionBaseURL={'/mitra'}
										onDelete={deleteProgramCategoryTimeline}
									/>
								</Card>
							</div>

							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Penerima Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaProgram data={programCategoryDetail?.penerima_program} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Periode Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={programCategoryDetail?.total_program_by_periode} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={`Program di ${programCategoryDetail.mitra_name}`}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<TableDetailPenerimaProgram dataPenerima={programCategoryDetail.penerima_program} isPerProgram />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={`Total Program ${programCategoryDetail.mitra_name} Per Kota`}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<TableDetailTotalProgramByCity cityData={programCategoryDetail?.total_program_by_mitra_in_city} />
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
			<div key={item} className="col-span-12 p-4 bg-white rounded-md md:col-span-4">
				<div className="flex flex-col space-y-3">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 rounded-full md:w-52 md:h-52" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 p-5 bg-white rounded-md md:p-8">
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
