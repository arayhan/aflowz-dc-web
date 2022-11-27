import { ButtonAction, Table } from '@/components/atoms';
import { useAuthStore, useKonstituenStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { SERVICE_KONSTITUEN } from '@/services';
import { TableHeader } from '@/components/atoms/Table/TableHeader';
import { ACTION_TYPES } from '@/utils/constants';

export const TableKonstituen = ({ selectedType }) => {
	const { isAdmin } = useAuthStore();
	const { fetchingKonstituenList, konstituenList, getKonstituenList } = useKonstituenStore();

	const [data, setData] = useState([]);
	const [konstituen, setKonstituen] = useState(null);

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
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Konstitusi',
				minWidth: 125,
				Cell: (row) => <div className="transform: capitalize">{row.row.original.konstituen_type}</div>
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
							linkTo={`/konstituen/${row.row.original.id}`}
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
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/konstituen/update/${row.row.original.id}`} />
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
		const params = selectedType ? selectedType : null;
		getKonstituenList(params);
	}, [selectedType, konstituen]);

	useEffect(() => {
		if (konstituenList) setData(konstituenList.items);
	});

	const handleDelete = async (konstituenID) => {
		const { success, payload } = await SERVICE_KONSTITUEN.deleteKonstituen(konstituenID);

		if (success) {
			toast.success('Berhasil Menghapus Konstituen', {
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
			const { success, payload } = await SERVICE_KONSTITUEN.getKonstituenList(defaultParams);

			if (success) {
				setKonstituen(null);
				getKonstituenList();
				setData(payload.items);
			}
		}
	};

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={selectedType?.konstituen_type || 'Semua Institusi'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingKonstituenList || konstituenList === null} />
			</div>
		</div>
	);
};
