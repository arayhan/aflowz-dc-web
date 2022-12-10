import { Alert } from '@/components/atoms';
import { BannerFeature, FormTPS } from '@/components/molecules';
import { useTPSStore } from '@/store';
import { useParams } from 'react-router-dom';

const TPSForm = () => {
	const { TPSID } = useParams();
	const { errorsTPS } = useTPSStore();

	return (
		<div>
			<BannerFeature
				title={`TPS - ${TPSID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/TPS'}
				backButtonText="Kembali ke List TPS"
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsTPS && <Alert message="ERROR" />}

						<div className="bg-white p-8 rounded-md">
							<FormTPS />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default TPSForm;
