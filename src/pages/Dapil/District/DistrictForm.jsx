import { AlertErrors, BannerFeature, FormDistrict } from '@/components/molecules';
import { useDistrictStore } from '@/store';
import { useParams } from 'react-router-dom';

const DistrictForm = () => {
	const { districtID } = useParams();
	const { errorsDistrict } = useDistrictStore();

	return (
		<div>
			<BannerFeature title={`Kecamatan - ${districtID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsDistrict && <AlertErrors errors={errorsDistrict} />}

						<div className="p-8 bg-white rounded-md">
							<FormDistrict />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DistrictForm;
