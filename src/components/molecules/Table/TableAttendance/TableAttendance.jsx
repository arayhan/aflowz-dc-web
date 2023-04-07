import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useAttendanceStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';

export const TableAttendance = () => {
	const { isSystem } = useAuthStore();
	const { fetchingAttendanceList, attendanceList, getAttendanceList, deleteAttendance } = useAttendanceStore();
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [data, setData] = useState([]);

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
				Header: 'Tanggal',
				minWidth: 175,
				Cell: (row) => (
					<div className="capitalize transform:">{new Date(row.row.original.date).toLocaleDateString('es-CL')}</div>
				)
			},
			{
				Header: 'Jumlah Hadir',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.total_attendance}</div>
			},
			{
				Header: 'Jumlah Tidak Hadir',
				minWidth: 150,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.total_abscene}</div>
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/absensi/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/absensi/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteAttendance(row.row.original.id)} />
								</>
							)}
						</div>
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (page > pageCount) setPage(pageCount);
		else {
			getAttendanceList(params);
		}
	}, [page, perPage, pageCount]);

	useEffect(() => {
		if (attendanceList) {
			setData(attendanceList.items);
			setPageCount(Math.ceil(attendanceList.total / perPage));
		}
	}, [attendanceList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={'Daftar Absensi'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
					showButtonCreate={true}
					feature={'Absensi'}
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingAttendanceList || attendanceList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
