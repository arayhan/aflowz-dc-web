import { AlertErrors, BannerFeature, FormActivity } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { useParams } from 'react-router-dom';

const ActivityForm = () => {
	const { activityID } = useParams();
	const { errorsActivity } = useActivityStore();

	return (
		<div>
			<BannerFeature title={`Kegiatan - ${activityID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsActivity && <AlertErrors errors={errorsActivity} />}

						<div className="bg-white p-8 rounded-md">
							<FormActivity />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ActivityForm;
