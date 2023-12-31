import { BannerFeature, FormStaff } from '@/components/molecules';
import React from 'react';

const StaffUpdate = () => {
	return (
		<div>
			<BannerFeature title="Edit - Tim Internal" />

			<section className="bg-gray-100">
				<div className="container py-16">
					<div className="max-w-screen-lg mx-auto">
						<div className="p-8 bg-white rounded-md">
							<FormStaff />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default StaffUpdate;
