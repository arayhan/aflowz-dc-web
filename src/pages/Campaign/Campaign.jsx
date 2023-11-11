import { Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	ChartCampaignDemografi,
	ModalUploadSurvey,
	TableDetailRealCountCity,
	TableTPS
} from '@/components/molecules';
import { useCampaignStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { SiGooglesheets } from 'react-icons/si';
import Skeleton from 'react-loading-skeleton';

const Campaign = () => {
	const provinceID = '617'; // Provinsi Bengkulu
	const provinceName = 'Provinsi Bengkulu'; // Provinsi Bengkulu
	const periode = '2020,2021,2022,2023,2024';

	const [showUploadSurveyModal, setShowUploadSurveyModal] = useState(false);

	const { fetchingCampaignDetail, campaignDetail, getCampaignDetail } = useCampaignStore();

	const tableTPSParams = { provinceID: provinceID };

	useEffect(() => {
		if (provinceID) {
			getCampaignDetail(provinceID, { periode });
		}
	}, [provinceID]);

	return (
		<div>
			{showUploadSurveyModal && <ModalUploadSurvey onClose={() => setShowUploadSurveyModal(false)} />}

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
										value={campaignDetail?.total_tps ?? '-'}
										linkTo={`/tps?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Mata Pilih'}
										value={campaignDetail?.total_dpt ?? '-'}
										linkTo={`/dpt?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Penerima'}
										value={campaignDetail?.total_penerima_program_by_city ?? '-'}
										linkTo={`/penerima?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Potensi Suara'}
										value={campaignDetail?.total_potensi_suara ?? '-'}
										linkTo={`/tps?province_id=${provinceID}`}
									/>
									<CardDetailTotal
										title={'Jumlah Saksi'}
										value={campaignDetail?.total_saksi ?? '-'}
										linkTo={`/saksi?province_id=${provinceID}`}
									/>
								</div>
							</div>

							<div className="flex gap-4">
								<CardDetailTotal
									className="w-full"
									title={'Total Perolehan Suara'}
									value={campaignDetail?.total_legitimate_vote ?? '-'}
								/>
								<CardDetailTotal
									className="w-full"
									title={'Target Perolehan Suara'}
									value={campaignDetail?.total_target_vote ?? '-'}
								/>
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

							<div className="flex justify-end p-4 bg-white rounded-sm shadow-md">
								<button
									className="flex items-center justify-center w-full px-5 py-3 space-x-2 text-white transition-all rounded-sm bg-primary-500 hover:bg-primary-600 lg:w-auto"
									onClick={() => setShowUploadSurveyModal(true)}
								>
									<span className="w-4">
										<SiGooglesheets size={16} />
									</span>
									<span className="text-sm">Upload Survey</span>
								</button>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="bg-white rounded-md">
									<Card
										title={'Demografi'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartCampaignDemografi />
									</Card>
								</div>
								<div className="bg-white rounded-md">
									<Card title={'Gender'} bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}>
										CHART HERE
									</Card>
								</div>
								<div className="bg-white rounded-md">
									<Card title={'Usia'} bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}>
										CHART HERE
									</Card>
								</div>
								<div className="bg-white rounded-md">
									<Card
										title={'Tingkat Pendidikan'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										CHART HERE
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
