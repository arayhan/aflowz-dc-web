import React from 'react';
import { CarouselComp } from '../../index';

export const BannerHome = () => {
	return (
		<div className="w-full flex items-center justify-center bg-primary pt-8 pb-20">
			<div className="container max-w-screen-lg">
				<CarouselComp />
			</div>
		</div>
	);
};
