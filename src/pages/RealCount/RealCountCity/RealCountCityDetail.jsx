import { Card } from '@/components/atoms';
import { BannerFeature, CardDetailTotal, TableDetailRealCountDistrict } from '@/components/molecules';
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
										value={cityDetail?.total_tps || 0}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={cityDetail?.total_tps || 0}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={cityDetail?.total_penerima_program_by_city || 0}
										linkTo={`/penerima?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={cityDetail?.total_potensi_suara || 0}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={cityDetail?.total_saksi || 0}
										linkTo={`/saksi?city_id=${cityID}`}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<div className="space-y-2">
									<div className="text-xl font-semibold">Real Count</div>
								</div>
								<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
									<CardDetailTotal
										className="lg:col-start-2"
										title={'Total Perolehan Suara'}
										value={cityDetail?.total_tps || 0}
										linkTo={`/tps?city_id=${cityID}`}
									/>
									<CardDetailTotal
										className="lg:col-start-3"
										title={'Target Perolehan Suara'}
										value={cityDetail?.total_tps || 0}
										linkTo={`/tps?city_id=${cityID}`}
									/>
								</div>
								<div>
									<Card className={'bg-white rounded-md'} hideHeader>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailRealCountDistrict
												isLoading={fetchingRealCountCityDetail || fetchingCityDetail}
												realcountDistrictData={realcountCityDetail?.regional_voters_detail}
											/>
										</div>
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
