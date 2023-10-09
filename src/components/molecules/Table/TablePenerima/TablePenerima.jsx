import { ButtonAction, InputCheckbox, InputText, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES, INSTITUSI_TYPES, STATUS_PENERIMA_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectInstitusi } from '../../InputSelect/InputSelectInstitusi/InputSelectInstitusi';
import { InputSelectProgram } from '../../InputSelect/InputSelectProgram/InputSelectProgram';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';
import { ButtonPrintMultiplePenerimaCertificate } from '../../Button/ButtonPrintCertificate/ButtonPrintMultiplePenerimaCertificate';
import { FaInfoCircle } from 'react-icons/fa';
import { InputSelectDistrict } from '../../InputSelect/InputSelectDistrict/InputSelectDistrict';

export const TablePenerima = ({
	title,
	displayedColumns,
	displayedFilters,
	params,
	setParams,
	isReadonly,
	isShowFooter,
	isShowButtonSeeAll,
	isShowButtonSeeAnonymousData,
	isShowButtonUploadAnonymousData,
	isShowBulkDownloadCertificate,
	onClickRow,
	isShowFilter,
	enableClickRow,
	konstituenType,
	isPIP,
	isKIP,
	isNeedAbort
}) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const {
		penerimaList,
		fetchingPenerimaList,
		calonPenerimaList,
		getPenerimaList,
		deletePenerima,
		downloadCsvPenerima
	} = usePartnerStore();
	const location = useLocation();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const IS_ANONYMOUS_DATA = Boolean(params.is_no_nik_number && params.is_no_nisn_number);

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
				minWidth: 70,
				hidden: displayedColumns && !displayedColumns.includes('NIK') && isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.nik_number || '-'}</div>;
				}
			},
			{
				Header: 'NISN',
				minWidth: 70,
				hidden: displayedColumns && !displayedColumns.includes('NISN') && !isPIP && !isKIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.nisn_number || '-'}</div>;
				}
			},
			{
				Header: isKIP ? 'Nama Usulan' : isPIP ? 'Nama Siswa' : 'Nama',
				accessor: 'name',
				minWidth: 175,
				hidden: displayedColumns && !displayedColumns.includes('Nama Penerima')
			},
			{
				Header: 'Kelas',
				minWidth: 100,
				hidden: (displayedColumns && !displayedColumns.includes('Kelas')) || !isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.class_level || '-'}</div>;
				}
			},
			{
				Header: 'No HP',
				minWidth: 180,
				hidden: (displayedColumns && !displayedColumns.includes('No HP')) || isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.mobile || '-'}</div>;
				}
			},
			{
				Header: isKIP ? 'Nama PT' : isPIP ? 'Nama Sekolah' : 'Institusi',
				minWidth: 175,
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
				minWidth: 100,
				hidden: displayedColumns && !displayedColumns.includes('Alamat'),
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.address || '-'}</div>;
				}
			},
			{
				Header: 'Program Yang Pernah Diterima',
				minWidth: 150,
				Cell: (row) => {
					const programs = row.row.original.programs;
					return (
						<div className="flex flex-wrap gap-1">
							{programs.length === 0 && '-'}
							{programs.length > 0 &&
								programs.map((program) => (
									<ButtonAction
										key={program.id}
										className="w-full bg-purple-500 hover:bg-purple-400"
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
				Header: 'Jurusan',
				minWidth: 100,
				hidden: (displayedColumns && !displayedColumns.includes('Jurusan')) || !isKIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.major || '-'}</div>;
				}
			},
			{
				Header: 'Nama Ibu Kandung',
				minWidth: 180,
				hidden: (displayedColumns && !displayedColumns.includes('Nama Ibu Kandung')) || !isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.added_information?.mother_name || '-'}</div>;
				}
			},
			{
				Header: 'Nomor Rekening',
				minWidth: 180,
				hidden: (displayedColumns && !displayedColumns.includes('Nomor Rekening')) || !isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.account_number || '-'}</div>;
				}
			},
			{
				Header: 'No. Virtual Account',
				minWidth: 200,
				hidden: (displayedColumns && !displayedColumns.includes('No. Virtual Account')) || !isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.virtual_account || '-'}</div>;
				}
			},
			{
				Header: 'No. SK',
				minWidth: 150,
				hidden: (displayedColumns && !displayedColumns.includes('No. SK')) || !isPIP,
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.no_sk || '-'}</div>;
				}
			},
			{
				Header: 'Jumlah Followers',
				minWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Followers'),
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data?.total_followers || '-'}</div>;
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/penerima/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/penerima/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deletePenerima(row.row.original.id)} />
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
		else navigate(`/penerima/${rowData.id}`);
	};

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate('/penerima' + updatedParams, { replace: true });
	};

	const handleDownloadData = (isAnonymous = false) => {
		downloadCsvPenerima(params, isAnonymous);
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = isShowFooter ? { limit: perPage, offset: offsetResult } : {};

		if (params?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE) {
			params = {
				...params,
				candidate_program_id: params.program_id,
				candidate_status: params.candidate_status
			};
			delete params.program_id;
		}

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(Math.abs(offsetResult));
			getPenerimaList({ ...defaultParams, ...params }, () => {}, isNeedAbort);
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		setData(
			params?.candidate_status === STATUS_PENERIMA_TYPES.CONFIRMED ? penerimaList?.items : calonPenerimaList?.items
		);
		if (isShowFooter && penerimaList?.total) {
			if (params?.candidate_status === STATUS_PENERIMA_TYPES.CONFIRMED) {
				setPageCount(Math.ceil(penerimaList.total / perPage));
			} else if (params?.candidate_status === STATUS_PENERIMA_TYPES.CANDIDATE) {
				setPageCount(Math.ceil(calonPenerimaList.total / perPage));
			}
		}
	}, [calonPenerimaList, penerimaList, isShowFooter]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature={IS_ANONYMOUS_DATA ? 'Penerima Anonymous' : 'Penerima'}
					featurePath="/penerima"
					title={title || IS_ANONYMOUS_DATA ? 'Penerima Anonymous' : 'Penerima Program'}
					isReadonly={!isSystem || isReadonly}
					onClickSeeAnonymousData={() =>
						navigate('/penerima' + objectToQueryString({ is_no_nik_number: true, is_no_nisn_number: true }))
					}
					onClickDownloadData={handleDownloadData}
					onClickDownloadAnonymousData={() => handleDownloadData(true)}
					showButtonSeeAnonymousData={isShowButtonSeeAnonymousData && !IS_ANONYMOUS_DATA}
					showButtonUploadAnonymousData={isShowButtonUploadAnonymousData && IS_ANONYMOUS_DATA}
					showButtonDownloadAnonymousData={data?.length > 0 && IS_ANONYMOUS_DATA}
					showButtonDownloadData={data?.length > 0 && !IS_ANONYMOUS_DATA}
					showButtonUploadSheetPenerima
					showButtonCreate={false}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/penerima' + objectToQueryString(params)}
					showCounter={true}
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
									placeholder="Cari penerima"
									onChange={(event) => {
										handleSetFilter(
											'keyword',
											event.target.value ? { keyword: encodeURIComponent(event.target.value) } : undefined
										);
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

			{isShowBulkDownloadCertificate && (
				<>
					<hr />
					<div className="flex items-center justify-end gap-3 px-6 py-4">
						{!params?.program_id && (
							<div className="flex items-center gap-2 p-2 text-xs text-gray-500 bg-yellow-400 rounded-sm">
								<span className="w-5">
									<FaInfoCircle size={18} />
								</span>
								<div className="italic">Pilih program pada filter untuk download sertifikat</div>
							</div>
						)}
						<ButtonPrintMultiplePenerimaCertificate params={params} disabled={!params?.program_id} />
					</div>
				</>
			)}

			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					loading={fetchingPenerimaList}
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
	isShowFilter: true,
	isShowBulkDownloadCertificate: false,
	isShowButtonSeeAnonymousData: false,
	isShowButtonUploadAnonymousData: false,
	isPIP: true,
	isKIP: true,
	isNeedAbort: false
};
