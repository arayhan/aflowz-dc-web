import { Button, Table } from '@/components/atoms';
import { STATUS_PENERIMA_TYPES } from '@/utils/constants';
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
					const program = row.row.original?.program;
					return program ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/program/${program.id}`}
							text={program.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Periode',
				minWidth: 150,
				Cell: (row) => {
					const program = row.row.original?.program;
					return <div>{program?.periode}</div>;
				}
			},
			{
				Header: 'Status',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					const statusClass =
						data.status === STATUS_PENERIMA_TYPES.CONFIRMED
							? 'text-green-500'
							: STATUS_PENERIMA_TYPES.CANDIDATE
							? 'text-blue-500'
							: 'text-red-500';

					return <div className={`text-xs font-semibold uppercase ${statusClass}`}>{data.status}</div>;
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
