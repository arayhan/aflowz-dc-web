import React from 'react';
import homeHeaderLogo from '@/images/icons/1.png';

export const BannerHome = () => {
	return (
		<div className="w-full flex flex-col items-center justify-center bg-primary pt-8 pb-20 h-screen">
			<div className="container max-w-screen-lg space-y-8 md:space-y-12 lg:space-y-16">
				<div className="space-y-6 text-white text-center">
					<div className="flex justify-center">
						<img src={homeHeaderLogo} />
					</div>
					<div className="text-sm md:text-base text-gray-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem itaque aspernatur sapiente quis
						deleniti, laudantium possimus illum at sint voluptates? Debitis dignissimos, quasi sequi iste in nisi
						necessitatibus adipisci. Iusto.
					</div>
				</div>
			</div>
		</div>
	);
};
