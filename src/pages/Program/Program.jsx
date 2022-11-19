import { BannerFeature, TableProgram } from '@/components/molecules';
import React from 'react';

const Program = () => {
	const MENUS = [
		{ title: 'Kemendikbud', icon: require('@/images/icons/box.svg').default, path: '/kemendikbud' },
		{ title: 'Kemenpora', icon: require('@/images/icons/box.svg').default, path: '/kemenpora' },
		{ title: 'Kemkominfo', icon: require('@/images/icons/box.svg').default, path: '/kemkominfo' }
	];

	return (
		<div>
			<BannerFeature title="Program" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
			<div className="bg-gray-100">
				<div className="bg-white p-6 rounded-md">
					<div className="container">
						<div className="space-y-6">
							<div className="flex flex-wrap gap-4">
								{MENUS.map((menu) => (
									<div
										key={menu.path}
										className="flex w-32 flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100 cursor-pointer"
									>
										<img className="w-12" src={menu.icon} alt="" />
										<div className="text-xs text-gray-400">{menu.title}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="py-6">
					<div className="container bg-white p-6 rounded-md space-y-6">
						<div>
							<div className="text-lg font-extralight">Kemendikbud</div>
							<div className="text-sm text-gray-400">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
							</div>
						</div>
						<hr />
						<div className="p-4">
							<TableProgram />
							{/* <table className="w-full text-center">
								<thead>
									<tr>
										<th className="border p-2 bg-gray-50">No.</th>
										<th className="border p-2 bg-gray-50">Nama Program</th>
										<th className="border p-2 bg-gray-50">Category Program</th>
										<th className="border p-2 bg-gray-50">Periode</th>
										<th className="border p-2 bg-gray-50">Detail</th>
										<th className="border p-2 bg-gray-50">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border p-2 text-sm">1</td>
										<td className="border p-2 text-sm">PIP 2020</td>
										<td className="border p-2 text-sm">PIP (Program Indonesia Pintar)</td>
										<td className="border p-2 text-sm">2020</td>
										<td className="border p-2 text-sm">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Detail</button>
										</td>
										<td className="border p-2 text-sm space-x-3">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Edit</button>
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Hapus</button>
										</td>
									</tr>
									<tr>
										<td className="border p-2 text-sm">2</td>
										<td className="border p-2 text-sm">PIP 2022</td>
										<td className="border p-2 text-sm">PIP (Program Indonesia Pintar)</td>
										<td className="border p-2 text-sm">2022</td>
										<td className="border p-2 text-sm">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Detail</button>
										</td>
										<td className="border p-2 text-sm space-x-3">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Edit</button>
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Hapus</button>
										</td>
									</tr>
									<tr>
										<td className="border p-2 text-sm">3</td>
										<td className="border p-2 text-sm">KIP 2020</td>
										<td className="border p-2 text-sm">KIP (Kartu Indonesia Pintar)</td>
										<td className="border p-2 text-sm">2020</td>
										<td className="border p-2 text-sm">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Detail</button>
										</td>
										<td className="border p-2 text-sm space-x-3">
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Edit</button>
											<button className="bg-primary px-3 py-1 text-white rounded-md text-sm">Hapus</button>
										</td>
									</tr>
								</tbody>
							</table> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Program;
