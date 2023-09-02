import { Button, ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useKonstituenStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { objectToQueryString, queryStringToObject } from '@/utils/helpers';
import { SearchOnTable } from '../../Search/SearchTable/SearchTable';
import { FaInfoCircle } from 'react-icons/fa';

export const TableKonstituen = ({ title, displayedColumns, params, isReadonly, isShowButtonSeeAll, selectedType }) => {
	const { isSystem } = useAuthStore();
	const { fetchingKonstituenList, konstituenList, getKonstituenList, deleteKonstituen } = useKonstituenStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
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
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Nama Institusi',
				accessor: 'name',
				hidden: displayedColumns && !displayedColumns.includes('Nama Institusi'),
				minWidth: 175
			},
			{
				Header: 'Kategori Institusi',
				minWidth: 100,
				hidden: displayedColumns && !displayedColumns.includes('Jenis Institusi'),
				Cell: (row) => <div className="capitalize">{row.row.original.konstituen_type}</div>
			},
			{
				Header: 'Alamat',
				minWidth: 275,
				hidden: displayedColumns && !displayedColumns.includes('Alamat'),
				Cell: (row) => <div className="capitalize">{row.row.original.address}</div>
			},
			{
				Header: 'Jumlah Penerima Program',
				minWidth: 170,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Penerima Program'),
				Cell: (row) => <div className="capitalize">{row.row.original.total_penerima_program}</div>
			},
			{
				Header: 'PIC Institusi',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('PIC Institusi'),
				Cell: (row) => <div className="capitalize">{row.row.original.pic}</div>
			},
			{
				Header: 'Kontak PIC Institusi',
				minWidth: 120,
				hidden: displayedColumns && !displayedColumns.includes('PIC Institusi'),
				Cell: (row) => <div className="capitalize">{row.row.original.pic_mobile}</div>
			},
			{
				Header: 'List Penerima',
				minWidth: 100,
				maxWidth: 100,
				hidden: displayedColumns && !displayedColumns.includes('List Penerima'),
				Cell: (row) => {
					params.konstituen_id = row.row.original.id;

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
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/institusi/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/institusi/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteKonstituen(row.row.original.id)} />
								</>
							)}
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const [searchInstitusi, setSearchInstitusi] = useState('');

	const handleSearch = (inputSearch) => {
		const search = `?keyword=${inputSearch}`;
		navigate(location.pathname + search);
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (selectedType) Object.assign(defaultParams, { konstituen_type: selectedType.konstituen_type });
		if (location.search) Object.assign(defaultParams, queryStringToObject(location.search));

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(Math.abs(offsetResult));
			getKonstituenList({ ...defaultParams, ...params });
		}
	}, [params, selectedType, page, perPage, pageCount, location]);

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
					title={title || selectedType?.label || 'Semua Institusi'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					// showButtonUploadSheetKonstituen
					showButtonSeeAll={isShowButtonSeeAll}
					showButtonCreate={true}
					seeAllLink={'/institusi' + objectToQueryString(params)}
					feature={'Institusi'}
					featurePath="/institusi"
				/>
			</div>

			<hr />

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

			<hr />
			<div className="flex items-center gap-3 px-6 py-4">
				<div className="flex items-center gap-2 p-2 text-xs text-gray-500 bg-yellow-400 rounded-sm">
					<span className="w-5">
						<FaInfoCircle size={18} />
					</span>
					<div className="italic">
						Klik tombol <span className="font-bold">List Penerima</span> pada tabel untuk download sertifikat penerima
						perinstitusi
					</div>
				</div>
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
