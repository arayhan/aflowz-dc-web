import { Alert } from '@/components/atoms';
import { BannerFeature, FormProgramTimeline } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useParams } from 'react-router-dom';

const ProgramDetailTimelineForm = () => {
	const { programTimelineID } = useParams();
	const { programTimelineErrors } = useProgramStore();

	return (
		<div>
			<BannerFeature title={`Timeline Program - ${programTimelineID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{programTimelineErrors && <Alert type="danger" message={programTimelineErrors.params} />}

						<div className="p-8 bg-white rounded-md">
							<FormProgramTimeline />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProgramDetailTimelineForm;
