import { AlertErrors, BannerFeature, FormActivityDetail } from '@/components/molecules';
import { useActivityStore } from '@/store';
import { useParams } from 'react-router-dom';

const ActivityDetailForm = () => {
	const { activityDetailID } = useParams();
	const { errorsActivityDetail } = useActivityStore();

	return (
		<div>
			<BannerFeature
				title={`Detail Kegiatan - ${activityDetailID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsActivityDetail && <AlertErrors errors={errorsActivityDetail} />}

						<div className="bg-white p-8 rounded-md">
							<FormActivityDetail />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ActivityDetailForm;
