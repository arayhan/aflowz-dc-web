import { ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useVisitasiStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import moment from 'moment/moment';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableVisitasi = ({
	title,
	displayedColumns,
	params,
	setParams,
	isReadonly,
	isShowFooter,
	isShowButtonSeeAll,
	onClickRow,
	isShowFilter,
	enableClickRow
}) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { visitasiList, fetchingVisitasiList } = useVisitasiStore();
	const { getVisitasiList, deleteVisitasi } = useVisitasiStore();

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
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Tanggal Visitasi',
				width: '100%',
				hidden: displayedColumns && !displayedColumns.includes('Tanggal Visitasi'),
				Cell: (row) => {
					return <div className="text-sm">{moment(row.row.original.date).format('DD MMMM yyyy')}</div>;
				}
			},
			{
				Header: 'Nama',
				accessor: 'name',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Nama')
			},
			{
				Header: 'Phone',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Phone'),
				Cell: (row) => {
					const data = row.row.original;
					return data.phone;
				}
			},
			{
				Header: 'Alamat',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Alamat'),
				Cell: (row) => {
					const data = row.row.original;
					return data.address;
				}
			},
			{
				Header: 'Note',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Note'),
				Cell: (row) => {
					const data = row.row.original;
					return data.note;
				}
			},
			{
				Header: 'Origin',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Origin'),
				Cell: (row) => {
					const data = row.row.original;
					return data.origin;
				}
			},
			{
				Header: 'Institusi',
				minWidth: 175,
				hidden: displayedColumns && !displayedColumns.includes('Institusi'),
				Cell: (row) => {
					const institusi = row.row.original.konstituen;
					return (
						<div className="flex flex-wrap gap-1">
							{!institusi?.id && '-'}
							{institusi?.id && (
								<ButtonAction
									key={institusi.id}
									className="bg-purple-500 hover:bg-purple-400"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/institusi/${institusi.id}`}
									text={institusi.name}
								/>
							)}
						</div>
					);
				}
			},
			{
				Header: 'Program',
				minWidth: 175,
				hidden: displayedColumns && !displayedColumns.includes('Program'),
				Cell: (row) => {
					const program = row.row.original.program;
					return (
						<div className="flex flex-wrap gap-1">
							{!program?.id && '-'}
							{program?.id && (
								<ButtonAction
									key={program.id}
									className="bg-purple-500 hover:bg-purple-400"
									action={ACTION_TYPES.SEE_DETAIL}
									linkTo={`/program/${program.id}`}
									text={program.name}
								/>
							)}
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/visitasi/${data.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/visitasi/update/${data.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteVisitasi(data.id)} />
								</>
							)}
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => {
		if (onClickRow) onClickRow(rowData);
		else navigate(`/visitasi/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/visitasi' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, order_by_type: 'desc' };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getVisitasiList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (visitasiList) {
			setData(visitasiList.items);
			setPageCount(Math.ceil(visitasiList.total / perPage));
		}
	}, [visitasiList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="flex items-center justify-between p-6">
				<TableHeader
					feature="Visitasi"
					featurePath="/visitasi"
					title={title || 'List Visitasi'}
					isReadonly={!isSystem || isReadonly}
					showButtonSeeAll={isShowButtonSeeAll}
				/>
			</div>
			{isShowFilter && (
				<>
					<hr />

					<div className="px-6 py-4">
						<div className="flex justify-end w-full gap-4">
							<InputText
								value={params?.keyword ? decodeURIComponent(params?.keyword) : ''}
								showLabel={false}
								placeholder="Cari nama visitasi"
								onChange={(event) => {
									handleSetFilter(
										'keyword',
										event.target.value ? { keyword: encodeURIComponent(event.target.value) } : undefined
									);
								}}
							/>
						</div>
					</div>
				</>
			)}
			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					onClickRow={enableClickRow && handleClickRow}
					loading={fetchingVisitasiList || visitasiList === null}
				/>
			</div>
			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableVisitasi.defaultProps = {
	params: {},
	onClickRow: null,
	isShowFilter: true,
	isShowFooter: true
};
