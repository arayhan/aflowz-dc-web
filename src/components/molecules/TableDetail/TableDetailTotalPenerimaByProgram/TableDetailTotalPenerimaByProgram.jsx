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
				maxWidth: 100,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.total_penerima_program || data?.total_penerima || '-'}</div>;
				}
			},
			{
				Header: 'Action',
				Cell: (row) => {
					const data = row.row.original;
					const navigate = `/program/${data.program_id}`;
					return <ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={navigate} />;
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataPenerima} />;
};
