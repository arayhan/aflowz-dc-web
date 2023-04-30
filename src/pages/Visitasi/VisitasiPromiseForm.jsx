import { BannerFeature, FormVisitasiPromise } from '@/components/molecules';
import { useVisitasiStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VisitasiPromiseForm = () => {
	const { visitasiID, visitasiPromiseID } = useParams();
	const { visitasiItem, fetchingVisitasiItem, getVisitasiItem } = useVisitasiStore();

	useEffect(() => {
		if (!visitasiItem) getVisitasiItem(visitasiID);
	}, [visitasiItem]);

	return (
		<div>
			<BannerFeature
				title={`Janji Visitasi - ${visitasiPromiseID ? 'Update' : 'Create'}`}
				loading={fetchingVisitasiItem}
				description={visitasiItem?.description}
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto space-y-3">
						<div className="p-8 bg-white rounded-md">
							<FormVisitasiPromise />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default VisitasiPromiseForm;
