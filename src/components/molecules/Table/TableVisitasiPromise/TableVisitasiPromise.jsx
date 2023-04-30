import { ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';

export const TableVisitasiPromise = ({
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
	const { isSystem } = useAuthStore();
	const { activityPromiseList, fetchingActivityPromiseList } = useActivityStore();
	const { getActivityDetailItem, getActivityPromiseList, updateActivityPromise, deleteActivityPromise } =
		useActivityStore();

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
			}
			// {
			// 	Header: 'Terealisasi',
			// 	width: 200,
			// 	minWidth: 200,
			// 	hidden: displayedColumns && !displayedColumns.includes('Terealisasi'),
			// 	Cell: (row) => {
			// 		const isRealized = row.row.original.realization;
			// 		return (
			// 			<input
			// 				className="p-3 rounded-md hover:cursor-pointer"
			// 				type="checkbox"
			// 				checked={isRealized}
			// 				onChange={() => handleChangeRealization(row.row.original)}
			// 			/>
			// 		);
			// 	}
			// },
			// {
			// 	Header: 'Janji',
			// 	accessor: 'name',
			// 	width: '100%',
			// 	minWidth: 200,
			// 	hidden: displayedColumns && !displayedColumns.includes('Janji')
			// },
			// {
			// 	Header: 'Actions',
			// 	minWidth: 220,
			// 	Cell: (row) => {
			// 		return (
			// 			<div className="grid grid-cols-2 gap-2">
			// 				<ButtonAction
			// 					action={ACTION_TYPES.DELETE}
			// 					onClick={() =>
			// 						deleteActivityPromise(row.row.original.id, () => {
			// 							getActivityDetailItem(activityID);
			// 							getActivityPromiseList({ limit: perPage, offset: offset, ...params }, false);
			// 						})
			// 					}
			// 				/>
			// 			</div>
			// 		);
			// 	}
			// }
		],
		[offset, perPage, page, isSystem]
	);

	const handleChangeRealization = (rowData) => {
		updateActivityPromise(rowData.id, { ...rowData, realization: !rowData.realization }, ({ success }) => {
			if (success) getActivityPromiseList({ limit: perPage, offset: offset, ...params }, false);
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
			<div className="flex items-center justify-between p-6">
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

TableVisitasiPromise.defaultProps = {
	params: {},
	isShowFilter: true,
	isShowFooter: true
};
