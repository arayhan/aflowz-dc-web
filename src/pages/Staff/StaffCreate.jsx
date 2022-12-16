import { BannerFeature, FormStaff } from '@/components/molecules';
import React from 'react';

const StaffCreate = () => {
	return (
		<div>
			<BannerFeature title="Create - Tim Internal" />

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

export default StaffCreate;
