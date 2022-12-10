import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useTPSStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableTPS = ({
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
	const { TPSList, fetchingTPSList, getTPSList, deleteTPS } = useTPSStore();

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
				Header: 'Nama TPS',
				accessor: 'name',
				width: '100%',
				minWidth: 300,
				hidden: displayedColumns && !displayedColumns.includes('Nama TPS')
			},
			{
				Header: 'Nama PIC',
				width: '100%',
				minWidth: 300,
				hidden: !displayedColumns || (displayedColumns && !displayedColumns.includes('Nama PIC')),
				Cell: (row) => {
					return row.row.original.pic_staff?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/staff/${row.row.original.pic_staff?.id}`}
							text={row.row.original.pic_staff?.name}
						/>
					) : (
						'-'
					);
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
							Pilih TPS
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
							linkTo={`/tps/${row.row.original.id}`}
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
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/tps/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteTPS(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => {
		if (onClickRow) onClickRow(rowData);
		else navigate(`/tps/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/tps' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, is_follower: false };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getTPSList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (TPSList) {
			setData(TPSList.items);
			setPageCount(Math.ceil(TPSList.total / perPage));
		}
	}, [TPSList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="TPS"
					featurePath="/tps"
					title={title || 'List TPS'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/tps' + objectToQueryString(params)}
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
								placeholder="Cari nama tPS"
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
					loading={fetchingTPSList || TPSList === null}
					onClickRow={enableClickRow && handleClickRow}
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

TableTPS.defaultProps = {
	params: {},
	isShowFooter: true,
	isShowFilter: true
};
