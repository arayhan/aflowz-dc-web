import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, TableDetailProgramPenerima, TableFollowers } from '@/components/molecules';
import { usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const PenerimaDetail = () => {
	const { penerimaID } = useParams();
	const { penerimaDetail, fetchingPenerimaDetail, getPenerimaDetail } = usePartnerStore();

	useEffect(() => {
		getPenerimaDetail(penerimaID);
	}, [penerimaID]);

	return (
		<div>
			<BannerFeature title={penerimaDetail ? penerimaDetail.name : 'Penerima'} loading={fetchingPenerimaDetail} />

			<section className="py-12 bg-gray-100 md:py-12">
				<div className="container">
					{fetchingPenerimaDetail && <PenerimaDetailSkeleton />}
					{!fetchingPenerimaDetail && penerimaDetail && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
								linkRoute={`/penerima/update/${penerimaDetail?.id}`}
								penerima={penerimaDetail}
								isPrintCertif
								isInDetail
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.name}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Alamat
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.address}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Email
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.email}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Gender
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.gender}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Institusi
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!penerimaDetail?.konstituen.id && '-'}
										{penerimaDetail?.konstituen.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/institusi/${penerimaDetail?.konstituen.id}`}
												text={penerimaDetail?.konstituen.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nomor Telepon
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.mobile}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Tempat, Tanggal Lahir
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{penerimaDetail?.ttl.birth_place}, {penerimaDetail?.ttl.birth_date}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										NIK
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.nik_number}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kota
									</div>
									{penerimaDetail?.city && (
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/city/${penerimaDetail?.city.id}`}
												text={penerimaDetail?.city.name}
											/>
										</div>
									)}

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Desa / Kelurahan
									</div>
									{penerimaDetail?.village && (
										<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/village/${penerimaDetail?.village.id}`}
												text={penerimaDetail?.village.name}
											/>
										</div>
									)}

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Religion
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{penerimaDetail?.religion}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Is Family
									</div>
									<div className="flex flex-wrap col-span-8 gap-2 px-3 py-2 lg:col-span-9 bg-gray-50 space">
										{penerimaDetail?.is_family ? 'Ya' : 'Tidak' || '-'}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Is Staff
									</div>
									<div className="flex flex-wrap col-span-8 gap-2 px-3 py-2 lg:col-span-9 bg-gray-50 space">
										{(penerimaDetail?.is_staff ? 'Ya' : 'Tidak') || '-'}
									</div>
								</div>
							</Card>

							<div className="col-span-12 bg-white rounded-md">
								<Card title={`Program yang Diikuti`} bodyClassName={'flex items-center justify-center'}>
									<TableDetailProgramPenerima programData={penerimaDetail?.program_selections} />
								</Card>
							</div>

							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md">
									<TableFollowers data={penerimaDetail?.followers} enableClickRow />
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const PenerimaDetailSkeleton = () => (
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

export default PenerimaDetail;
