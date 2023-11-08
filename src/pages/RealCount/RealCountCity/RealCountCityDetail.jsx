import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	TableActivity,
	TableDetailPenerimaKampanye,
	TableDetailRealCountDistrict,
	TableDetailRelawan,
	TableStockiestMovementLog,
	TableTPS
} from '@/components/molecules';
import { useCityStore, useRealCountStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const RealCountCityDetail = () => {
	const { cityID } = useParams();

	const { fetchingCityDetail, cityDetail, getCityDetail } = useCityStore();
	const { fetchingRealCountCityDetail, realcountCityDetail, getRealCountCityDetail } = useRealCountStore();

	useEffect(() => {
		if (cityID) {
			getCityDetail(cityID);
			getRealCountCityDetail(cityID);
		}
	}, [cityID]);

	return (
		<div>
			<BannerFeature
				title={cityDetail ? `Real Count - Kota ${cityDetail.city_name}` : 'Real Count Kota'}
				loading={fetchingRealCountCityDetail || fetchingCityDetail}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{(fetchingRealCountCityDetail || fetchingCityDetail) && <RealCountCityDetailSkeleton />}
					{!fetchingRealCountCityDetail && !fetchingCityDetail && realcountCityDetail && (
						<div className="space-y-8">
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="text-xl font-semibold">Informasi Umum</div>
								</div>
								<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
									<CardDetailTotal
										title={'Jumlah TPS'}
										value={realcountCityDetail?.total_tps ?? '-'}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={realcountCityDetail?.total_dpt ?? '-'}
										linkTo={`/dpt?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={realcountCityDetail?.total_penerima_program_by_city ?? '-'}
										linkTo={`/penerima?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={realcountCityDetail?.total_potensi_suara ?? '-'}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={realcountCityDetail?.total_saksi ?? '-'}
										linkTo={`/saksi?city_id=${cityID}`}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<Card title="Informasi Real Count" className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailRealCountDistrict
											isLoading={fetchingRealCountCityDetail || fetchingCityDetail}
											realcountDistrictData={realcountCityDetail?.regional_voters_detail}
										/>
									</div>
								</Card>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<TableTPS
									title={`List TPS - Kota ${cityDetail.city_name}`}
									isShowFilter={false}
									params={{ city_id: cityID }}
								/>
							</div>

							<div className="space-y-4 bg-white rounded-md">
								<Card title={'List Penerima'} className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailPenerimaKampanye dataPenerima={realcountCityDetail?.list_penerima_program_by_city} />
									</div>
								</Card>
							</div>

							<div>
								<Card title={'List Relawan'} className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailRelawan
											isLoading={fetchingRealCountCityDetail || fetchingCityDetail}
											relawanData={realcountCityDetail?.list_relawan}
										/>
									</div>
								</Card>
							</div>

							<div className="col-span-12 bg-white rounded-md">
								<TableStockiestMovementLog
									title="List Riwayat Barang Kampanye"
									params={{ city_id: cityID }}
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
									params={{ activity_city_id: cityID }}
								/>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const RealCountCityDetailSkeleton = () => (
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

export default RealCountCityDetail;
