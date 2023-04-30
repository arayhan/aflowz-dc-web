import { BannerFeature, FormVisitasi } from '@/components/molecules';
import { useParams } from 'react-router-dom';

const VisitasiForm = () => {
	const { visitasiID } = useParams();

	return (
		<div>
			<BannerFeature title={`Visitasi - ${visitasiID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						<div className="p-8 bg-white rounded-md">
							<FormVisitasi />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default VisitasiForm;
