import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableActivityPromise = ({
	title,
	activityID,
	activityDetailID,
	displayedColumns,
	params,
	setParams,
	isReadonly,
	isShowFooter,
	isShowButtonSeeAll,
	isShowFilter
}) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { activityPromiseList, fetchingActivityPromiseList } = useActivityStore();
	const { getActivityPromiseList, deleteActivityPromise } = useActivityStore();

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
						<input type="checkbox" checked={isRealized} onChange={() => handleChangeRealization(row.row.original)} />
					);
				}
			},
			{
				Header: 'Janji',
				accessor: 'description',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Janji')
			},
			{
				Header: 'PIC Internal',
				width: 200,
				maxWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('PIC Internal'),
				Cell: (row) => {
					return row.row.original.pic_staff_id?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/staff/${row.row.original.pic_staff_id?.id}`}
							text={row.row.original.pic_staff_id?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem || isReadonly,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction
								action={ACTION_TYPES.UPDATE}
								linkTo={`/activity/${activityID}/detail/${activityDetailID}/promise/update/${row.row.original.id}`}
							/>
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteActivityPromise(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleChangeRealization = (rowData) => {
		console.log({ rowData });
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
			getActivityPromiseList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (activityPromiseList) {
			setData(activityPromiseList.items);
			setPageCount(Math.ceil(activityPromiseList.total / perPage));
		}
	}, [activityPromiseList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<TableHeader
					feature="Janji"
					featurePath={`/activity/${activityID}/detail/${activityDetailID}/promise`}
					title={title || 'List Janji'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonSeeAll={isShowButtonSeeAll}
				/>
			</div>
			{isShowFilter && (
				<>
					<hr />
					<div className="px-6 py-4">
						<div className="w-full flex justify-end gap-4">
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
				<Table columns={columns} data={data} loading={fetchingActivityPromiseList || activityPromiseList === null} />
			</div>
			{isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableActivityPromise.defaultProps = {
	params: {},
	isShowFilter: true,
	isShowFooter: true
};
