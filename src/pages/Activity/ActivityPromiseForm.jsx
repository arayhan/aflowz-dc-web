import { BannerFeature, FormActivityPromise } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ActivityPromiseForm = () => {
	const { activityID, activityPromiseID } = useParams();
	const { activityItem, fetchingActivityItem, getActivityItem } = useActivityStore();

	useEffect(() => {
		if (!activityItem) getActivityItem(activityID);
	}, [activityItem]);

	return (
		<div>
			<BannerFeature
				title={`Janji Kegiatan - ${activityPromiseID ? 'Update' : 'Create'}`}
				loading={fetchingActivityItem}
				description={activityItem?.description}
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						<div className="bg-white p-8 rounded-md">
							<FormActivityPromise />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ActivityPromiseForm;
