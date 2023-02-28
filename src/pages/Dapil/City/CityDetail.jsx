import { Button, ButtonAction, Card } from '@/components/atoms';
import {
	BannerFeature,
	CardDetailTotal,
	ChartPenerimaProgramByGender,
	ChartPeriodeProgram,
	TableDetailTotalPenerimaByProgram,
	TablePenerima
} from '@/components/molecules';
import { TableDetailDistrictInCity } from '@/components/molecules/TableDetail/TableDetailDistrictInCity/TableDetailDistrictInCity';
import { useCityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const CityDetail = () => {
	const { cityID } = useParams();

	const { cityDetail, fetchingCityDetail, getCityDetail } = useCityStore();

	const [tablePenerimaParams] = useState({ city_id: cityID });
	const [tableDistrictParams, setTableDistrictParams] = useState({ city_id: cityID });

	useEffect(() => {
		if (cityID) getCityDetail(cityID);
	}, [cityID]);

	return (
		<div>
			<BannerFeature title={cityDetail ? `${cityDetail.city_name}` : 'Kota'} loading={fetchingCityDetail} />

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingCityDetail && <CityDetailSkeleton />}
					{!fetchingCityDetail && cityDetail && (
						<div className="space-y-4">
							<div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
								<Button
									className="w-full px-6 py-3 text-xs rounded-sm sm:w-auto"
									variant={'primary'}
									linkTo={`/dapil/city/${cityDetail?.city_id}/report`}
								>
									Preview Database Report
								</Button>
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/dapil/city/update/${cityID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${cityDetail.city_name}`}
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
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{cityDetail?.city_name || '-'}</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Kota</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!cityDetail?.city_pic && '-'}
											{cityDetail?.city_pic && (
												<div>
													{cityDetail?.city_pic} {cityDetail?.city_pic_mobile && `(${cityDetail?.city_pic_mobile})`}
												</div>
											)}
										</div>

										<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">PIC Staff</div>
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											{!cityDetail?.pic_staff.id && '-'}
											{cityDetail?.pic_staff.id && (
												<Link
													to={`/staff/${cityDetail?.pic_staff.id}`}
													className="underline text-primary hover:text-primary-400"
												>
													{cityDetail?.pic_staff.name}{' '}
													{cityDetail?.pic_staff.mobile && `(${cityDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="grid items-start justify-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
								<CardDetailTotal
									title={'Total Penerima'}
									value={cityDetail?.penerima_program_city?.length || 0}
									linkTo={`/penerima?city_id=${cityID}`}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima PIP'}
									value={cityDetail?.total_institusi_penerima_program_city_pip || 0}
									linkTo={`/institusi?city_id=${cityID}&program_name=pip`}
								/>
								<CardDetailTotal
									title={'Total Siswa Penerima PIP'}
									value={cityDetail?.total_penerima_program_city_pip || 0}
									linkTo={`/penerima?city_id=${cityID}&program_name=pip`}
								/>
								<CardDetailTotal
									title={'Total Institusi Penerima KIP'}
									value={cityDetail?.total_institusi_penerima_program_city_kip || 0}
									linkTo={`/institusi?city_id=${cityID}&program_name=kip`}
								/>
								<CardDetailTotal
									title={'Total Mahasiswa Penerima KIP'}
									value={cityDetail?.total_penerima_program_city_kip || 0}
									linkTo={`/penerima?city_id=${cityID}&program_name=kip`}
								/>
								<CardDetailTotal
									title={'Total Penerima Program Lebih Dari Satu'}
									value={cityDetail?.total_penerima_multiple_program_city_per_orang || 0}
								/>
								<CardDetailTotal
									title={'Potensi Pemilih'}
									value={cityDetail?.total_potensi_pemilih_city_per_orang || 0}
								/>
							</div>
							<div className="grid items-start grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Program by Periode per Orang'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={cityDetail?.total_penerima_program_city_by_periode_per_orang} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md sm:col-span-6">
									<Card
										title={'Jumlah Program by Periode per Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={cityDetail?.total_penerima_program_city_by_periode_per_program} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={'Potensi Pemilih By Gender'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPenerimaProgramByGender totalPria={20} totalWanita={24} />
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<Card
										title={`List Kecamatan di Kota ${cityDetail.city_name}`}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<TableDetailDistrictInCity districtData={cityDetail.penerima_program_city_district} />
									</Card>
								</div>
								<div className="col-span-12">
									<Card
										title={`Total Penerima Setiap Program di Kota ${cityDetail.city_name}`}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										className={'bg-white rounded-md'}
									>
										<div className="flex p-4 overflow-scroll max-h-96">
											<TableDetailTotalPenerimaByProgram dataPenerima={cityDetail?.penerima_program_city} />
										</div>
									</Card>
								</div>
								<div className="col-span-12 bg-white rounded-md">
									<TablePenerima
										title={`Penerima Program Kota ${cityDetail.city_name}`}
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

const CityDetailSkeleton = () => (
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

export default CityDetail;
