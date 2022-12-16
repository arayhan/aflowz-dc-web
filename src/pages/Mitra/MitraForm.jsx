import { Alert } from '@/components/atoms';
import { BannerFeature, FormMitra } from '@/components/molecules';
import { useProgramStore } from '@/store';
import { useParams } from 'react-router-dom';

const MitraForm = () => {
	const { programCategoryID } = useParams();
	const { programCategoryErrors } = useProgramStore();

	return (
		<div>
			<BannerFeature title={`Mitra - ${programCategoryID ? 'Update' : 'Create'}`} />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						{programCategoryErrors && <Alert message={programCategoryErrors.params} />}

						<div className="bg-white p-8 rounded-md">
							<FormMitra />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MitraForm;
