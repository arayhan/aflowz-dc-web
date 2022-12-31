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
		<div className="bg-gray-100 py-5">
			<div className="container">
				<div className="overflow-y-auto container flex-col border py-5 rounded-lg bg-white shadow-lg">
					<p className="text-xl lg:text-3xl font-extralight text-center pb-5">Daftar Penerima di Provinsi Bengkulu</p>
					<div className="h-44 sm:h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-5">
						{data.map((val) => {
							return (
								<Link
									to={`/city/${val.id}`}
									key={val.id}
									className="flex justify-between mx-2 my-2 border shadow-lg py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100"
								>
									<p className="text-xs lg:text-base font-light">{val.name}</p>
									<p className="text-xs lg:text-base font-light">Penerima ({val.total_penerima} Orang)</p>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
