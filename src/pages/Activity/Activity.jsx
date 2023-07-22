import { BannerFeature, TableActivity, SectionSelectCategoryActivity } from '@/components/molecules';
import { queryStringToObject } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Activity = () => {
	const { search } = useLocation();
	const [params, setParams] = useState({});

	useEffect(() => {
		setParams(search ? queryStringToObject(decodeURI(search)) : {});
	}, [search]);

	return (
		<div className="bg-gray-100">
			<BannerFeature title="List Kegiatan" />
			<SectionSelectCategoryActivity params={params} selectedCategoryID={params.activity_category_id} />
			{params && (
				<div className="container py-16">
					<TableActivity
						displayedColumns={[
							'#',
							'Nama Kegiatan',
							'Kategori Kegiatan',
							'Program Terkait',
							'Institusi Terkait',
							'Tanggal Kunjungan/Kegiatan',
							'PIC Tim Internal',
							'Partner yang Dikunjungi',
							'Kontak PIC'
						]}
						params={params}
					/>
				</div>
			)}
		</div>
	);
};

export default Activity;
