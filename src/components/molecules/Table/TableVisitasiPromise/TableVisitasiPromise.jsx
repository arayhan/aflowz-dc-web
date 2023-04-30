import { ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useVisitasiStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';

export const TableVisitasiPromise = ({
	title,
	visitasiID,
	visitasiDetailID,
	displayedColumns,
	params,
	setParams,
	isReadonly,
	isShowFooter,
	isShowButtonSeeAll,
	isShowFilter
}) => {
	const { isSystem } = useAuthStore();
	const { visitasiPromiseList, fetchingVisitasiPromiseList } = useVisitasiStore();
	const { getVisitasiPromiseList, updateVisitasiPromise, deleteVisitasiPromise } = useVisitasiStore();

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
				Header: 'Terealisasi',
				width: 200,
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Terealisasi'),
				Cell: (row) => {
					const isRealized = row.row.original.realization;
					return (
						<input
							className="p-3 rounded-md hover:cursor-pointer"
							type="checkbox"
							checked={isRealized}
							onChange={() => handleChangeRealization(row.row.original)}
						/>
					);
				}
			},
			{
				Header: 'Janji',
				accessor: 'name',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Janji')
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div>
							<ButtonAction
								action={ACTION_TYPES.DELETE}
								onClick={() =>
									deleteVisitasiPromise(row.row.original.id, () => {
										getVisitasiPromiseList({ limit: perPage, offset: offset, ...params }, false);
									})
								}
							/>
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleChangeRealization = (rowData) => {
		updateVisitasiPromise(rowData.id, { ...rowData, realization: !rowData.realization }, ({ success }) => {
			if (success) getVisitasiPromiseList({ limit: perPage, offset: offset, ...params }, false);
		});
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getVisitasiPromiseList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (visitasiPromiseList) {
			setData(visitasiPromiseList.items);
			setPageCount(Math.ceil(visitasiPromiseList.total / perPage));
		}
	}, [visitasiPromiseList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="flex items-center justify-between p-6">
				<TableHeader
					feature="Janji"
					featurePath={`/visitasi/${visitasiID}/promise`}
					title={title || 'List Janji'}
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
								value={params?.keyword || ''}
								showLabel={false}
								placeholder="Cari janji"
								onChange={(event) => {
									handleSetFilter('keyword', event.target.value ? { keyword: event.target.value } : undefined);
								}}
							/>
						</div>
					</div>
				</>
			)}
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingVisitasiPromiseList || visitasiPromiseList === null} />
			</div>
			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableVisitasiPromise.defaultProps = {
	params: {},
	isShowFilter: true,
	isShowFooter: true
};
