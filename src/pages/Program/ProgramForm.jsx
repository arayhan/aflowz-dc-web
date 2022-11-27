import { BannerFeature, FormProgram } from '@/components/molecules';
import { useParams } from 'react-router-dom';

const ProgramForm = () => {
	const params = useParams();

	return (
		<div>
			<BannerFeature
				title={`Program - ${params.programID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormProgram />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProgramForm;
