import { ButtonAction, Card } from '@/components/atoms';
import { BannerFeature, CardDetailTotal, ChartPeriodeProgram, TablePenerima } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

const ActivityDetail = () => {
	const { activityID } = useParams();

	const { activityDetail, fetchingActivityDetail, getActivityDetail } = useActivityStore();

	const [tableParams] = useState({ activity_id: activityID });

	useEffect(() => {
		if (activityID) getActivityDetail(activityID);
	}, [activityID]);

	return (
		<div>
			<BannerFeature
				title={activityDetail ? `${activityDetail.activity_name}` : 'Kegiatan'}
				loading={fetchingActivityDetail}
			/>

			<section className="bg-gray-100 py-12 md:py-20">
				<div className="container"></div>
			</section>
		</div>
	);
};

const ActivityDetailSkeleton = () => (
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

export default ActivityDetail;
