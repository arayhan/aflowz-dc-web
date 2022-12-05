import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useVillageStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableVillage = ({ enableClickRow }) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { villageList, fetchingVillageList } = useVillageStore();
	const { getVillageList, deleteVillage } = useVillageStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Nama Desa',
				accessor: 'name',
				width: '100%',
				minWidth: 300
			},
			{
				Header: 'Detail',
				minWidth: 180,
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/village/${row.row.original.id}`}
						/>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/village/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteVillage(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const offsetResult = (page - 1) * perPage;
	const params = { limit: perPage, offset: offsetResult };

	const handleClickRow = (rowData) => navigate(`/village/${rowData.id}`);

	useEffect(() => {
		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getVillageList(params);
		}
	}, [page, perPage, pageCount]);

	useEffect(() => {
		if (villageList) {
			setData(villageList.items);
			setPageCount(Math.ceil(villageList.total / perPage));
		}
	}, [villageList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<TableHeader
					feature="Desa"
					title={'List Desa'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					onClickRow={enableClickRow && handleClickRow}
					loading={fetchingVillageList || villageList === null}
				/>
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
