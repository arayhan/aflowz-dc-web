import React, { useEffect, useState } from 'react';
import { CarouselData } from './CarouselData';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const CarouselComp = () => {
	return (
		<div className="mt-8">
			<Carousel
				autoPlay={true}
				interval={'5000'}
				infiniteLoop={true}
				swipeable={true}
				showArrows={true}
				showThumbs={false}
			>
				{CarouselData.length > 0
					? CarouselData.map((data, index) => (
							<div key={index} className="h-full">
								<img src={data.image} className="h-full rounded-lg" />
							</div>
					  ))
					: null}
			</Carousel>
		</div>
	);
};
