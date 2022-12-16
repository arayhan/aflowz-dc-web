import { BannerFeature, FormPenerima } from '@/components/molecules';
import { useParams } from 'react-router-dom';

const PenerimaForm = () => {
	const params = useParams();

	return (
		<div>
			<BannerFeature title={`Penerima - ${params.penerimaID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormPenerima />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PenerimaForm;
