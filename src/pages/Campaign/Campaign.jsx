import { Card } from '@/components/atoms';
import { BannerFeature, CardDetailTotal, TableDetailRealCountCity, TableTPS } from '@/components/molecules';
import { useCampaignStore } from '@/store';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

const Campaign = () => {
	const provinceID = '617'; // Provinsi Bengkulu
	const provinceName = 'Provinsi Bengkulu'; // Provinsi Bengkulu
	const periode = '2023';

	const { fetchingCampaignDetail, campaignDetail, getCampaignDetail } = useCampaignStore();

	const tableTPSParams = { provinceID: provinceID };

	useEffect(() => {
		if (provinceID) {
			getCampaignDetail(provinceID, { periode });
		}
	}, [provinceID]);

	return (
		<div>
			<BannerFeature title={`Kampanye - ${provinceName}`} loading={false} />
			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingCampaignDetail && <CampaignSkeleton />}
					{!fetchingCampaignDetail && campaignDetail && (
						<div className="space-y-8">
							<div className="space-y-4">
								<div>
									<div className="text-xl font-semibold">Informasi Umum</div>
									<div className="text-sm text-gray-500">{provinceName}</div>
								</div>
								<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
									<CardDetailTotal
										title={'Jumlah TPS'}
										value={campaignDetail?.total_tps || 0}
										linkTo={`/tps?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={campaignDetail?.total_tps || 0}
										linkTo={`/tps?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={campaignDetail?.total_penerima_program_by_city || 0}
										linkTo={`/penerima?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={campaignDetail?.total_potensi_suara || 0}
										linkTo={`/tps?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={campaignDetail?.total_saksi || 0}
										linkTo={`/saksi?province_id=${provinceID}`}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<Card title="Informasi Real Count" className={'bg-white rounded-md'}>
									<div className="flex overflow-scroll max-h-96">
										<TableDetailRealCountCity
											isLoading={fetchingCampaignDetail}
											realcountCityData={campaignDetail?.regional_voters_detail}
										/>
									</div>
								</Card>
							</div>

							{tableTPSParams && (
								<div className="space-y-4 bg-white rounded-md">
									<TableTPS
										title={`List TPS - ${provinceName}`}
										isShowFilter={false}
										params={tableTPSParams}
										enableClickRow
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const CampaignSkeleton = () => (
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

export default Campaign;
