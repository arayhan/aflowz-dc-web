import { BannerFeature, FormKonstituenUpdate } from '@/components/molecules';
import { useKonstituenStore } from '@/store';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KonstituenUpdate = () => {
    const params = useParams();
    const { konstituenDetail, getKonstituenDetail } = useKonstituenStore();

    useEffect(() => {
        getKonstituenDetail(params.konstituenID);
    }, [params]);

	return (
		<div>
			<BannerFeature title={konstituenDetail?.konstituen_name} description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormKonstituenUpdate />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default KonstituenUpdate;