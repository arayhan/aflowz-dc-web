import { BannerFeature, FormProgramOrganization } from '@/components/molecules';
import { useParams } from 'react-router-dom';

const ProgramOrganizationForm = () => {
	const params = useParams();

	return (
		<div>
			<BannerFeature title={`Program Organization Structure - ${params.programOrganizationID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="p-8 bg-white rounded-md">
							<FormProgramOrganization />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProgramOrganizationForm;
