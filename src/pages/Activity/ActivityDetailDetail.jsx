import { Card } from '@/components/atoms';
import { BannerFeature, TableActivityPromise } from '@/components/molecules';
import { useActivityStore } from '@/store';
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

			<section className="bg-gray-100 py-12 md:py-20">
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
								<div className="grid grid-cols-12 gap-y-1 text-sm p-5">
									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Nama Kegiatan
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{activityDetailItem?.activity?.name}
									</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Deskripsi Detail Kegiatan
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">{activityDetailItem?.description}</div>

									<div className="col-span-4 lg:col-span-3 flex items-center text-gray-500 bg-gray-100 px-3 py-2">
										Tanggal Kegiatan
									</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{activityDetailItem?.activity_date}
									</div>

									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Mitra</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										{activityDetailItem?.pic} {activityDetailItem?.pic_mobile && `(${activityDetailItem?.pic_mobile})`}
									</div>

									<div className="col-span-4 lg:col-span-3 text-gray-500 bg-gray-100 px-3 py-2">PIC Tim Internal</div>
									<div className="col-span-8 lg:col-span-9 px-3 py-2 bg-gray-50">
										<Link
											to={`/staff/${activityDetailItem?.pic_staff_id.id}`}
											className="text-primary underline hover:text-primary-400"
										>
											{activityDetailItem?.pic_staff_id.name}{' '}
											{activityDetailItem?.pic_staff_id.mobile && `(${activityDetailItem?.pic_staff_id.mobile})`}
										</Link>
									</div>
								</div>
							</Card>

							<div className="flex flex-col items-center justify-center">
								<div className="bg-white rounded-md px-8 md:px-10 py-6 mb-2 shadow-lg">
									<div className="flex flex-col items-center justify-center space-y-1 text-center">
										<span className="text-2xl md:text-4xl font-extralight">
											{activityDetailItem?.total_promise || 0}
										</span>
										<div className="font-light text-gray-400">Total Janji </div>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-12 gap-4 w-full">
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

export default ActivityDetailDetail;
