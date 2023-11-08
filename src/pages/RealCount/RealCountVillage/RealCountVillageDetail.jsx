import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	TableActivity,
	TableDetailPenerimaKampanye,
	TableDetailRealCountVillage,
	TableDetailRelawan,
	TableStockiestMovementLog,
	TableTPS
} from '@/components/molecules';
import { useVillageStore, useRealCountStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const RealCountVillageDetail = () => {
	const { villageID } = useParams();

	const { fetchingVillageDetail, villageDetail, getVillageDetail } = useVillageStore();
	const { fetchingRealCountVillageDetail, realcountVillageDetail, getRealCountVillageDetail } = useRealCountStore();

	useEffect(() => {
		if (villageID) {
			getVillageDetail(villageID);
			getRealCountVillageDetail(villageID);
		}
	}, [villageID]);

	return (
		<div>
			<BannerFeature
				title={villageDetail ? `Real Count - Kecamatan ${villageDetail.village_name}` : 'Real Count Kecamatan'}
				loading={fetchingRealCountVillageDetail || fetchingVillageDetail}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{(fetchingRealCountVillageDetail || fetchingVillageDetail) && <RealCountVillageDetailSkeleton />}
					{!fetchingRealCountVillageDetail && !fetchingVillageDetail && realcountVillageDetail && (
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="text-xl font-semibold">Informasi Umum</div>
								</div>
								<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
									<CardDetailTotal
										title={'Jumlah TPS'}
										value={realcountVillageDetail?.total_tps ?? '-'}
										linkTo={`/tps?village_id=${villageID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={realcountVillageDetail?.total_dpt ?? '-'}
										linkTo={`/dpt?village_id=${villageID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={realcountVillageDetail?.total_penerima_program_by_village ?? '-'}
										linkTo={`/penerima?village_id=${villageID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={realcountVillageDetail?.total_potensi_suara ?? '-'}
										linkTo={`/tps?village_id=${villageID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={realcountVillageDetail?.total_saksi ?? '-'}
										linkTo={`/saksi?village_id=${villageID}`}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<Card title="Informasi Real Count" className={'bg-white rounded-md'}>
									<div className="flex p-4 overflow-scroll max-h-96">
										<TableDetailRealCountVillage
											isLoading={fetchingRealCountVillageDetail || fetchingVillageDetail}
											realcountVillageData={realcountVillageDetail?.regional_voters_detail}
										/>
									</div>
								</Card>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<TableTPS
									title={`List TPS - Kecamatan ${villageDetail.village_name}`}
									isShowFilter={false}
									params={{ village_id: villageID }}
								/>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<Card title={'List Penerima'} className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailPenerimaKampanye
											dataPenerima={realcountVillageDetail?.list_penerima_program_by_village}
										/>
									</div>
								</Card>
							</div>
							<div>
								<Card title={'List Relawan'} className={'bg-white rounded-md'}>
									<div className="flex p-4 overflow-scroll max-h-96">
										<TableDetailRelawan
											isLoading={fetchingRealCountVillageDetail || fetchingVillageDetail}
											relawanData={realcountVillageDetail?.list_relawan}
										/>
									</div>
								</Card>
							</div>

							<div className="col-span-12 bg-white rounded-md">
								<TableStockiestMovementLog
									title="List Riwayat Barang Kampanye"
									params={{ village_id: villageID }}
									isShowFooter
									isReadonly={true}
								/>
							</div>

							<div className="col-span-12 bg-white rounded-md">
								<TableActivity
									title="List Riwayat Kunjungan Kampanye"
									displayedColumns={[
										'#',
										'Nama Kegiatan',
										'Kategori Kegiatan',
										'Program Terkait',
										'Institusi Terkait',
										'Tanggal Kunjungan/Kegiatan',
										'PIC Tim Internal',
										'Partner yang Dikunjungi',
										'Kontak PIC'
									]}
									params={{ activity_village_id: villageID }}
								/>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const RealCountVillageDetailSkeleton = () => (
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

export default RealCountVillageDetail;
