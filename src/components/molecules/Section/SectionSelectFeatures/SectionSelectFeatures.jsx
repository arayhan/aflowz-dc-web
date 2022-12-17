import { Link } from 'react-router-dom';
import { MENUS } from '@/utils/constants';
import { SearchGlobal } from '../../Search/SearchGlobal/SearchGlobal';

export const SectionSelectFeatures = () => {
	return (
		<div className="bg-gray-100">
			<div className="container py-20 space-y-10">
				<div className="text-center space-y-3">
					<div className="text-3xl font-extralight">Pilih Fitur</div>
					{/* <div className="text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A quos ipsum iste inventore est, maxime impedit
						eveniet tempora iusto hic obcaecati repellendus voluptatem. Natus porro assumenda, saepe quis dolorum
						perferendis?
					</div> */}
				</div>
				<div className="max-w-screen-lg mx-auto">
					<SearchGlobal />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
					<div className="border-2 flex-col justify-center bg-white py-5 mx-8 rounded-xl shadow-lg">
						<p className="text-center text-2xl font-extralight pb-3">MITRA</p>
						<div className="max-w-screen-2xl w-full flex flex-wrap justify-center gap-3 md:gap-5">
							{MENUS.map((menu) => {
								if (menu.id <= 3) {
									return (
										<Link
											key={menu.path}
											to={menu.path}
											className="w-24 sm:w-28 md:w-32 bg-white border-2 py-2 shadow-lg rounded-md hover:bg-opacity-20 cursor-pointer text-opacity-50 transition-all"
										>
											<div className="px-5">
												<img className="w-full" src={menu.icon} alt="" />
											</div>
											<div className="text-center text-sm lg:text-lg font-extralight">{menu.title}</div>
										</Link>
									);
								}
							})}
						</div>
					</div>
					<div className="border-2 flex-col justify-center bg-white py-5 mx-8 rounded-xl shadow-lg">
						<p className="text-center text-2xl font-extralight pb-3">KANTOR</p>
						<div className="max-w-screen-2xl w-full flex flex-wrap justify-center gap-3 md:gap-5">
							{MENUS.map((menu) => {
								if (menu.id > 3 && menu.id <= 5) {
									return (
										<Link
											key={menu.path}
											to={menu.path}
											className="w-24 sm:w-28 md:w-32 bg-white border-2 py-2 shadow-lg rounded-md hover:bg-opacity-20 cursor-pointer text-opacity-50 transition-all"
										>
											<div className="px-5">
												<img className="w-full" src={menu.icon} alt="" />
											</div>
											<div className="text-center text-sm lg:text-lg font-extralight">{menu.title}</div>
										</Link>
									);
								}
							})}
						</div>
					</div>
					<div className="sm:col-span-12 border-2 flex-col justify-center bg-white py-5 mx-8 rounded-xl shadow-lg">
						<p className="text-center text-2xl font-extralight pb-3">AKTIVITAS</p>
						<div className="max-w-screen-2xl w-full flex flex-wrap justify-center gap-3 md:gap-5">
							{MENUS.map((menu) => {
								if (menu.id > 5 && menu.id <= 11) {
									return (
										<Link
											key={menu.path}
											to={menu.path}
											className="w-24 sm:w-28 md:w-32 bg-white border-2 py-2 shadow-lg rounded-md hover:bg-opacity-20 cursor-pointer text-opacity-50 transition-all"
										>
											<div className="px-5">
												<img className="w-full" src={menu.icon} alt="" />
											</div>
											<div className="text-center text-sm lg:text-lg font-extralight">{menu.title}</div>
										</Link>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
