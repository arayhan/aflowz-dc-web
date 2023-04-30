import { BannerFeature, FormActivityDetail } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ActivityDetailForm = () => {
	const { activityID, activityDetailID } = useParams();
	const { activityItem, fetchingActivityItem, getActivityItem } = useActivityStore();

	useEffect(() => {
		if (!activityItem) getActivityItem(activityID);
	}, [activityItem]);

	return (
		<div>
			<BannerFeature
				title={`Detail Kegiatan - ${activityDetailID ? 'Update' : 'Create'}`}
				loading={fetchingActivityItem}
				description={activityItem?.description}
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						<div className="p-8 bg-white rounded-md">
							<FormActivityDetail />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ActivityDetailForm;
