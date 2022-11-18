import React from 'react';
import { Link } from 'react-router-dom';

export const HomeMenu = () => {
	const MENUS = [
		{ title: 'Mitra', icon: require('@/images/icons/box.svg').default, path: '/mitra' },
		{ title: 'Sekolah', icon: require('@/images/icons/box.svg').default, path: '/sekolah' },
		{ title: 'Kampus', icon: require('@/images/icons/box.svg').default, path: '/kampus' },
		{ title: 'Desa', icon: require('@/images/icons/box.svg').default, path: '/desa' },
		{ title: 'Kota', icon: require('@/images/icons/box.svg').default, path: '/kota' },
		{ title: 'Program', icon: require('@/images/icons/box.svg').default, path: '/program' }
	];
	return (
		<div className="bg-gray-100">
			<div className="container py-20 space-y-10">
				<div className="text-center space-y-3">
					<div className="text-3xl font-extralight">Lorem ipsum dolor sit amet.</div>
					<div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. A quos ipsum iste inventore est, maxime impedit
						eveniet tempora iusto hic obcaecati repellendus voluptatem. Natus porro assumenda, saepe quis dolorum
						perferendis?
					</div>
				</div>
				<hr />
				<div className="flex justify-center">
					<div className="max-w-screen-xl w-full grid grid-cols-6 gap-6">
						{MENUS.map((menu, index) => (
							<Link
								key={menu.path}
								to={menu.path}
								className="p-4 bg-white shadow-md rounded-md hover:bg-gray-50 cursor-pointer"
							>
								<div>
									<img className="w-full" src={menu.icon} alt="" />
								</div>
								<div className="space-y-2 text-center">
									<div className="text-lg font-extralight">{menu.title}</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
