import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';

export const TableStaff = () => {
	const { isSystem, isAdmin } = useAuthStore();
	const { fetchingStaffList, staffList, getStaffList, deleteStaff } = usePartnerStore();

	const [data, setData] = useState([]);
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
				Header: 'NIK',
				accessor: 'nik_number',
				minWidth: 100
			},
			{
				Header: 'Nama Tim Internal',
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Role',
				minWidth: 100,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.staff_title.name}</div>
			},
			{
				Header: 'Kota / Kabupaten',
				minWidth: 150,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.city.name}</div>
			},
			{
				Header: 'Detail',
				minWidth: 100,
				maxWidth: 100,
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/staff/${row.row.original.id}`}
						/>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				Cell: (row) => {
					return (
						isSystem && (
							<div className="grid grid-cols-2 gap-2">
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/staff/update/${row.row.original.id}`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteStaff(row.row.original.id)} />
							</div>
						)
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			getStaffList(params);
		}
	}, [page, perPage, pageCount]);

	useEffect(() => {
		if (staffList) {
			setData(staffList.items);
			setPageCount(Math.ceil(staffList.total / perPage));
		}
	}, [staffList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title="Daftar Tim Internal"
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
					showButtonCreate={true}
					feature={'Tim Internal'}
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingStaffList || staffList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
