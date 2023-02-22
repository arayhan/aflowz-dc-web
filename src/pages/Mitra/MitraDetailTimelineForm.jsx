import { Alert } from '@/components/atoms';
import { BannerFeature, FormMitraTimeline } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useParams } from 'react-router-dom';

const MitraDetailTimelineForm = () => {
	const { programCategoryTimelineID } = useParams();
	const { programCategoryTimelineErrors } = useProgramStore();

	return (
		<div>
			<BannerFeature title={`Timeline Mitra - ${programCategoryTimelineID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{programCategoryTimelineErrors && <Alert type="danger" message={programCategoryTimelineErrors.params} />}

						<div className="p-8 bg-white rounded-md">
							<FormMitraTimeline />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MitraDetailTimelineForm;
