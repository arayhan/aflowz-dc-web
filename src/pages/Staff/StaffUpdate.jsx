import { BannerFeature, FormStaff } from '@/components/molecules';
import React from 'react';

const StaffUpdate = () => {
	return (
		<div>
			<BannerFeature
				title="Edit - Tim Internal"
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
				backButtonLinkTo={'/staff'}
				backButtonText="Kembali ke List Staff"
			/>

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="bg-white p-8 rounded-md">
							<FormStaff />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default StaffUpdate;
