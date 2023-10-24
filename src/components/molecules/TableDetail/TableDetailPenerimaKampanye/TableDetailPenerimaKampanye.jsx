import { Table } from '@/components/atoms';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailPenerimaKampanye = ({ dataPenerima }) => {
	const navigate = useNavigate();

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
				Header: 'Nama Penerima',
				minWidth: 100,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.name}</div>
			}
		],
		[dataPenerima]
	);

	return <Table columns={columns} data={dataPenerima} onClickRow={(data) => navigate(`/penerima/${data.id}`)} />;
};
