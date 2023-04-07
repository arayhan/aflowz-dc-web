import { ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

export const TableStaff = ({ params, setParams, isShowFilter, displayedFilters }) => {
	const navigate = useNavigate();
	const { isSystem, isAdmin } = useAuthStore();
	const { fetchingStaffList, staffList, getStaffList, deleteStaff } = usePartnerStore();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);

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
				Header: 'NIK',
				accessor: 'nik_number',
				minWidth: 100
			},
			{
				Header: 'Nama Tim Internal',
				accessor: 'name',
				minWidth: 175
			},
			{
				Header: 'Role',
				minWidth: 150,
				Cell: (row) => {
					const data = row.row.original;
					return data.staff_titles.length > 0 ? (
						<div className="flex flex-wrap gap-1">
							{data.staff_titles.map((title) => (
								<div key={title.id} className="px-2 py-[2px] text-xs capitalize border border-gray-200 rounded-md">
									{title?.parent ? `${title.parent.name} - ` : ''}
									{title.name}
								</div>
							))}
						</div>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Kota / Kabupaten',
				minWidth: 150,
				Cell: (row) => <div className="capitalize transform:">{row.row.original.city.name}</div>
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/staff/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/staff/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteStaff(row.row.original.id)} />
								</>
							)}
						</div>
					);
				}
			}
		],
		[]
	);

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/staff' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			getStaffList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (staffList) {
			setData(staffList.items);
			setPageCount(Math.ceil(staffList.total / perPage));
		}
	}, [staffList, pageCount]);

	return (
		<div className="w-full bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title="Daftar Tim Internal"
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
					showButtonCreate={true}
					feature={'Tim Internal'}
					featurePath="/staff"
				/>
			</div>
			{isShowFilter && (
				<>
					<hr />

					<div className="px-6 py-3">
						<div className="grid items-center justify-end w-full grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:flex">
							{(!displayedFilters || displayedFilters.includes('keyword')) && (
								<InputText
									value={params?.keyword || ''}
									showLabel={false}
									placeholder="Cari nama staff"
									onChange={(event) => {
										handleSetFilter('keyword', event.target.value ? { keyword: event.target.value } : undefined);
									}}
								/>
							)}
						</div>
					</div>
				</>
			)}
			<div className="overflow-x-auto">
				<Table columns={columns} data={data} loading={fetchingStaffList || staffList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};

TableStaff.defaultProps = {
	isShowFilter: true
};
