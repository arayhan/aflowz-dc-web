import { BannerFeature, TablePenerimaKonstituenDetail } from '@/components/molecules';
import { useKonstituenStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ListPenerimaByKonstituen = () => {
	const { konstituenDetail, getKonstituenDetail } = useKonstituenStore();

	const params = useParams();

	useEffect(() => {
		getKonstituenDetail(params.konstituenID);
	}, [params]);

	return (
		<div>
			<BannerFeature title={'List Penerima' + ' ' + konstituenDetail?.konstituen_name || 'Institusi'} />
			<div className="bg-gray-100 py-6">
				<div className="py-6 container bg-white rounded-md">
					<TablePenerimaKonstituenDetail konstituenID={parseInt(params.konstituenID)} />
				</div>
			</div>
		</div>
	);
};

export default ListPenerimaByKonstituen;
