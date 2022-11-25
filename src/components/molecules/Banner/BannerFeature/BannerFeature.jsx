import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const BannerFeature = ({ title, description, loading }) => {
	return (
		<div className="bg-primary">
			<div className="container py-20">
				{loading && (
					<div className="space-y-2 flex flex-col opacity-30">
						<Skeleton width={220} height={40} />
						<Skeleton className="max-w-full" width={400} height={25} />
					</div>
				)}

				{!loading && (
					<div className="space-y-6 text-white">
						{title && <div className="font-extralight text-4xl md:text-5xl">{title}</div>}
						{description && <div className="text-gray-400">{description}</div>}
					</div>
				)}
			</div>
		</div>
	);
};

BannerFeature.defaultProps = {
	loading: false
};
