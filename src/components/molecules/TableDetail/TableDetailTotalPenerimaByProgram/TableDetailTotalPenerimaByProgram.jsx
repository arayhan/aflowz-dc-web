import { ButtonAction, Table } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { useMemo } from 'react';

export const TableDetailTotalPenerimaByProgram = ({ dataPenerima }) => {
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
				Header: 'Nama Program',
				accessor: 'program_name',
				minWidth: 150
			},
			{
				Header: 'Periode',
				accessor: 'program_periode',
				minWidth: 150
			},
			{
				Header: 'Total Penerima',
				accessor: 'total_penerima_program',
				maxWidth: 100
			},
			{
				Header: 'Action',
				Cell: (row) => {
					const data = row.row.original;
					const navigate = `/program/${data.program_id}`;
					return <ButtonAction className="min-w-[100px] w-full" action={ACTION_TYPES.SEE_DETAIL} linkTo={navigate} />;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataPenerima} />;
};