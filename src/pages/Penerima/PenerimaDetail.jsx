import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, TableFollowers } from '@/components/molecules';
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

			<section className="bg-gray-100 py-12 md:py-12">
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
								<div className="grid grid-cols-12 gap-y-1 text-sm p-5">
									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Nama
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.name}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Alamat
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.address}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Email
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.email}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Gender
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.gender}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Institusi
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{!penerimaDetail?.konstituen.id && '-'}
										{penerimaDetail?.konstituen.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/institusi/${penerimaDetail?.konstituen.id}`}
												text={penerimaDetail?.konstituen.name}
											/>
										)}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Nomor Telepon
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.mobile}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Tempat, Tanggal Lahir
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{penerimaDetail?.ttl.birth_place}, {penerimaDetail?.ttl.birth_date}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										NIK
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.nik_number}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Kota
									</div>
									{penerimaDetail?.city && (
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/city/${penerimaDetail?.city.id}`}
												text={penerimaDetail?.city.name}
											/>
										</div>
									)}

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Desa / Kelurahan
									</div>
									{penerimaDetail?.village && (
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/village/${penerimaDetail?.village.id}`}
												text={penerimaDetail?.village.name}
											/>
										</div>
									)}

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Religion
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{penerimaDetail?.religion}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Programs
									</div>
									<div className="flex flex-wrap col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50 space gap-2">
										{penerimaDetail?.programs.length === 0 && '-'}
										{penerimaDetail?.programs.length > 0 &&
											penerimaDetail?.programs.map((program) => (
												<ButtonAction
													key={program.id}
													action={ACTION_TYPES.SEE_DETAIL}
													linkTo={`/program/${program.id}`}
													text={program.name}
												/>
											))}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Is Family
									</div>
									<div className="flex flex-wrap col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50 space gap-2">
										{penerimaDetail?.is_family ? 'Ya' : 'Tidak' || '-'}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Is Staff
									</div>
									<div className="flex flex-wrap col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50 space gap-2">
										{(penerimaDetail?.is_staff ? 'Ya' : 'Tidak') || '-'}
									</div>
								</div>
							</Card>

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

export default PenerimaDetail;
