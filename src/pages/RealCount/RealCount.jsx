import { BannerFeature } from '@/components/molecules';
import { KAMPANYE_REALCOUNT_MENUS } from '@/utils/constants';
import { Link } from 'react-router-dom';

const RealCount = () => {
	return (
		<div className="bg-gray-100">
			<BannerFeature title="Real Count" />
			<div className="container py-40">
				<div className="flex flex-wrap items-center justify-center w-full gap-3 max-w-screen-2xl md:gap-5">
					{KAMPANYE_REALCOUNT_MENUS.map((menu) => {
						return (
							<Link
								key={menu.path}
								to={menu.path}
								className="w-24 py-2 text-opacity-50 transition-all bg-white border-2 rounded-md shadow-lg cursor-pointer sm:w-28 md:w-32 hover:bg-gray-100"
							>
								<div className="px-5">
									<img className="w-full" src={menu.icon} alt="" />
								</div>
								<div className="text-sm text-center lg:text-lg font-extralight">{menu.title}</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default RealCount;
