import { Link } from 'react-router-dom';
import { AKTIVITAS_MENUS, KAMPANYE_MENUS, KANTOR_MENUS, MENUS, MITRA_MENUS } from '@/utils/constants';
import { SearchGlobal } from '../../Search/SearchGlobal/SearchGlobal';

export const SectionSelectFeatures = () => {
	return (
		<div className="bg-gray-100">
			<div className="container pt-10 pb-20 space-y-10">
				<div className="space-y-3 text-center">
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
				<div className="grid w-full gap-5 md:gap-8 md:grid-cols-2">
					<div className="w-full bg-white shadow-md rounded-xl">
						<div className="p-4 text-2xl text-center font-extralight">
							<div>MITRA</div>
						</div>
						<hr />
						<div className="flex flex-wrap justify-center w-full gap-3 px-4 py-8 max-w-screen-2xl md:gap-5">
							{MITRA_MENUS.map((menu) => {
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
					<div className="w-full bg-white shadow-md rounded-xl">
						<div className="p-4 text-2xl text-center font-extralight">
							<div>KANTOR</div>
						</div>
						<hr />
						<div className="flex flex-wrap justify-center w-full gap-3 px-4 py-8 max-w-screen-2xl md:gap-5">
							{KANTOR_MENUS.map((menu) => {
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
					<div className="w-full bg-white shadow-md rounded-xl">
						<div className="p-4 text-2xl text-center font-extralight">
							<div>AKTIVITAS</div>
						</div>
						<hr />
						<div className="flex flex-wrap justify-center w-full gap-3 px-4 py-8 max-w-screen-2xl md:gap-5">
							{AKTIVITAS_MENUS.map((menu) => {
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
					<div className="w-full bg-white shadow-md rounded-xl">
						<div className="p-4 text-2xl text-center font-extralight">
							<div>KAMPANYE</div>
						</div>
						<hr />
						<div className="flex flex-wrap justify-center w-full gap-3 px-4 py-8 max-w-screen-2xl md:gap-5">
							{KAMPANYE_MENUS.map((menu) => {
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
			</div>
		</div>
	);
};
