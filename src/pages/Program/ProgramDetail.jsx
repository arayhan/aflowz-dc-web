import { Button, Card, NegativeCase } from '@/components/atoms';
import {
	BannerFeature,
	CardPenerimaProgramByGender,
	ModalUploadSheetFollowers,
	ModalUploadSheetPenerima,
	TableCalonPenerima,
	TableDetailPenerimaProgram,
	TableDetailTimeline,
	TableDetailVillageInDistrict,
	TableKonstituen,
	TablePenerima,
	TableProgramOrganization
} from '@/components/molecules';
import { useActivityStore, useProgramStore } from '@/store';
import { NEGATIVE_CASE_TYPES, STATUS_PENERIMA_TYPES } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ProgramDetail = () => {
	const params = useParams();
	const {
		programDetail,
		fetchingProgramDetail,
		getProgramDetail,
		programTimelineList,
		fetchingProgramTimelineList,
		getProgramTimelineList,
		deleteProgramTimeline
	} = useProgramStore();
	const { activityDetailList, fetchingActivityDetailList, getActivityDetailList } = useActivityStore();

	const tableDefaultParams = { program_id: params.programID };

	const [showModalUploadSheetKandidat, setShowModalUploadSheetKandidat] = useState(false);
	const [showModalUploadSheetPenerima, setShowModalUploadSheetPenerima] = useState(false);
	const [showModalUploadSheetFollowers, setShowModalUploadSheetFollowers] = useState(false);

	const [tableCandidateParams] = useState({
		candidate_program_id: params.programID,
		candidate_status: STATUS_PENERIMA_TYPES.CANDIDATE
	});
	const [tablePenerimaParams] = useState({
		candidate_program_id: params.programID,
		candidate_status: STATUS_PENERIMA_TYPES.CONFIRMED
	});
	const [tableOrganizationParams, setTableOrganizationParams] = useState(tableDefaultParams);

	const isPIP = programDetail?.program_name?.toLowerCase().includes('pip');
	const isKIP = programDetail?.program_name?.toLowerCase().includes('kip');
	const isPIPorKIP = isPIP || isKIP;

	useEffect(() => {
		getProgramDetail(params.programID);
		getProgramTimelineList(params.programID);
	}, [params]);

	useEffect(() => {
		if (params.programID && isPIPorKIP) {
			getActivityDetailList({ activity_program_id: params.programID });
		}
	}, [params, programDetail]);

	return (
		<div>
			{showModalUploadSheetKandidat && (
				<ModalUploadSheetPenerima
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					status={STATUS_PENERIMA_TYPES.CANDIDATE}
					onClose={() => setShowModalUploadSheetKandidat(false)}
				/>
			)}
			{showModalUploadSheetPenerima && (
				<ModalUploadSheetPenerima
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					status={STATUS_PENERIMA_TYPES.CONFIRMED}
					onClose={() => setShowModalUploadSheetPenerima(false)}
				/>
			)}
			{showModalUploadSheetFollowers && (
				<ModalUploadSheetFollowers
					isPIP={isPIP}
					isKIP={isKIP}
					isPIPorKIP={isPIPorKIP}
					onClose={() => setShowModalUploadSheetFollowers(false)}
				/>
			)}

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

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										PIC PIP/KIP Kemendikbud
									</div>
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

							<div className="grid items-start grid-cols-2 gap-4 md:grid-cols-6">
								<div className="grid py-5 bg-white rounded-md cols-span-1 md:py-auto">
									<Link
										to={`/penerima?program_id=${programDetail?.program_id}&candidate_status=${STATUS_PENERIMA_TYPES.CANDIDATE}`}
									>
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
											<div className="font-light text-gray-400">Total Calon Penerima</div>
											<div className="text-xs">[data masih dummy, belum ada paramnya di response]</div>
										</div>
									</Link>
								</div>
								<div className="grid py-5 bg-white rounded-md cols-span-1 md:py-auto">
									<Link to={`/penerima?program_id=${programDetail?.program_id}`}>
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
										<Link to={`/activity?activity_program_id=${params.programID}${isPIP ? '&is_pip=true' : ''}`}>
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
									<div className="col-span-12 bg-white rounded-md">
										<Card
											title={`Timeline`}
											description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
											bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
											rightComponent={
												<Button
													className={'w-full md:w-auto px-5 py-2 rounded-sm text-sm'}
													variant="primary"
													linkTo={`/program/${programDetail?.program_id}/timeline/create`}
												>
													Create
												</Button>
											}
										>
											{fetchingProgramTimelineList && <Skeleton />}
											{!fetchingProgramTimelineList && !programTimelineList && (
												<NegativeCase title="No timeline created yet" type={NEGATIVE_CASE_TYPES.EMPTY_RESULT} />
											)}
											{!fetchingProgramTimelineList && programTimelineList && (
												<TableDetailTimeline
													timelineData={programTimelineList.items}
													displayedColumns={['#', 'Deskripsi', 'Tanggal Program']}
													actionBaseURL={'/program'}
													onDelete={deleteProgramTimeline}
												/>
											)}
										</Card>
									</div>
								)}
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

								{isPIPorKIP && (
									<div className="col-span-12 bg-white rounded-md">
										<TableKonstituen
											title={`${isPIP ? 'Sekolah' : 'Kampus'} di Program ${programDetail.program_name}`}
											isShowButtonSeeAll
											isReadonly
											params={{
												konstituen_type: `${isPIP ? 'sekolah' : 'kampus'}`,
												program_id: programDetail?.program_id
											}}
											enableClickRow
										/>
									</div>
								)}

								{isPIPorKIP && (
									<div className="flex items-start justify-center col-span-12 gap-3 p-4 mt-8 bg-white rounded-md shadow-md">
										<div className="flex flex-col items-center justify-center space-y-2">
											<div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">1</div>
											<button
												className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
												onClick={() => setShowModalUploadSheetKandidat(true)}
											>
												<span className="w-4">
													<SiGooglesheets size={16} />
												</span>
												<span className="text-sm">Upload Kandidat</span>
											</button>
										</div>
										<div className="mt-[8px] text-gray-400">
											<FaChevronRight />
										</div>
										<div className="flex flex-col items-center justify-center space-y-2">
											<div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">2</div>
											<button
												className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-green-500 rounded-sm hover:bg-green-600 lg:w-auto"
												onClick={() => setShowModalUploadSheetPenerima(true)}
											>
												<span className="w-4">
													<SiGooglesheets size={16} />
												</span>
												<span className="text-sm">Upload Penerima Program</span>
											</button>
										</div>
										<div className="mt-[8px] text-gray-400">
											<FaChevronRight />
										</div>
										<div className="flex flex-col items-center justify-center space-y-2">
											<div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">3</div>
											<button
												className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all rounded-sm bg-rose-500 hover:bg-rose-600 lg:w-auto"
												onClick={() => setShowModalUploadSheetFollowers(true)}
											>
												<span className="w-4">
													<SiGooglesheets size={16} />
												</span>
												<span className="text-sm">Upload Followers</span>
											</button>
										</div>
									</div>
								)}
								{isPIPorKIP && (
									<div className="col-span-12 md:col-span-6">
										<TableCalonPenerima
											title="Calon Penerima Program"
											programID={programDetail?.program_id}
											programName={programDetail?.program_name}
											isReadonly
											isShowFilter={false}
											params={tableCandidateParams}
											isPIP={isPIP}
											isKIP={isKIP}
											isShowFooter={false}
										/>
									</div>
								)}

								<div className={`col-span-12 ${isPIPorKIP ? 'md:col-span-6' : ''}`}>
									<TablePenerima
										title="Penerima Program"
										programID={programDetail?.program_id}
										programName={programDetail?.program_name}
										isReadonly
										isShowFilter={false}
										params={tablePenerimaParams}
										isPIP={isPIP}
										isKIP={isKIP}
										isShowFooter={false}
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
												dataPenerima={programDetail?.total_penerima_program_per_city}
												isPerCity
											/>
										</div>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={`Penerima Program Per Desa`}
										bodyClassName={'flex items-center justify-center px-4 py-4'}
									>
										<TableDetailVillageInDistrict villageData={programDetail.total_penerima_program_per_village} />
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
