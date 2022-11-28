import { BannerFeature, TablePenerimaKonstituenDetail } from '@/components/molecules';
import { useKonstituenStore } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ListPenerimaByKonstituen = () => {
	const {
		fetchingPenerimaKonstituenDetail,
		penerimaKonstituenDetail,
		getPenerimaKonstituenDetail,
		konstituenDetail,
		getKonstituenDetail
	} = useKonstituenStore();

	const params = useParams();

	useEffect(() => {
		getPenerimaKonstituenDetail(params.konstituenID);
		getKonstituenDetail(params.konstituenID);
	}, [params]);

	return (
		<div>
			<BannerFeature
				title={'List Penerima' + ' ' + konstituenDetail?.konstituen_name || 'Konstituen'}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
			<div className="bg-gray-100 py-6">
				<div className="py-6 container bg-white rounded-md">
					<TablePenerimaKonstituenDetail
						dataPenerima={penerimaKonstituenDetail ? penerimaKonstituenDetail.items : []}
						setLoading={fetchingPenerimaKonstituenDetail || penerimaKonstituenDetail === null}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListPenerimaByKonstituen;
