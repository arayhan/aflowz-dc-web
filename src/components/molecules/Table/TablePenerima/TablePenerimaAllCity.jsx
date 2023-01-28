import { usePartnerStore } from '@/store/partner.store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TablePenerimaAllCity = () => {
	const { penerimaAllCity, getPenerimaAllCity } = usePartnerStore();

	const [data, setData] = useState([]);

	useEffect(() => {
		getPenerimaAllCity();
	}, []);

	useEffect(() => {
		if (penerimaAllCity) setData(penerimaAllCity);
	}, [penerimaAllCity]);

	return (
		<div className="py-5 bg-gray-100">
			<div className="container px-14">
				<div className="container flex-col py-5 overflow-y-auto bg-white border rounded-lg shadow-lg">
					<p className="pb-5 text-xl text-center lg:text-3xl font-extralight">Daftar Penerima di Provinsi Bengkulu</p>
					<div className="grid grid-cols-1 pb-5 h-44 sm:h-fit sm:grid-cols-2 md:grid-cols-3">
						{data.map((val) => {
							return (
								<Link
									to={`/dapil/city/${val.id}`}
									key={val.id}
									className="flex justify-between px-2 py-2 mx-2 my-2 border rounded-md shadow-lg cursor-pointer hover:bg-gray-100"
								>
									<p className="text-xs font-light lg:text-base">{val.name}</p>
									<p className="text-xs font-light lg:text-base">Penerima ({val.total_penerima} Orang)</p>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
