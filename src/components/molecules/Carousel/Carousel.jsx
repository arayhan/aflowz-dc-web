import React, { useState } from 'react';
import { CarouselData } from './CarouselData';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

export const CarouselComp = () => {
	const settings = {
		dots: true,
		className: 'center',
		centerMode: true,
		infinite: true,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
		cssEase: 'linear',
		adaptiveHeight: false,
		focusOnSelect: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					dots: true,
					className: 'center',
					centerMode: true,
					infinite: true,
					autoplay: true,
					speed: 1000,
					autoplaySpeed: 5000,
					cssEase: 'linear',
					adaptiveHeight: false,
					focusOnSelect: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	return (
		<div className="py-10 h-fit">
			<Slider {...settings}>
				{CarouselData.length > 0
					? CarouselData.map((data, index) => (
							<div key={index} className="h-full px-1 sm:px-5 rounded-xl">
								<img src={data.image} className="h-full rounded-xl" />
							</div>
					  ))
					: null}
			</Slider>
		</div>
	);
};
