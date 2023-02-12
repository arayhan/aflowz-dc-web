import { Button, ButtonAction, Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	ChartPeriodeProgram,
	TableDetailTotalPenerimaByProgram,
	TablePenerima
} from '@/components/molecules';
import { useVillageStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const VillageDetail = () => {
	const { villageID } = useParams();

	const { villageDetail, fetchingVillageDetail, getVillageDetail } = useVillageStore();

	const [tablePenerimaParams] = useState({ village_id: villageID });

	useEffect(() => {
		if (villageID) getVillageDetail(villageID);
	}, [villageID]);

	return (
		<div>
			<BannerFeature title={villageDetail ? `${villageDetail.village_name}` : 'Desa'} loading={fetchingVillageDetail} />

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingVillageDetail && <VillageDetailSkeleton />}
					{!fetchingVillageDetail && villageDetail && (
						<div className="space-y-4">
							<div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
								<Button
									className="px-6 py-3 text-xs rounded-sm"
									variant={'primary'}
									linkTo={`/dapil/village/${villageDetail?.village_id}/report`}
								>
									Preview Database Report
								</Button>
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/dapil/village/update/${villageID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${villageDetail.village_name}`}
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
											{villageDetail?.village_name || '-'}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Kota</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!villageDetail?.village_pic && '-'}
											{villageDetail?.village_pic && (
												<div>
													{villageDetail?.village_pic}{' '}
													{villageDetail?.village_pic_mobile && `(${villageDetail?.village_pic_mobile})`}
												</div>
											)}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Staff</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!villageDetail?.pic_staff.id && '-'}
											{villageDetail?.pic_staff.id && (
												<Link
													to={`/staff/${villageDetail?.pic_staff.id}`}
													className="underline text-primary hover:text-primary-400"
												>
													{villageDetail?.pic_staff.name}{' '}
													{villageDetail?.pic_staff.mobile && `(${villageDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="grid items-center justify-center grid-cols-4 gap-4">
								<CardDetailTotal
									title={'Total Penerima'}
									value={villageDetail?.penerima_program_village?.length || 0}
									linkTo={`/penerima?village_id=${villageID}`}
								/>
								<CardDetailTotal
									title={'Total Penerima Program Lebih Dari Satu'}
									value={villageDetail?.total_penerima_multiple_program_village_per_orang || 0}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima PIP'}
									value={villageDetail?.total_institusi_penerima_program_village_pip || 0}
									linkTo={`/institusi?village_id=${villageID}&program_name=pip`}
								/>
								<CardDetailTotal
									title={'Total Siswa Penerima PIP'}
									value={villageDetail?.total_penerima_program_village_pip || 0}
									linkTo={`/penerima?village_id=${villageID}&program_name=pip`}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima KIP'}
									value={villageDetail?.total_institusi_penerima_program_village_kip || 0}
									linkTo={`/institusi?village_id=${villageID}&program_name=kip`}
								/>
								<CardDetailTotal
									title={'Total Siswa Penerima KIP'}
									value={villageDetail?.total_penerima_program_village_kip || 0}
									linkTo={`/penerima?village_id=${villageID}&program_name=kip`}
								/>
								<CardDetailTotal
									title={'Potensi Pemilih'}
									value={villageDetail?.total_potensi_pemilih_village_per_orang || 0}
								/>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Program by Periode per Orang'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={villageDetail?.total_penerima_program_village_by_periode_per_orang} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Program by Periode per Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={villageDetail?.total_penerima_program_village_by_periode_per_program} />
									</Card>
								</div>
								<div className="col-span-12">
									<Card
										title={`Penerima Program di ${villageDetail.village_name}`}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailTotalPenerimaByProgram dataPenerima={villageDetail?.penerima_program_village} />
										</div>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TablePenerima
										title={`Penerima Program ${villageDetail.village_name}`}
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

const VillageDetailSkeleton = () => (
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

export default VillageDetail;
