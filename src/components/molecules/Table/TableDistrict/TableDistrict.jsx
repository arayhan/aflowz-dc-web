import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useDistrictStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableDistrict = ({
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
	const { districtList, fetchingDistrictList, getDistrictList, deleteDistrict } = useDistrictStore();

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
				Header: 'Nama Kecamatan',
				accessor: 'name',
				width: '100%',
				minWidth: 300,
				hidden: displayedColumns && !displayedColumns.includes('Nama Kecamatan')
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
							Pilih Kecamatan
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
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/district/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/district/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteDistrict(row.row.original.id)} />
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
		else navigate(`/district/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/district' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, is_follower: false };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getDistrictList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (districtList) {
			setData(districtList.items);
			setPageCount(Math.ceil(districtList.total / perPage));
		}
	}, [districtList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Kecamatan"
					featurePath="/district"
					title={title || 'List Kecamatan'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/district' + objectToQueryString(params)}
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
								placeholder="Cari nama kecamatan"
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
					loading={fetchingDistrictList || districtList === null}
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

TableDistrict.defaultProps = {
	params: {},
	isShowFooter: true,
	isShowFilter: true
};
