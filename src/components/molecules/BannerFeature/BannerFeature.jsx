import React from 'react';

export const BannerFeature = ({ title, description }) => {
	return (
		<div className="bg-primary">
			<div className="container py-20">
				<div className="space-y-6 text-white">
					<div className="font-extralight text-4xl md:text-5xl">{title}</div>
					<div className="text-gray-400">{description}</div>
				</div>
			</div>
		</div>
	);
};
