import React from 'react';
import { Link } from 'react-router-dom';
import { MENUS } from '@/utils/constants';

export const HomeMenu = () => {
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
					<div className="max-w-screen-xl w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
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
