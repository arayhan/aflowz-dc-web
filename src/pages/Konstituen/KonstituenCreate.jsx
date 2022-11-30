import { BannerFeature, FormKonstituen } from '@/components/molecules';
import React from 'react';

const KonstituenCreate = () => {
	return (
		<div>
			<BannerFeature
				title="Create - Institusi"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormKonstituen />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default KonstituenCreate;
