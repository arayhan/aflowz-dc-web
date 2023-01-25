import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, TableActivityDetail } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const ActivityDetail = () => {
	const { activityID } = useParams();

	const { activityItem, fetchingActivityItem } = useActivityStore();
	const { getActivityItem, getActivityDetailList } = useActivityStore();

	const [tableActivityDetailListParams, setTableActivityDetailListParams] = useState({ activity_id: activityID });

	useEffect(() => {
		if (activityID) {
			getActivityItem(activityID);
			getActivityDetailList({ activity_id: activityID });
		}
	}, [activityID]);

	return (
		<div>
			<BannerFeature
				title={activityItem ? `Kegiatan : ${activityItem.description}` : 'Detail Kegiatan'}
				loading={fetchingActivityItem}
			/>

			<section className="py-12 bg-gray-100 md:py-20">
				<div className="container">
					{fetchingActivityItem && <ActivityDetailSkeleton />}
					{!fetchingActivityItem && activityItem && (
						<div className="space-y-6">
							<Card
								title={'Details'}
								description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
								className={'bg-white rounded-md'}
								linkRoute={`/activity/update/${activityItem?.id}`}
								isInDetail
							>
								<div className="grid grid-cols-12 p-5 text-sm gap-y-1">
									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Deskripsi Kegiatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">{activityItem?.description}</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Institusi
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityItem?.konstituen?.name && '-'}
										{activityItem?.konstituen?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/institusi/${activityItem?.konstituen.id}`}
												text={activityItem?.konstituen.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kota
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityItem?.city?.name && '-'}
										{activityItem?.city?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/city/${activityItem?.city.id}`}
												text={activityItem?.city.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Kecamatan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityItem?.district?.name && '-'}
										{activityItem?.district?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/district/${activityItem?.district.id}`}
												text={activityItem?.district.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Desa / Kelurahan
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityItem?.village?.name && '-'}
										{activityItem?.village?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/dapil/village/${activityItem?.village.id}`}
												text={activityItem?.village.name}
											/>
										)}
									</div>

									<div className="flex items-center col-span-4 px-3 py-2 text-gray-500 bg-gray-100 lg:col-span-3">
										Program
									</div>
									<div className="col-span-8 px-3 py-2 lg:col-span-9 bg-gray-50">
										{!activityItem?.program?.name && '-'}
										{activityItem?.program?.name && (
											<ButtonAction
												action={ACTION_TYPES.SEE_DETAIL}
												linkTo={`/program/${activityItem?.program.id}`}
												text={activityItem?.program.name}
											/>
										)}
									</div>
								</div>
							</Card>

							<div className="flex flex-col items-center justify-center">
								<div className="px-8 py-6 mb-2 bg-white rounded-md shadow-lg md:px-10">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">{activityItem?.total_activity || 0}</span>
										<div className="font-light text-gray-400">Total Kegiatan </div>
									</div>
								</div>
							</div>

							<div className="grid w-full grid-cols-12 gap-4">
								<div className="col-span-12 bg-white rounded-md shadow-lg">
									<TableActivityDetail
										activityID={activityID}
										params={tableActivityDetailListParams}
										setParams={setTableActivityDetailListParams}
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

const ActivityDetailSkeleton = () => (
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

export default ActivityDetail;
