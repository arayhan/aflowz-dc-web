import { Button, ButtonAction, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useTPSStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectDistrict } from '../../InputSelect/InputSelectDistrict/InputSelectDistrict';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';

export const TableTPS = ({
	title,
	displayedColumns,
	displayedFilters,
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

	console.log({ TPSList });

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
				minWidth: 250,
				hidden: displayedColumns && !displayedColumns.includes('Nama TPS')
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 50,
				hidden: displayedColumns && !displayedColumns.includes('Periode')
			},
			{
				Header: 'Suara Dewi Coryati',
				accessor: 'total_dc_voters',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('Suara Dewi Coryati')
			},
			{
				Header: 'Suara Partai',
				width: '100%',
				minWidth: 150,
				hidden: displayedColumns || (displayedColumns && !displayedColumns.includes('Suara Partai')),
				Cell: (row) => {
					const party_votes = row.row.original.party_votes;
					return (
						<div className="grid gap-2">
							{party_votes.length === 0 && '-'}
							{party_votes.length > 0 && (
								<ul className="w-full text-sm list-disc list-outside">
									{party_votes.map((partyVote) => (
										<li key={partyVote.party.id}>
											<span className="font-semibold">{partyVote.party.name}</span>: {partyVote.total_voters}
										</li>
									))}
								</ul>
							)}
						</div>
					);
				}
			},
			{
				Header: 'Saksi',
				width: '100%',
				minWidth: 250,
				hidden: displayedColumns || (displayedColumns && !displayedColumns.includes('Saksi')),
				Cell: (row) => {
					const witnesses = row.row.original.witnesses;
					return (
						<div className="flex flex-wrap gap-1">
							{witnesses.length === 0 && '-'}
							{witnesses.length > 0 &&
								witnesses.map((witness) => (
									<ButtonAction
										key={witness.id}
										className="w-full bg-purple-500 hover:bg-purple-400"
										action={ACTION_TYPES.SEE_DETAIL}
										linkTo={`/witness/${witness.id}`}
										text={witness.name}
									/>
								))}
						</div>
					);
				}
			},
			{
				Header: 'Kota',
				accessor: 'city',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Kota'),
				Cell: (row) => {
					return (
						<ButtonAction
							key={row.row.original.city.id}
							className="w-full bg-purple-500 hover:bg-purple-400"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/dapil/city/${row.row.original.city.id}`}
							text={row.row.original.city.name}
						/>
					);
				}
			},
			{
				Header: 'Kecamatan',
				accessor: 'district',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Kecamatan'),
				Cell: (row) => {
					return (
						<ButtonAction
							key={row.row.original.district.id}
							className="w-full bg-purple-500 hover:bg-purple-400"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/dapil/district/${row.row.original.district.id}`}
							text={row.row.original.district.name}
						/>
					);
				}
			},
			{
				Header: 'Desa/Kelurahan',
				accessor: 'village',
				width: '100%',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Desa/Kelurahan'),
				Cell: (row) => {
					return (
						<ButtonAction
							key={row.row.original.village.id}
							className="w-full bg-purple-500 hover:bg-purple-400"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/dapil/village/${row.row.original.village.id}`}
							text={row.row.original.village.name}
						/>
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
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/tps/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/tps/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteTPS(row.row.original.id)} />
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
		else navigate(`/tps/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/tps' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

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
						<div className="flex justify-end w-full gap-4">
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
								<InputSelectVillage
									containerClassName="w-full lg:w-60"
									value={params.village_id ? Number(params.village_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('village_id', option ? { village_id: option.value } : null)}
								/>
							)}
							<InputText
								value={params?.keyword || ''}
								showLabel={false}
								placeholder="Cari nama TPS"
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
