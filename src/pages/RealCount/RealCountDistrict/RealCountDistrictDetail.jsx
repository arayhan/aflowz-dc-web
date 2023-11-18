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
import { useRealCountStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const RealCountDistrictDetail = () => {
	const { districtID } = useParams();

	const { fetchingRealCountDistrictDetail, realcountDistrictDetail, getRealCountDistrictDetail } = useRealCountStore();

	useEffect(() => {
		if (districtID) {
			getRealCountDistrictDetail(districtID);
		}
	}, [districtID]);

	return (
		<div>
			<BannerFeature
				title={
					realcountDistrictDetail ? `Real Count - Kecamatan ${realcountDistrictDetail.name}` : 'Real Count Kecamatan'
				}
				loading={fetchingRealCountDistrictDetail}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingRealCountDistrictDetail && <RealCountDistrictDetailSkeleton />}
					{!fetchingRealCountDistrictDetail && realcountDistrictDetail && (
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="text-xl font-semibold">Informasi Umum</div>
								</div>
								<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
									<CardDetailTotal
										title={'Jumlah TPS'}
										value={realcountDistrictDetail?.total_tps ?? '-'}
										linkTo={`/tps?district_id=${districtID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={realcountDistrictDetail?.total_dpt ?? '-'}
										linkTo={`/dpt?district_id=${districtID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={realcountDistrictDetail?.total_penerima_program_by_district ?? '-'}
										linkTo={`/penerima?district_id=${districtID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={realcountDistrictDetail?.total_potensi_suara ?? '-'}
										linkTo={`/tps?district_id=${districtID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={realcountDistrictDetail?.total_saksi ?? '-'}
										linkTo={`/saksi?district_id=${districtID}`}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<Card title="Informasi Real Count" className={'bg-white rounded-md'}>
									<div className="flex p-4 overflow-scroll max-h-96">
										<TableDetailRealCountVillage
											isLoading={fetchingRealCountDistrictDetail}
											realcountVillageData={realcountDistrictDetail?.regional_voters_detail}
										/>
									</div>
								</Card>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<TableTPS
									title={`List TPS - Kecamatan ${realcountDistrictDetail.name}`}
									isShowFilter={false}
									params={{ district_id: districtID }}
								/>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<Card title={'List Penerima'} className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailPenerimaKampanye
											dataPenerima={realcountDistrictDetail?.list_penerima_program_by_district}
										/>
									</div>
								</Card>
							</div>
							<div>
								<Card title={'List Relawan'} className={'bg-white rounded-md'}>
									<div className="flex p-4 overflow-scroll max-h-96">
										<TableDetailRelawan
											isLoading={fetchingRealCountDistrictDetail}
											relawanData={realcountDistrictDetail?.list_relawan}
										/>
									</div>
								</Card>
							</div>

							<div className="col-span-12 bg-white rounded-md">
								<TableStockiestMovementLog
									title="List Riwayat Barang Kampanye"
									params={{ district_id: districtID }}
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
									params={{ activity_district_id: districtID }}
								/>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const RealCountDistrictDetailSkeleton = () => (
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

export default RealCountDistrictDetail;
