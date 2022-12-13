import { AlertErrors, BannerFeature, FormCity } from '@/components/molecules';
import { useCityStore } from '@/store';
import { useParams } from 'react-router-dom';

const CityForm = () => {
	const { cityID } = useParams();
	const { errorsCity } = useCityStore();

	return (
		<div>
			<BannerFeature
				title={`Kota - ${cityID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsCity && <AlertErrors errors={errorsCity} />}

						<div className="bg-white p-8 rounded-md">
							<FormCity />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CityForm;
