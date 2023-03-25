import { ButtonAction, InputCheckbox, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES, INSTITUSI_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectInstitusi } from '../../InputSelect/InputSelectInstitusi/InputSelectInstitusi';
import { InputSelectProgram } from '../../InputSelect/InputSelectProgram/InputSelectProgram';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';

export const TablePenerima = ({
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
	enableClickRow,
	konstituenType
}) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { penerimaList, fetchingPenerimaList, getPenerimaList, deletePenerima, downloadCsvPenerima } =
		usePartnerStore();
	const location = useLocation();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableSortBy: true,
				disableFilters: true,
				maxWidth: 20,
				hidden: displayedColumns && !displayedColumns.includes('#'),
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'NIK',
				accessor: 'nik_number',
				minWidth: 70,
				hidden: displayedColumns && !displayedColumns.includes('NIK')
			},
			{
				Header: 'Nama Penerima',
				accessor: 'name',
				minWidth: 175,
				hidden: displayedColumns && !displayedColumns.includes('Nama Penerima')
			},
			{
				Header: 'Institusi',
				minWidth: 200,
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
				Header: 'Alamat',
				accessor: 'address',
				minWidth: 175,
				hidden: displayedColumns ? !displayedColumns.includes('Alamat') : true
			},
			{
				Header: 'Program',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('Program'),
				Cell: (row) => {
					const programs = row.row.original.programs;
					return (
						<div className="flex flex-wrap gap-1">
							{programs.length === 0 && '-'}
							{programs.length > 0 &&
								programs.map((program) => (
									<ButtonAction
										key={program.id}
										className="bg-purple-500 hover:bg-purple-400"
										action={ACTION_TYPES.SEE_DETAIL}
										linkTo={`/program/${program.id}`}
										text={program.name}
									/>
								))}
						</div>
					);
				}
			},
			{
				Header: 'Detail',
				minWidth: 150,
				maxWidth: 150,
				hidden: displayedColumns && !displayedColumns?.includes('Detail'),
				Cell: (row) => {
					return <ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/penerima/${row.row.original.id}`} />;
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				hidden: isReadonly || !isSystem,
				Cell: (row) => {
					return (
						<div className="grid grid-cols-2 gap-2">
							<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/penerima/update/${row.row.original.id}`} />
							<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deletePenerima(row.row.original.id)} />
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => {
		if (onClickRow) onClickRow(rowData);
		else navigate(`/penerima/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/penerima' + updatedParams, { replace: true });
	};

	const handleDownloadData = () => {
		const header = ['No', 'NIK', 'Nama Penerima', 'Institusi', 'Alamat'];
		downloadCsvPenerima(params);
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(Math.abs(offsetResult));
			getPenerimaList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (penerimaList) {
			setData(penerimaList.items);
			setPageCount(Math.ceil(penerimaList.total / perPage));
		}
	}, [penerimaList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Penerima"
					featurePath="/penerima"
					title={title || 'Penerima Program'}
					isReadonly={!isSystem || isReadonly}
					onClickDownloadData={handleDownloadData}
					showButtonDownloadData
					showButtonUploadSheetPenerima
					showButtonCreate={false}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/penerima' + objectToQueryString(params)}
					showCounter={true}
					description={penerimaList?.total > 0 && `Total: ${penerimaList?.total} Orang`}
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
									placeholder="Cari penerima"
									onChange={(event) => {
										handleSetFilter('keyword', event.target.value ? { keyword: event.target.value } : undefined);
									}}
								/>
							)}
							{(!displayedFilters || displayedFilters.includes('program_id')) && (
								<InputSelectProgram
									containerClassName="w-full lg:w-60"
									value={params.program_id ? Number(params.program_id) : undefined}
									showLabel={false}
									showPeriodeOnLabel
									onChange={(option) => handleSetFilter('program_id', option ? { program_id: option.value } : null)}
								/>
							)}

							{(!displayedFilters || displayedFilters.includes('konstituen_id')) && (
								<InputSelectInstitusi
									containerClassName="w-full lg:w-60"
									value={params.konstituen_id ? Number(params.konstituen_id) : undefined}
									showLabel={false}
									onChange={(option) =>
										handleSetFilter('konstituen_id', option ? { konstituen_id: option.value } : null)
									}
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
							{(!displayedFilters || displayedFilters.includes('village_id')) && (
								<InputSelectVillage
									containerClassName="w-full lg:w-60"
									value={params.village_id ? Number(params.village_id) : undefined}
									showLabel={false}
									onChange={(option) => handleSetFilter('village_id', option ? { village_id: option.value } : null)}
								/>
							)}
							{konstituenType && konstituenType === INSTITUSI_TYPES.SEKOLAH && displayedFilters.includes('is_pip') && (
								<InputCheckbox
									label="PIP Only"
									name="pip_only"
									value={params.program !== undefined}
									onChange={(event) => {
										const checked = event.target.value === 'true';
										handleSetFilter('program', checked ? null : { program: 'PIP' });
									}}
								/>
							)}

							{konstituenType && konstituenType === INSTITUSI_TYPES.KAMPUS && displayedFilters.includes('is_kip') && (
								<InputCheckbox
									label="KIP Only"
									name="kip_only"
									value={params.program !== undefined}
									onChange={(event) => {
										const checked = event.target.value === 'true';
										handleSetFilter('program', checked ? null : { program: 'KIP' });
									}}
								/>
							)}
						</div>
					</div>
				</>
			)}

			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					loading={fetchingPenerimaList || penerimaList === null}
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

TablePenerima.defaultProps = {
	params: {},
	isShowFooter: true,
	isShowFilter: true
};
