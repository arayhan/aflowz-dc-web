import { Table } from '@/components/atoms';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const TableDetailPenerimaProgram = ({ dataPenerimaPerArea, isPerVillage, isPerCity }) => {
	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: `${isPerCity ? 'Kota' : isPerVillage ? 'Desa / Kelurahan' : ''}`,
				accessor: isPerCity ? 'city_name' : isPerVillage ? 'village_name' : '',
				minWidth: 150
			},
			{
				Header: 'Total Penerima',
				accessor: 'total_penerima'
			},
			{
				Header: 'Action',
				Cell: (row) => {
					const data = row.row.original;
					const accessor = isPerCity ? Number(data['city_id']) : isPerVillage ? Number(data['village_id']) : 0;
					const navigate = isPerCity ? `/city/${accessor}` : isPerVillage ? `/village/${accessor}` : '';
					return (
						<Link
							to={navigate}
							className="px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded-sm text-xs transition-all"
						>
							Detail
						</Link>
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataPenerimaPerArea} />;
};
