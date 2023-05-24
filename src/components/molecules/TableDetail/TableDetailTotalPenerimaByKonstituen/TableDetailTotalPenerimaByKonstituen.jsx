import { Button, ButtonAction, Table } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { objectToQueryString } from '@/utils/helpers';
import { useMemo } from 'react';

export const TableDetailTotalPenerimaByKonstituen = ({ dataPenerima, programID }) => {
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
				Header: 'Nama Institusi',
				accessor: 'konstituen_name',
				minWidth: 200
			},
			{
				Header: 'Jenis Institusi',
				minWidth: 170,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.konstituen_type}</div>
			},
			{
				Header: 'Alamat Institusi',
				minWidth: 300,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.konstituen_address}</div>
			},
			{
				Header: 'Total Penerima',
				minWidth: 170,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.total_penerima || '-'}</div>;
				}
			},
			{
				Header: 'List Penerima',
				minWidth: 100,
				maxWidth: 100,
				Cell: (row) => {
					const params = {
						konstituen_id: row.row.original.konstituen_id,
						konstituen_type: row.row.original.konstituen_type,
						program_id: programID
					};

					return (
						<Button
							className="min-w-[100px] w-full bg-purple-500 hover:bg-purple-400 text-white px-3 py-2 rounded-sm text-xs"
							linkTo={`/penerima` + objectToQueryString(params)}
						>
							List Penerima
						</Button>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/institusi/${row.row.original.konstituen_id}`} />
						</div>
					);
				}
			}
		],
		[]
	);

	return <Table columns={columns} data={dataPenerima} />;
};
