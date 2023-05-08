import { Button, ButtonAction, Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	ChartPenerimaProgramByGender,
	ChartPeriodeProgram,
	TableDetailTotalPenerimaByProgram,
	TableDetailVillageInDistrict,
	TablePenerima
} from '@/components/molecules';
import { useActivityStore, useDistrictStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const DistrictDetail = () => {
	const { districtID } = useParams();

	const { districtDetail, fetchingDistrictDetail, getDistrictDetail } = useDistrictStore();
	const { activityDetailList, fetchingActivityDetailList, getActivityDetailList } = useActivityStore();

	const [tablePenerimaParams] = useState({ district_id: districtID, is_receiver: true });

	useEffect(() => {
		if (districtID) {
			getDistrictDetail(districtID);
			getActivityDetailList({ activity_district_id: districtID });
		}
	}, [districtID]);

	return (
		<div>
			<BannerFeature
				title={districtDetail ? `Kecamatan ${districtDetail.district_name}` : 'Kecamatan'}
				loading={fetchingDistrictDetail || fetchingActivityDetailList}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{(fetchingDistrictDetail || fetchingActivityDetailList) && <DistrictDetailSkeleton />}
					{(!fetchingDistrictDetail || fetchingActivityDetailList) && districtDetail && (
						<div className="space-y-4">
							<div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
								<Button
									className="px-6 py-3 text-xs rounded-sm"
									variant={'primary'}
									linkTo={`/dapil/district/${districtDetail?.district_id}/report`}
								>
									Preview Database Report
								</Button>
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/dapil/district/update/${districtID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${districtDetail.district_name}`}
								/>
							</div>
							<div className="col-span-12 bg-white rounded-md">
								<div className="p-4 space-y-2">
									<div className="text-xl font-light">Details</div>
									{/* <div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div> */}
								</div>
								<hr />
								<div className="p-5">
									<div className="grid grid-cols-12 text-sm gap-y-1">
										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Kota</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!districtDetail?.city?.id && '-'}
											{districtDetail?.city?.id && (
												<Link
													to={`/dapil/city/${districtDetail?.city?.id}`}
													className="underline text-primary hover:text-primary-400"
												>
													{districtDetail?.city?.name}
												</Link>
											)}
										</div>
										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Nama Kecamatan</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{districtDetail?.district_name || '-'}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Kecamatan</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!districtDetail?.district_pic && '-'}
											{districtDetail?.district_pic && (
												<div>
													{districtDetail?.district_pic}{' '}
													{districtDetail?.district_pic_mobile && `(${districtDetail?.district_pic_mobile})`}
												</div>
											)}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Staff</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!districtDetail?.pic_staff.id && '-'}
											{districtDetail?.pic_staff.id && (
												<Link
													to={`/staff/${districtDetail?.pic_staff.id}`}
													className="underline text-primary hover:text-primary-400"
												>
													{districtDetail?.pic_staff.name}{' '}
													{districtDetail?.pic_staff.mobile && `(${districtDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-4">
								<CardDetailTotal
									title={'Total Penerima'}
									value={districtDetail?.total_penerima_program_district_per_orang || 0}
									linkTo={`/penerima?district_id=${districtID}`}
								/>
								<CardDetailTotal
									title={'Total Siswa Penerima PIP'}
									value={districtDetail?.total_penerima_program_district_pip || 0}
									linkTo={`/penerima?district_id=${districtID}&program=pip`}
								/>
								<CardDetailTotal
									title={'Total Siswa Penerima KIP'}
									value={districtDetail?.total_penerima_program_district_kip || 0}
									linkTo={`/penerima?district_id=${districtID}&program=kip`}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima PIP'}
									value={districtDetail?.total_institusi_penerima_program_district_pip || 0}
									linkTo={`/institusi?district_id=${districtID}&program=pip&konstituen_type=sekolah`}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima KIP'}
									value={districtDetail?.total_institusi_penerima_program_district_kip || 0}
									linkTo={`/institusi?district_id=${districtID}&program=kip&konstituen_type=kampus`}
								/>
								<CardDetailTotal
									title={'Total Kunjungan'}
									value={activityDetailList?.total || 0}
									linkTo={`/activity?activity_district_id=${districtID}`}
								/>
								<CardDetailTotal
									title={'Total Penerima Program Lebih Dari Satu'}
									value={districtDetail?.total_penerima_multiple_program_district_per_orang || 0}
								/>
								<CardDetailTotal
									title={'Potensi Pemilih'}
									value={districtDetail?.total_potensi_pemilih_district_per_orang || 0}
								/>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Penerima Program By Gender'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaProgramByGender
											totalPria={districtDetail?.total_penerima_program_district_per_orang_pria}
											totalWanita={districtDetail?.total_penerima_program_district_per_orang_wanita}
										/>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Penerima Program per Periode'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram
											dataLabels={['Program']}
											data={districtDetail?.total_penerima_program_district_by_periode_per_program}
										/>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={`List Desa di Kecamatan ${districtDetail.district_name}`}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<TableDetailVillageInDistrict villageData={districtDetail.penerima_program_district_village} />
									</Card>
								</div>
								<div className="col-span-12">
									<Card
										title={`List Program di Kecamatan ${districtDetail.district_name}`}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailTotalPenerimaByProgram dataPenerima={districtDetail?.penerima_program} />
										</div>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TablePenerima
										title={`Penerima Program di Kecamatan ${districtDetail.district_name}`}
										displayedColumns={['#', 'Nama Penerima', 'NIK', 'Alamat']}
										isShowButtonSeeAll
										isShowFooter={false}
										isShowFilter={false}
										isReadonly
										params={tablePenerimaParams}
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

const DistrictDetailSkeleton = () => (
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

export default DistrictDetail;
