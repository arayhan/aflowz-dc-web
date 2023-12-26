import { Button, ButtonAction, Table, TableFooter } from '@/components/atoms';
import { ACTION_TYPES } from '@/utils/constants';
import { objectToQueryString } from '@/utils/helpers';
import { useEffect, useMemo, useState } from 'react';

export const TableDetailTotalPenerimaByKonstituen = ({ dataPenerima, programID }) => {
	const [paginatedData, setPaginatedData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);

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
		[page, perPage]
	);

	useEffect(() => {
		if (dataPenerima) {
			const paginated = dataPenerima.slice((page - 1) * perPage, page * perPage);
			setPaginatedData(paginated);
			setPageCount(Math.ceil(dataPenerima.length / perPage));
		}
	}, [dataPenerima, page, perPage]);

	return (
		<div className="w-full">
			<Table columns={columns} data={paginatedData} />
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
