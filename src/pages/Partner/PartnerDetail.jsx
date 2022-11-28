import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature } from '@/components/molecules';
import { usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const PartnerDetail = () => {
	const { partnerID } = useParams();
	const { partnerDetail, fetchingPartnerDetail, getPartnerDetail } = usePartnerStore();

	useEffect(() => {
		getPartnerDetail(partnerID);
	}, [partnerID]);

	return (
		<div>
			<BannerFeature title={partnerDetail ? partnerDetail.name : 'Partner'} loading={fetchingPartnerDetail} />

			<section className="bg-gray-100 py-12 md:py-12">
				<div className="container">
					{fetchingPartnerDetail && <PartnerDetailSkeleton />}
					{!fetchingPartnerDetail && partnerDetail && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
							>
								<div className="grid grid-cols-12 gap-y-1 text-sm p-5">
									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Nama
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.name}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Alamat
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.address}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Email
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.email}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Gender
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.gender}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Konstituen
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										<ButtonAction
											action={ACTION_TYPES.SEE_DETAIL}
											linkTo={`/konstituen/${partnerDetail?.konstituen.id}`}
											text={partnerDetail?.konstituen.name}
										/>
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Nomor Telepon
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.mobile}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Tempat, Tanggal Lahir
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{partnerDetail?.ttl.birth_place}, {partnerDetail?.ttl.birth_date}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										NIK
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.nik_number}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Kota
									</div>
									{partnerDetail?.city && (
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/city/${partnerDetail?.city.id}`}
												text={partnerDetail?.city.name}
											/>
										</div>
									)}

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Desa / Kelurahan
									</div>
									{partnerDetail?.village && (
										<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/village/${partnerDetail?.village.id}`}
												text={partnerDetail?.village.name}
											/>
										</div>
									)}

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Religion
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{partnerDetail?.religion}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Programs
									</div>
									{partnerDetail?.programs.length > 1 && (
										<div className="flex flex-wrap col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50 space gap-2">
											{partnerDetail?.programs.map((program) => (
												<ButtonAction
													key={program.id}
													action={ACTION_TYPES.SEE_DETAIL}
													linkTo={`/program/${program.id}`}
													text={program.name}
												/>
											))}
										</div>
									)}
								</div>
							</Card>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

const PartnerDetailSkeleton = () => (
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

export default PartnerDetail;
