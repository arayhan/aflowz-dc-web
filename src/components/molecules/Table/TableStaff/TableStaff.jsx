import { ButtonAction, Table } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { SERVICE_PARTNER } from '@/services';
import { TableHeader } from '@/components/atoms/Table/TableHeader';
import { ACTION_TYPES } from '@/utils/constants';

export const TableStaff = () => {
	const { isAdmin } = useAuthStore();
	const { fetchingStaffList, staffList, getStaffList } = usePartnerStore();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);

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
				Header: 'Nama Staff',
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
						isAdmin && (
							<div className="grid grid-cols-2 gap-2">
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/staff/update/${row.row.original.id}`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => handleDelete(row.row.original.id)} />
							</div>
						)
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const params = page === 1 ? { limit: 10, offset: 0 } : { limit: 10, offset: (page - 1) * 10 };
		getStaffList(params);
	}, [page]);

	useEffect(() => {
		if (staffList) setData(staffList.items);
	});

	const handleDelete = async (staffID) => {
		const { success, payload } = await SERVICE_PARTNER.deleteStaff(staffID);

		if (success) {
			toast.success('Berhasil Menghapus Staff', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			});

			const defaultParams = { limit: 10, offset: 0 };
			const { success, payload } = await SERVICE_PARTNER.getStaffList(defaultParams);

			if (success) {
				getStaffList({ limit: 10, offset: 0 });
				setData(payload.items);
			}
		}
	};

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title="Daftar Staff"
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
					showButtonCreate={true}
					feature={'New Staff'}
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingStaffList || staffList === null} />
			</div>
		</div>
	);
};
