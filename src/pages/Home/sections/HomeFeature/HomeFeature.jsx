import React from 'react';
import { HomeFeatureList } from './HomeFeatureList';

export const HomeFeature = () => {
	return (
		<div className="bg-gray-100">
			<div className="container py-20 space-y-10">
				<div className="text-center space-y-3">
					<div className="text-3xl font-extralight">Lorem ipsum dolor sit amet.</div>
					<div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A quos ipsum iste inventore est, maxime impedit
						eveniet tempora iusto hic obcaecati repellendus voluptatem. Natus porro assumenda, saepe quis dolorum
						perferendis?
					</div>
				</div>
				<hr />
				<HomeFeatureList />
			</div>
		</div>
	);
};
