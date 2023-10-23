import { Button, Card, NegativeCase } from '@/components/atoms';
import {
	BannerFeature,
	CardPenerimaProgramByGender,
	ModalUploadSheetFollowers,
	ModalUploadSheetPenerima,
	TableCalonPenerima,
	TableDetailPenerimaProgram,
	TableDetailTimeline,
	TableDetailTotalPenerimaByKonstituen,
	TableDetailVillageInDistrict,
	TablePenerima,
	TableProgramOrganization
} from '@/components/molecules';
import { useActivityStore, useProgramStore } from '@/store';
import { NEGATIVE_CASE_TYPES, STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { objectToQueryString } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaInfoCircle } from 'react-icons/fa';
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
		candidate_status: `${STATUS_PENERIMA_TYPES.CANDIDATE},${STATUS_PENERIMA_TYPES.REJECTED}`
	});
	const [tablePenerimaParams] = useState({
		program_id: params.programID,
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
					status={STATUS_PENERIMA_TYPES.CANDIDATE}
					onClose={() => setShowModalUploadSheetKandidat(false)}
				/>
			)}
			{showModalUploadSheetPenerima && (
				<ModalUploadSheetPenerima
					status={isPIPorKIP ? STATUS_PENERIMA_TYPES.CONFIRMED : null}
					onClose={() => setShowModalUploadSheetPenerima(false)}
				/>
			)}
			{showModalUploadSheetFollowers && (
				<ModalUploadSheetFollowers onClose={() => setShowModalUploadSheetFollowers(false)} />
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
										{isKIP && 'Nama PIC KIP Kuliah Mitra'}
										{isPIP && 'Nama PIC PIP Mitra'}
										{!isPIPorKIP && 'PIC Lembaga Kemitraan'}
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{programDetail?.program_pic} </div>

									{programDetail?.mitra && (
										<>
											<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Mitra</div>
											<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{programDetail?.mitra.name}</div>
										</>
									)}

									{programDetail?.program_pic_mobile && (
										<>
											<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
												{isKIP && 'Kontak PIC KIP Mitra'}
												{isPIP && 'Kontak PIC PIP Mitra'}
												{!isPIPorKIP && 'Kontak PIC Mitra'}
											</div>
											<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
												{programDetail?.program_pic_mobile}
											</div>
										</>
									)}

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama PJ Internal DC
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										<Link
											to={`/staff/${programDetail?.pic_staff.id}`}
											className="underline text-primary hover:text-primary-400"
										>
											{programDetail?.pic_staff.name}
										</Link>
									</div>

									{programDetail?.pic_staff.mobile && (
										<>
											<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
												Kontak PJ Internal DC
											</div>
											<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
												{programDetail?.pic_staff.mobile}
											</div>
										</>
									)}

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
												{programDetail?.total_candidate_penerima_program || 0}
											</span>
											<div className="font-light text-gray-400">Total Calon Penerima</div>
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
										<Link
											to={
												isPIP
													? `/activity?activity_program_id=${params.programID}${isPIP ? '&is_pip=true' : ''}`
													: `/visitasi?program_id=${params.programID}`
											}
										>
											<div className="flex items-center justify-center w-full">
												<img
													src={require('@/images/icons/Icon_Home/Activity.svg').default}
													className="w-1/2 sm:w-1/3 md:w-2/3"
												/>
											</div>
											<div className="flex flex-col items-center justify-center space-y-1 text-center">
												{isPIP && fetchingActivityDetailList && <Skeleton width={80} height={30} />}
												{isPIP && !fetchingActivityDetailList && activityDetailList && (
													<span className="text-2xl md:text-4xl font-extralight">{activityDetailList?.total || 0}</span>
												)}
												{isKIP && (
													<span className="text-2xl md:text-4xl font-extralight">
														{programDetail?.total_visitasi || 0}
													</span>
												)}
												<div className="font-light text-gray-400">Total {isPIP ? 'Kegiatan' : 'Visitasi'}</div>
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
										<Card
											title={`${isPIP ? 'Sekolah' : 'Kampus'} di Program ${programDetail.program_name}`}
											bodyClassName={'flex flex-col items-start justify-center gap-3 p-4'}
											rightComponent={
												<Link
													to={
														'/institusi' +
														objectToQueryString({
															konstituen_type: `${isPIP ? 'sekolah' : 'kampus'}`,
															program_id: programDetail?.program_id
														})
													}
													className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-sm text-center text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
												>
													<span>Lihat Semua</span>
												</Link>
											}
										>
											<div className="flex items-center gap-2 p-2 text-xs text-gray-500 bg-yellow-400 rounded-sm">
												<span className="w-5">
													<FaInfoCircle size={18} />
												</span>
												<div className="italic">
													Klik tombol <span className="font-bold">List Penerima</span> pada tabel untuk download
													sertifikat penerima perinstitusi
												</div>
											</div>
											<hr />
											<div className="w-full max-w-full overflow-x-scroll">
												<TableDetailTotalPenerimaByKonstituen
													dataPenerima={programDetail?.total_penerima_program_per_institusi}
													programID={programDetail?.program_id}
												/>
											</div>
										</Card>
									</div>
								)}

								<hr className="col-span-12 my-8" />

								{!isPIPorKIP && (
									<div className="flex items-start justify-end col-span-12 gap-3 p-4 bg-white rounded-md shadow-md">
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
								)}

								{isPIPorKIP && (
									<div className="flex items-start justify-center col-span-12 gap-3 p-4 bg-white rounded-md shadow-md">
										<div className="flex flex-col items-center justify-center space-y-2">
											<div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">1</div>
											<button
												className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all bg-blue-500 rounded-sm hover:bg-blue-600 lg:w-auto"
												onClick={() => setShowModalUploadSheetKandidat(true)}
											>
												<span className="w-4">
													<SiGooglesheets size={16} />
												</span>
												<span className="text-sm">Upload Usulan</span>
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
									<div className="col-span-12">
										<TableCalonPenerima
											title="Usulan Penerima Program"
											programID={programDetail?.program_id}
											programName={programDetail?.program_name}
											isReadonly
											isShowFilter={false}
											params={tableCandidateParams}
											isPIP={isPIP}
											isKIP={isKIP}
										/>
									</div>
								)}

								<div className={`col-span-12`}>
									<TablePenerima
										title="Penerima Program"
										programID={programDetail?.program_id}
										programName={programDetail?.program_name}
										isReadonly
										isShowFilter={false}
										params={tablePenerimaParams}
										isPIP={isPIP}
										isKIP={isKIP}
									/>
								</div>

								<hr className="col-span-12 my-8" />

								<div className="col-span-12">
									<Card title={'Penerima Program Per Kota'} className={'bg-white rounded-md'}>
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
