import { Alert } from '@/components/atoms';
import { BannerFeature, FormDistrict } from '@/components/molecules';
import { useDistrictStore } from '@/store';
import { useParams } from 'react-router-dom';

const DistrictForm = () => {
	const { districtID } = useParams();
	const { errorsDistrict } = useDistrictStore();

	return (
		<div>
			<BannerFeature
				title={`Kecamatan - ${districtID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsDistrict && <Alert message="ERROR" />}

						<div className="bg-white p-8 rounded-md">
							<FormDistrict />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DistrictForm;
