import { Alert } from '@/components/atoms';
import { BannerFeature, FormVillage } from '@/components/molecules';
import { useVillageStore } from '@/store';
import { useParams } from 'react-router-dom';

const VillageForm = () => {
	const { villageID } = useParams();
	const { errorsVillage } = useVillageStore();

	return (
		<div>
			<BannerFeature
				title={`Desa - ${villageID ? 'Update' : 'Create'}`}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{errorsVillage && <Alert message="ERROR" />}

						<div className="bg-white p-8 rounded-md">
							<FormVillage />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default VillageForm;
