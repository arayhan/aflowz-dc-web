import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, CardDetailTotal, ChartPeriodeProgram, TablePenerima } from '@/components/molecules';
import { useVillageStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const VillageDetail = () => {
	const { villageID } = useParams();

	const { villageDetail, fetchingVillageDetail, getVillageDetail } = useVillageStore();

	const [tableParams] = useState({ village_id: villageID });

	useEffect(() => {
		if (villageID) getVillageDetail(villageID);
	}, [villageID]);

	return (
		<div>
			<BannerFeature
				title={villageDetail ? `${villageDetail.village_name}` : 'Desa'}
				loading={fetchingVillageDetail}
				backButtonLinkTo={'/village'}
				backButtonText="Kembali ke List Desa"
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container">
					{fetchingVillageDetail && <VillageDetailSkeleton />}
					{!fetchingVillageDetail && villageDetail && (
						<div className="space-y-4">
							<div className="flex flex-col sm:flex-row items-center justify-end gap-4">
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={`/village/update/${villageID}`}
									className={'w-full sm:w-auto text-base px-5 py-3 rounded-md'}
									text={`Update ${villageDetail.village_name}`}
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
										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Nama Desa</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{villageDetail?.village_name || '-'}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">Kecamatan</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{villageDetail?.district?.name || '-'}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Desa</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!villageDetail?.village_pic && '-'}
											{villageDetail?.village_pic && (
												<div>
													{villageDetail?.village_pic}{' '}
													{villageDetail?.village_pic_mobile && `(${villageDetail?.village_pic_mobile})`}
												</div>
											)}
										</div>

										<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Staff</div>
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											{!villageDetail?.pic_staff.id && '-'}
											{villageDetail?.pic_staff.id && (
												<Link
													to={`/staff/${villageDetail?.pic_staff.id}`}
													className="text-primary underline hover:text-primary-400"
												>
													{villageDetail?.pic_staff.name}{' '}
													{villageDetail?.pic_staff.mobile && `(${villageDetail?.pic_staff.mobile})`}
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<CardDetailTotal
									title={'Total Penerima'}
									value={villageDetail?.penerima_program_village?.length || 0}
									linkTo={`/penerima?village_id=${villageID}`}
								/>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Program by Periode per Orang'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={villageDetail?.total_penerima_program_village_by_periode_per_orang} />
									</Card>
								</div>
								<div className="col-span-12 sm:col-span-6 bg-white rounded-md">
									<Card
										title={'Jumlah Program by Periode per Program'}
										description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
										bodyClassName={'flex items-center justify-center px-4 md:px-8 xl:px-12 py-4'}
									>
										<ChartPeriodeProgram data={villageDetail?.total_penerima_program_village_by_periode_per_program} />
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
										params={tableParams}
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

export default VillageDetail;
