import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, TableActivityPromise } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ActivityDetailDetail = () => {
	const { activityID, activityDetailID } = useParams();

	const { activityDetailItem, fetchingActivityDetailItem } = useActivityStore();
	const { getActivityDetailItem } = useActivityStore();

	const tableActivityPromiseListFixedParams = {
		activity_id: activityID,
		activity_detail_id: activityDetailID,
		order_by: 'activity_date',
		order_by_type: 'desc'
	};

	const [tableActivityPromiseListParams, setTableActivityPromiseListParams] = useState({
		...tableActivityPromiseListFixedParams
	});

	useEffect(() => {
		if (activityDetailID) {
			getActivityDetailItem(activityDetailID);
		}
	}, [activityDetailID]);

	return (
		<div>
			<BannerFeature
				title={activityDetailItem ? `Detail Kegiatan : ${activityDetailItem.description}` : 'Detail Kegiatan'}
				loading={fetchingActivityDetailItem}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingActivityDetailItem && <ActivityDetailDetailSkeleton />}
					{!fetchingActivityDetailItem && activityDetailItem && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
								linkRoute={`/activity/${activityID}/detail/update/${activityDetailItem?.id}`}
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Nama Kegiatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{activityDetailItem?.activity?.name}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kategori Kegiatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityDetailItem?.category.id && '-'}
										{activityDetailItem?.category.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/activity?activity_category_id=${activityDetailItem?.category.id}`}
												text={activityDetailItem?.category.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Program Terkait
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityDetailItem?.program.id && '-'}
										{activityDetailItem?.program.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/program/${activityDetailItem?.program.id}`}
												text={activityDetailItem?.program.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Institusi
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityDetailItem?.konstituen.id && '-'}
										{activityDetailItem?.konstituen.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/institusi/${activityDetailItem?.konstituen.id}`}
												text={activityDetailItem?.konstituen.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Alamat Kunjungan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										<table>
											<tr>
												<td>Kota</td>
												<td className="px-3">:</td>
												<td>
													{!activityDetailItem?.city?.id && '-'}
													{activityDetailItem?.city?.id && (
														<ButtonAction
															action={ACTION_TYPES.SEE_DETAIL}
															linkTo={`/dapil/city/${activityDetailItem?.city.id}`}
															text={activityDetailItem?.city.name}
														/>
													)}
												</td>
											</tr>
											<tr>
												<td>Kecamatan</td>
												<td className="px-3">:</td>
												<td>
													{!activityDetailItem?.district?.id && '-'}
													{activityDetailItem?.district?.id && (
														<ButtonAction
															action={ACTION_TYPES.SEE_DETAIL}
															linkTo={`/dapil/district/${activityDetailItem?.district.id}`}
															text={activityDetailItem?.district.name}
														/>
													)}
												</td>
											</tr>
											<tr>
												<td>Desa/Kelurahan</td>
												<td className="px-3">:</td>
												<td>
													{!activityDetailItem?.village?.id && '-'}
													{activityDetailItem?.village?.id && (
														<ButtonAction
															action={ACTION_TYPES.SEE_DETAIL}
															linkTo={`/dapil/village/${activityDetailItem?.village.id}`}
															text={activityDetailItem?.village.name}
														/>
													)}
												</td>
											</tr>
										</table>
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Rumah Warga
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityDetailItem?.partner?.id && '-'}
										{activityDetailItem?.partner?.id && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/partner/${activityDetailItem?.partner.id}`}
												text={activityDetailItem?.partner.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Jumlah Peserta yang hadir
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{activityDetailItem?.total_participant}
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Tim Internal</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityDetailItem?.pic_staff_id?.id && '-'}
										{activityDetailItem?.pic_staff_id?.id && (
											<Link
												to={`/staff/${activityDetailItem?.pic_staff_id.id}`}
												className="underline text-primary hover:text-primary-400"
											>
												{activityDetailItem?.pic_staff_id.name}{' '}
												{activityDetailItem?.pic_staff_id.mobile && `(${activityDetailItem?.pic_staff_id.mobile})`}
											</Link>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Tanggal Kunjungan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{activityDetailItem?.activity_date}
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										PIC Tempat Kunjungan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{activityDetailItem?.pic || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Kontak PIC</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{activityDetailItem?.pic_mobile || '-'}
									</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Barang Yang Diberikan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{activityDetailItem?.item || '-'}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">Jumlah Barang</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{activityDetailItem?.total_item}</div>

									<div className="col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Checkout Description
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{activityDetailItem?.checkout_description}
									</div>
								</div>
							</Card>

							<div className="flex items-center justify-center gap-4">
								<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg md:px-10">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">
											{activityDetailItem?.total_promise || 0}
										</span>
										<div className="font-light text-gray-400">Total Janji </div>
									</div>
								</div>

								<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg cursor-pointer md:px-10">
									<Link to={`/penerima?program_id=${activityDetailItem?.program.id}`}>
										<div className="flex flex-col items-center justify-center space-y-1 text-center">
											<span className="text-2xl md:text-4xl font-extralight">
												{activityDetailItem?.total_participant || 0}
											</span>
											<div className="font-light text-gray-400">Lihat Peserta </div>
										</div>
									</Link>
								</div>
							</div>

							<div className="grid w-full grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md shadow-lg">
									<TableActivityPromise
										activityID={activityID}
										activityDetailID={activityDetailID}
										params={tableActivityPromiseListParams}
										setParams={(params) =>
											setTableActivityPromiseListParams({
												...tableActivityPromiseListFixedParams,
												...params
											})
										}
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

const ActivityDetailDetailSkeleton = () => (
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

export default ActivityDetailDetail;
