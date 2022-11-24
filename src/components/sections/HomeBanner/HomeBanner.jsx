import React from 'react';

export const HomeBanner = () => {
	return (
		<div className="w-full flex flex-col items-center justify-center bg-primary py-60">
			<div className="container max-w-screen-lg space-y-8 md:space-y-12 lg:space-y-16">
				<div className="space-y-6 text-white text-center">
					<div className="font-extralight text-3xl md:text-4xl lg:text-5xl">DEWI CORYATI&apos;S WEB</div>
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
