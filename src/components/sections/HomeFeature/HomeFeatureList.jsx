import { Link } from 'react-router-dom';
import { MENUS } from '@/utils/constants';

export const HomeFeatureList = () => {
	return (
		<div className="flex justify-center">
			<div className="max-w-screen-2xl w-full flex flex-wrap justify-center gap-3 md:gap-5">
				{MENUS.map((menu) => (
					<Link
						key={menu.path}
						to={menu.path}
						className="w-24 sm:w-28 md:w-32 bg-white py-2 bg-opacity-10 shadow-md rounded-md hover:bg-opacity-20 cursor-pointer text-white text-opacity-50 transition-all"
					>
						<div className="px-5">
							<img className="w-full" src={menu.icon} alt="" />
						</div>
						<div className="text-center text-sm lg:text-lg font-extralight">{menu.title}</div>
					</Link>
				))}
			</div>
		</div>
	);
};
