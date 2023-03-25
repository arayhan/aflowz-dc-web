import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardPenerimaProgramByGender,
	TableDetailPenerimaProgram,
	TablePenerima,
	TableProgramOrganization,
	TableVillage
} from '@/components/molecules';
import { useActivityStore, useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ProgramDetail = () => {
	const params = useParams();
	const { programDetail, fetchingProgramDetail, getProgramDetail } = useProgramStore();
	const { activityDetailList, fetchingActivityDetailList, getActivityDetailList } = useActivityStore();

	const tableDefaultParams = { program_id: params.programID };

	const [tablePenerimaParams] = useState(tableDefaultParams);
	const [tableVillageParams] = useState(tableDefaultParams);
	const [tableOrganizationParams, setTableOrganizationParams] = useState(tableDefaultParams);
	const [searchParams, setSearchParams] = useState({});

	const isPIP = programDetail?.program_name?.toLowerCase().includes('pip');
	const isKIP = programDetail?.program_name?.toLowerCase().includes('kip');
	const isPIPorKIP = isPIP || isKIP;

	useEffect(() => {
		getProgramDetail(params.programID);
	}, [params]);

	useEffect(() => {
		if (params.programID && isPIPorKIP) {
			getActivityDetailList({ activity_program_id: params.programID });
		}
	}, [params, programDetail]);

	return (
		<div>
			<BannerFeature
				title={programDetail ? `Program ${programDetail.program_name}` : 'Program'}
				loading={fetchingProgramDetail}
			/>

			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingProgramDetail && <ProgramDetailSkeleton />}
					{!fetchingProgramDetail && programDetail && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
								linkRoute={`/program/update/${programDetail?.program_id}`}
								isInDetail
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Program</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{programDetail?.program_name}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Periode</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{programDetail?.program_periode}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Mitra</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{programDetail?.program_pic}{' '}
										{programDetail?.program_pic_mobile && `(${programDetail?.program_pic_mobile})`}
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Tim Internal</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										<Link
											to={`/staff/${programDetail?.pic_staff.id}`}
											className="underline text-primary hover:text-primary-400"
										>
											{programDetail?.pic_staff.name}{' '}
											{programDetail?.pic_staff.mobile && `(${programDetail?.pic_staff.mobile})`}
										</Link>
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Deskripsi Program</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{programDetail?.program_description}
									</div>
								</div>
							</Card>

							<div className="grid items-start grid-cols-2 gap-4 md:grid-cols-5">
								<div className="grid py-5 bg-white rounded-md cols-span-1 md:py-auto">
									<Link to={`/program/penerima/${programDetail?.program_id}`}>
										<div className="flex items-center justify-center w-full">
											<img
												src={require('@/images/icons/Icon_Home/Penerima.svg').default}
												className="w-1/2 sm:w-1/3 md:w-2/3"
											/>
										</div>
										<div className="flex flex-col items-center justify-center space-y-1 text-center">
											<span className="text-2xl md:text-4xl font-extralight">
												{programDetail?.total_penerima_program || 0}
											</span>
											<div className="font-light text-gray-400">Total Penerima</div>
										</div>
									</Link>
								</div>
								{isPIPorKIP && (
									<div className="grid py-5 bg-white rounded-md cols-span-1 md:py-auto">
										<Link to={`/activity?activity_program_id=${params.programID}`}>
											<div className="flex items-center justify-center w-full">
												<img
													src={require('@/images/icons/Icon_Home/Activity.svg').default}
													className="w-1/2 sm:w-1/3 md:w-2/3"
												/>
											</div>
											<div className="flex flex-col items-center justify-center space-y-1 text-center">
												{fetchingActivityDetailList && <Skeleton width={80} height={30} />}
												{!fetchingActivityDetailList && activityDetailList && (
													<span className="text-2xl md:text-4xl font-extralight">{activityDetailList?.total || 0}</span>
												)}
												<div className="font-light text-gray-400">Total Kegiatan</div>
											</div>
										</Link>
									</div>
								)}
								<div className="col-span-2 md:col-span-3">
									<CardPenerimaProgramByGender
										total={programDetail?.total_penerima_program || 0}
										totalPria={programDetail?.total_pria}
										totalWanita={programDetail?.total_wanita}
									/>
								</div>
							</div>

							<div className="grid grid-cols-12 gap-4">
								{isPIPorKIP && (
									<div className="col-span-12">
										<TableProgramOrganization
											mainRoute={`/program/${programDetail?.program_id}/organization`}
											params={tableOrganizationParams}
											setParams={setTableOrganizationParams}
											isShowButtonSeeAll
											displayedFilters={['position_id']}
											seeAllLink={`/program/${programDetail?.program_id}/organization`}
										/>
									</div>
								)}
								<div className="col-span-12">
									<TablePenerima
										programID={programDetail?.program_id}
										programName={programDetail?.program_name}
										isReadonly
										isInDetail
										isShowFilter={false}
										params={tablePenerimaParams}
									/>
								</div>
								<div className="col-span-12">
									<Card
										title={'Penerima Program Per Kota'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailPenerimaProgram
												dataPenerimaPerArea={programDetail?.total_penerima_program_per_city}
												isPerCity
											/>
										</div>
									</Card>
								</div>
								<div className="col-span-12">
									<TableVillage
										title={'Penerima Program Per Desa'}
										params={searchParams ? { ...searchParams, ...tableVillageParams } : { ...tableVillageParams }}
										setParams={setSearchParams}
										isReadonly
										enableClickRow
										isShowButtonSeeAll
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

const ProgramDetailSkeleton = () => (
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

export default ProgramDetail;
