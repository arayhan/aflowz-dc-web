import { Link } from 'react-router-dom';
import { MENUS } from '@/utils/constants';
import { SearchGlobal } from '../../Search/SearchGlobal/SearchGlobal';

export const SectionSelectFeatures = () => {
	return (
		<div className="bg-gray-100">
			<div className="container py-20 space-y-10">
				<div className="text-center space-y-3">
					<div className="text-3xl font-extralight">Select Features</div>
					<div className="text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A quos ipsum iste inventore est, maxime impedit
						eveniet tempora iusto hic obcaecati repellendus voluptatem. Natus porro assumenda, saepe quis dolorum
						perferendis?
					</div>
				</div>
				<div className="max-w-screen-lg mx-auto">
					<SearchGlobal />
				</div>
				<div className="flex justify-center">
					<div className="max-w-screen-2xl w-full flex flex-wrap justify-center gap-3 md:gap-5">
						{MENUS.map((menu) => (
							<Link
								key={menu.path}
								to={menu.path}
								className="w-24 sm:w-28 md:w-32 bg-white py-2 shadow-md rounded-md hover:bg-opacity-20 cursor-pointer text-opacity-50 transition-all"
							>
								<div className="px-5">
									<img className="w-full" src={menu.icon} alt="" />
								</div>
								<div className="text-center text-sm lg:text-lg font-extralight">{menu.title}</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
