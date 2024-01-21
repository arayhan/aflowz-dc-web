import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectPICCity } from '../../InputSelect/InputSelectCity/InputSelectPICCity';
import { InputSelectDistrict } from '../../InputSelect/InputSelectDistrict/InputSelectDistrict';
import { InputSelectVillageAsync } from '../../InputSelect/InputSelectVillage/InputSelectVillageAsync';
import { InputSelectPICDistrict } from '../../InputSelect/InputSelectDistrict/InputSelectPICDistrict';
import { InputSelectPICVillage } from '../../InputSelect/InputSelectVillage/InputSelectPICVillage';

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
				minWidth: 240,
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
				Header: 'No Kontak',
				minWidth: 150,
				Cell: (row) => <div className="capitalize">{row.row.original.mobile}</div>
			},
			{
				Header: 'PIC Kota',
				minWidth: 200,
				Cell: (row) => {
					const cities_pic = row.row.original.cities_pic;
					return cities_pic.length > 0 ? (
						<div className="grid gap-2">
							{cities_pic.map((city) => (
								<Button
									key={city?.city_id}
									className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
									linkTo={`/dapil/city/${city?.city_id}`}
									text={city?.city_name}
								/>
							))}
						</div>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'PIC Kecamatan',
				minWidth: 200,
				Cell: (row) => {
					const districts_pic = row.row.original.districts_pic;
					return districts_pic.length > 0 ? (
						<div className="grid gap-2">
							{districts_pic.map((district) => (
								<Button
									key={district?.district_id}
									className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
									linkTo={`/dapil/district/${district?.district_id}`}
									text={district?.district_name}
								/>
							))}
						</div>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'PIC Desa/Kelurahan',
				minWidth: 200,
				Cell: (row) => {
					const villages_pic = row.row.original.villages_pic;
					return villages_pic.length > 0 ? (
						<div className="grid gap-2">
							{villages_pic.map((village) => (
								<Button
									key={village?.village_id}
									className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
									linkTo={`/dapil/village/${village?.village_id}`}
									text={village?.village_name}
								/>
							))}
						</div>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Deskripsi',
				minWidth: 150,
				Cell: (row) => <div className="capitalize">{row.row.original.description || '-'}</div>
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
									value={params?.keyword ? decodeURIComponent(params?.keyword) : ''}
									showLabel={false}
									placeholder="Cari nama staff"
									onChange={(event) => {
										handleSetFilter(
											'keyword',
											event.target.value ? { keyword: encodeURIComponent(event.target.value) } : undefined
										);
									}}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('city_id')) && (
								<InputSelectCity
									containerClassName="w-full lg:w-60"
									value={params.city_id ? Number(params.city_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('city_id', option ? { city_id: option.value } : null)}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('district_id')) && (
								<InputSelectDistrict
									containerClassName="w-full lg:w-60"
									value={params.district_id ? Number(params.district_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('district_id', option ? { district_id: option.value } : null)}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('village_id')) && (
								<InputSelectVillageAsync
									containerClassName="w-full lg:w-60"
									value={params.village_id ? Number(params.village_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('village_id', option ? { village_id: option.value } : null)}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('city_pic_id')) && (
								<InputSelectPICCity
									containerClassName="w-full lg:w-60"
									value={params.city_pic_id ? Number(params.city_pic_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('city_pic_id', option ? { city_pic_id: option.value } : null)}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('district_pic_id')) && (
								<InputSelectPICDistrict
									containerClassName="w-full lg:w-60"
									value={params.district_pic_id ? Number(params.district_pic_id) : undefined}
									showLabel={false}
									onChange={(option) =>
										handleSetFilter('district_pic_id', option ? { district_pic_id: option.value } : null)
									}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('village_pic_id')) && (
								<InputSelectPICVillage
									containerClassName="w-full lg:w-60"
									value={params.village_pic_id ? Number(params.village_pic_id) : undefined}
									showLabel={false}
									onChange={(option) =>
										handleSetFilter('village_pic_id', option ? { village_pic_id: option.value } : null)
									}
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
