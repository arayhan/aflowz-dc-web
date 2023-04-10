import { Button, Table } from '@/components/atoms';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDetailProgramPenerima = ({ programData }) => {
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
				Header: 'Program',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/program/${data.id}`}
							text={data.name}
						/>
					);
				}
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				minWidth: 150
			},
			{
				Header: 'Status',
				minWidth: 150,
				Cell: (row) => {
					return <div className="text-xs font-semibold text-red-500">REJECTED</div>;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={programData} onClickRow={(data) => navigate(`/program/${data.id}`)} />;
};

TableDetailProgramPenerima.defaultProps = {
	programData: []
};
