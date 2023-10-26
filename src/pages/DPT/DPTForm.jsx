import { Alert } from '@/components/atoms';
import { BannerFeature, FormDPT } from '@/components/molecules';
import { useDPTStore } from '@/store';
import { useParams } from 'react-router-dom';

const DPTForm = () => {
	const { DPTID } = useParams();
	const { errorsDPT } = useDPTStore();

	return (
		<div>
			<BannerFeature title={`DPT - ${DPTID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsDPT && <Alert message="ERROR" />}

						<div className="p-8 bg-white rounded-md">
							<FormDPT />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DPTForm;
