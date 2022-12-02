import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useCityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableCity = ({ enableClickRow }) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { cityList, fetchingCityList } = useCityStore();
	const { getCityList, deleteCity } = useCityStore();

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
				Cell: (row) => {
					const number = offset ? offset / perPage + Number(row.row.id) + 1 : Number(row.row.id) + 1;
					return <div className="text-gray-400">{number}</div>;
				}
			},
			{
				Header: 'Nama Kota',
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
							linkTo={`/city/${row.row.original.id}`}
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
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/city/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteCity(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const offsetResult = (page - 1) * perPage;
	const params = { limit: perPage, offset: offsetResult };

	const handleClickRow = (rowData) => navigate(`/city/${rowData.id}`);

	useEffect(() => {
		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getCityList(params);
		}
	}, [page, perPage, pageCount]);

	useEffect(() => {
		if (cityList) {
			setData(cityList.items);
			setPageCount(Math.ceil(cityList.total / perPage));
		}
	}, [cityList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<TableHeader
					feature="Kota"
					title={'List Kota'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					onClickRow={enableClickRow && handleClickRow}
					loading={fetchingCityList || cityList === null}
				/>
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
