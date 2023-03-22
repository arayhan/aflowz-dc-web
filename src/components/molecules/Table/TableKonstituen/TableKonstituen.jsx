import { Button, ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useKonstituenStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { queryStringToObject } from '@/utils/helpers';
import { SearchOnTable } from '../../Search/SearchTable/SearchTable';

export const TableKonstituen = ({ selectedType }) => {
	const { isSystem } = useAuthStore();
	const { fetchingKonstituenList, konstituenList, getKonstituenList, deleteKonstituen } = useKonstituenStore();
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [data, setData] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();

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
				Header: 'Jenis Institusi',
				minWidth: 125,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.konstituen_type}</div>
			},
			{
				Header: 'Kota / Kabupaten',
				minWidth: 150,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.city.name}</div>
			},
			{
				Header: 'List Penerima',
				minWidth: 100,
				maxWidth: 100,
				Cell: (row) => {
					return (
						<Button
							className="min-w-[100px] w-full bg-purple-500 hover:bg-purple-400 text-white px-3 py-2 rounded-sm text-xs"
							linkTo={`/institusi/penerima/${row.row.original.id}`}
						>
							List Penerima
						</Button>
					);
				}
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
							linkTo={`/institusi/${row.row.original.id}`}
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
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/institusi/update/${row.row.original.id}`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteKonstituen(row.row.original.id)} />
							</div>
						)
					);
				}
			}
		],
		[]
	);

	const [searchInstitusi, setSearchInstitusi] = useState('');

	const handleSearch = (inputSearch) => {
		const search = `?keyword=${inputSearch}`;
		navigate(location.pathname + search);
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const params = { limit: perPage, offset: offsetResult };

		if (selectedType) Object.assign(params, { konstituen_type: selectedType.konstituen_type });
		if (location.search) Object.assign(params, queryStringToObject(location.search));

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			getKonstituenList(params);
		}
	}, [selectedType, page, perPage, pageCount, location]);

	useEffect(() => {
		if (konstituenList) {
			setData(konstituenList.items);
			setPageCount(Math.ceil(konstituenList.total / perPage));
		}
	}, [konstituenList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={selectedType?.label || 'Semua Institusi'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
					// showButtonUploadSheetKonstituen
					showButtonCreate={true}
					feature={'Institusi'}
					featurePath="/institusi"
				/>
			</div>
			<div className="container flex items-center justify-start my-2">
				<SearchOnTable
					onChange={(e) => setSearchInstitusi(e.target.value)}
					placeholder={
						queryStringToObject(location.search).keyword !== '' && location.search !== ''
							? queryStringToObject(location.search).keyword
							: 'Cari Institusi'
					}
					value={searchInstitusi}
					search={() => handleSearch(searchInstitusi)}
					clear={() => {
						setSearchInstitusi('');
						navigate(location.pathname);
					}}
				/>
			</div>
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingKonstituenList || konstituenList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
