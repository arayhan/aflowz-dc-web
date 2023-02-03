import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useActivityStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import moment from 'moment/moment';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableActivity = ({
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
	const { activityDetailList, fetchingActivityDetailList } = useActivityStore();
	const { getActivityDetailList, deleteActivityDetail } = useActivityStore();

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
				Header: 'Tanggal Kegiatan',
				width: '100%',
				hidden: displayedColumns && !displayedColumns.includes('Tanggal Kegiatan'),
				Cell: (row) => {
					return <div className="text-sm">{moment(row.row.original.activity_date).format('DD MMMM yyyy')}</div>;
				}
			},
			{
				Header: 'Nama Kegiatan',
				accessor: 'description',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Nama Kegiatan')
			},
			{
				Header: 'Tempat Kegiatan',
				width: '100%',
				minWidth: 225,
				hidden: displayedColumns && !displayedColumns.includes('Tempat Kegiatan'),
				Cell: (row) => {
					return row.row.original.activity?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/activity/${row.row.original.activity?.id}`}
							text={row.row.original.activity?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Status',
				width: '100%',
				minWidth: 175,
				hidden: displayedColumns && !displayedColumns.includes('Status'),
				Cell: (row) => {
					return row.row.original.status ? <div className="capitalize">{row.row.original.status}</div> : '-';
				}
			},
			{
				Header: 'Pilih',
				minWidth: 180,
				hidden: !onClickRow || (displayedColumns && !displayedColumns.includes('Pilih')),
				Cell: (row) => {
					return (
						<Button
							className="min-w-[100px] w-full py-2 text-xs rounded-sm"
							variant="info"
							onClick={() => handleClickRow(row.row.original)}
						>
							Pilih Kegiatan
						</Button>
					);
				}
			},
			{
				Header: 'Detail',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('Detail'),
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/activity/${row.row.original.activity.id}/detail/${row.row.original.id}`}
						/>
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
								linkTo={`/activity/${row.row.original.activity.id}/detail/update/${row.row.original.id}`}
							/>
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteActivityDetail(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => {
		if (onClickRow) onClickRow(rowData);
		else navigate(`/activity/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/activity' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, order_by: 'activity_date', order_by_type: 'desc' };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getActivityDetailList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (activityDetailList) {
			setData(activityDetailList.items);
			setPageCount(Math.ceil(activityDetailList.total / perPage));
		}
	}, [activityDetailList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="flex items-center justify-between p-6">
				<TableHeader
					feature="Kegiatan"
					featurePath="/activity"
					title={title || 'List Kegiatan'}
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
								placeholder="Cari nama kegiatan"
								onChange={(event) => {
									handleSetFilter('keyword', event.target.value ? { keyword: event.target.value } : undefined);
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
					loading={fetchingActivityDetailList || activityDetailList === null}
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

TableActivity.defaultProps = {
	params: {},
	onClickRow: null,
	isShowFilter: true,
	isShowFooter: true
};
