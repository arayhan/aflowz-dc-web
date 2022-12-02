import { Button, ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, ChartPenerimaCity, ChartProgramByPeriode, TableProgram } from '@/components/molecules';
import { useCityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const CityDetail = () => {
	const { cityID } = useParams();
	const { cityDetail, fetchingCityDetail, getCityDetail } = useCityStore();

	useEffect(() => {
		if (cityID) getCityDetail(cityID);
	}, [cityID]);

	return (
		<div>
			<BannerFeature
				backButtonLinkTo={'/city'}
				backButtonText="Kembali ke List Kota"
				title={cityDetail ? `${cityDetail.city_name}` : 'Kota'}
				loading={fetchingCityDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					{fetchingCityDetail && <CityDetailSkeleton />}
					{!fetchingCityDetail && cityDetail && (
						<div className="space-y-4">
							<div className="flex flex-col sm:flex-row items-center justify-end gap-4">
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/city/update/${cityID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${cityDetail.city_name}`}
								/>
							</div>
							<div className="col-span-12 bg-white rounded-md">
								<div className="p-4 space-y-2">
									<div className="font-light text-xl">Details</div>
									<div className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
								</div>
								<hr />
								<div className="p-5">
									<div className="grid grid-cols-12 gap-y-1 text-sm">
										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Nama Kota</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{cityDetail?.city_name || '-'}</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Staff</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!cityDetail?.pic_staff.id && '-'}
											{cityDetail?.pic_staff.id && (
												<Link
													to={`/staff/${cityDetail?.pic_staff.id}`}
													className="text-primary underline hover:text-primary-400"
												>
													{cityDetail?.pic_staff.name}{' '}
													{cityDetail?.pic_staff.mobile && `(${cityDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<div className="bg-white rounded-md">
									<div className="flex flex-col items-center justify-center space-y-1 text-center px-10 md:px-16 py-6">
										<span className="text-2xl md:text-4xl font-extralight">
											{cityDetail?.penerima_program_city?.length || 0}
										</span>
										<div className="font-light text-gray-400">Total Penerima</div>
									</div>
									<hr />
									<div className="p-3">
										<Button
											className={'w-full px-5 py-2 rounded-sm text-sm'}
											linkTo={`/penerima?city_id=${cityID}`}
											variant={'info'}
										>
											Lihat Semua
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const CityDetailSkeleton = () => (
	<div className="grid grid-cols-12 gap-6">
		{[1, 2, 3].map((item) => (
			<div key={item} className="col-span-12 md:col-span-4 bg-white p-4 rounded-md">
				<div className="space-y-3 flex flex-col">
					<Skeleton width={200} height={20} />
					<hr />
					<div className="flex items-center justify-center">
						<Skeleton className="w-48 h-48 md:w-52 md:h-52 rounded-full" />
					</div>
				</div>
			</div>
		))}
		<div className="col-span-12 bg-white p-5 md:p-8 rounded-md">
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

export default CityDetail;
