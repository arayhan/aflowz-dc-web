import React from 'react';
import { HomeFeatureList } from '../HomeFeature/HomeFeatureList';

export const HomeBanner = () => {
	return (
		<div className="fixed -z-10 top-0 w-full h-screen flex flex-col items-center justify-center bg-primary">
			<div className="container max-w-screen-lg space-y-12 md:space-y-16">
				<div className="space-y-6 text-white text-center">
					<div className="font-extralight text-3xl md:text-4xl lg:text-5xl">DEWI CORYATI&apos;S WEB</div>
					<div className="text-sm md:text-base text-gray-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem itaque aspernatur sapiente quis
						deleniti, laudantium possimus illum at sint voluptates? Debitis dignissimos, quasi sequi iste in nisi
						necessitatibus adipisci. Iusto.
					</div>
				</div>
				<hr className="opacity-10" />
				<HomeFeatureList />
			</div>
		</div>
	);
};
