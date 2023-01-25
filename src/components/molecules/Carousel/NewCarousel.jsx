import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselData } from './CarouselData';

export const NewCarousel = () => {
	const responsive = {
		desktop: {
			breakpoint: {
				max: 3000,
				min: 1024
			},
			items: 1,
			partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: {
				max: 464,
				min: 0
			},
			items: 1,
			partialVisibilityGutter: 30
		},
		tablet: {
			breakpoint: {
				max: 1024,
				min: 464
			},
			items: 1,
			partialVisibilityGutter: 30
		}
	};

	return (
		<>
			{/* < sm */}
			<div className="relative h-full py-20 lg:hidden">
				<Carousel
					additionalTransfrom={0}
					arrows
					autoPlay={true}
					autoPlaySpeed={2000}
					className=""
					dotListClass=""
					customTransition="all 1s linear"
					focusOnSelect={false}
					infinite
					itemClass=""
					minimumTouchDrag={80}
					pauseOnHover
					renderArrowsWhenDisabled={false}
					renderButtonGroupOutside={false}
					renderDotsOutside={true}
					responsive={responsive}
					rewind={false}
					rewindWithAnimation={false}
					rtl={false}
					shouldResetAutoplay
					showDots={true}
					sliderClass=""
					slidesToSlide={1}
				>
					{CarouselData.length > 0
						? CarouselData.map((data, index) => (
								<div key={index} className="h-full px-1 sm:px-5 rounded-xl">
									<img src={data.image} className="h-full rounded-xl" />
								</div>
						  ))
						: null}
				</Carousel>
			</div>

			{/* < sm */}
			<div className="relative hidden h-full py-20 lg:block">
				<Carousel
					additionalTransfrom={0}
					arrows
					centerMode
					autoPlay={true}
					autoPlaySpeed={2000}
					className=""
					dotListClass=""
					customTransition="all 1s linear"
					focusOnSelect={false}
					infinite
					itemClass=""
					minimumTouchDrag={80}
					pauseOnHover
					renderArrowsWhenDisabled={false}
					renderButtonGroupOutside={false}
					renderDotsOutside={true}
					responsive={responsive}
					rewind={false}
					rewindWithAnimation={false}
					rtl={false}
					shouldResetAutoplay
					showDots={true}
					sliderClass=""
					slidesToSlide={1}
				>
					{CarouselData.length > 0
						? CarouselData.map((data, index) => (
								<div key={index} className="h-full px-1 sm:px-5 rounded-xl">
									<img src={data.image} className="h-full rounded-xl" />
								</div>
						  ))
						: null}
				</Carousel>
			</div>
		</>
	);
};
