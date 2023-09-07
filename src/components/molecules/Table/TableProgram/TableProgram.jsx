import { Table, ButtonAction, TableHeader, TableFooter, Button } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputSelectPeriode } from '../../InputSelect/InputSelectPeriode/InputSelectPeriode';
import { InputSelectProgramCategory } from '../../InputSelect/InputSelectProgramCategory/InputSelectProgramCategory';
import Swal from 'sweetalert2';

export const TableProgram = ({
	title,
	displayedColumns,
	params,
	isReadonly,
	isShowFooter,
	isShowFilter,
	isShowButtonSeeAll,
	enableClickRow,
	isShowButtonUploadSheetFollowers,
	isShowButtonUploadSheetPenerimaConfirmed,
	isShowButtonUploadSheetPenerimaGeneral,
	isShowButtonUploadSheetKandidat
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { isSystem } = useAuthStore();
	const { programList, fetchingProgramList, getProgramList, deleteProgram, changeProgramStatus } = useProgramStore();

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
				Header: 'Nama Program',
				accessor: 'name',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Nama Program')
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 50,
				hidden: displayedColumns && !displayedColumns.includes('Periode')
			},
			{
				Header: 'PIC Mitra',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('PIC Mitra'),
				Cell: (row) => <div>{row.row.original.pic || '-'}</div>
			},
			{
				Header: 'Kontak PIC Mitra',
				minWidth: 180,
				hidden: displayedColumns && !displayedColumns.includes('Kontak PIC Mitra'),
				Cell: (row) => <div>{row.row.original.pic_mobile || '-'}</div>
			},
			{
				Header: 'PIC Internal',
				minWidth: 150,
				maxWidth: 150,
				hidden: displayedColumns && !displayedColumns.includes('PIC Internal'),
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
				Header: 'Kontak PIC Internal',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Kontak PIC Internal'),
				Cell: (row) => <div>{row.row.original.pic_staff.mobile || '-'}</div>
			},
			{
				Header: 'Lokasi Pelaksanaan Program',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Lokasi Pelaksanaan Program'),
				Cell: (row) => <div>{row.row.original.location || '-'}</div>
			},
			{
				Header: 'Tanggal Pelaksanaan Program',
				minWidth: 200,
				hidden: displayedColumns && !displayedColumns.includes('Tanggal Pelaksanaan Program'),
				Cell: (row) => <div>{row.row.original.date || '-'}</div>
			},
			{
				Header: 'Jumlah Peserta',
				minWidth: 100,
				hidden: displayedColumns && !displayedColumns.includes('Jumlah Peserta'),
				Cell: (row) => <div>{row.row.original.total_participant || '-'}</div>
			},
			{
				Header: 'Actions',
				minWidth: params.is_special_program ? 220 : 300,
				Cell: (row) => {
					const data = row.row.original;
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/program/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/program/update/${row.row.original.id}`} />
									<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteProgram(row.row.original.id)} />
								</>
							)}
							{!params.is_special_program && data.status === 'available' && (
								<button
									className="px-2 py-1 text-xs text-white bg-green-500 rounded-sm"
									onClick={() => handleChangeStatus(row.row.original.id)}
								>
									Ubah Status
								</button>
							)}
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleChangeStatus = (programID) => {
		Swal.fire({
			title: 'Apakah Anda yakin mengubah status item ini?',
			icon: 'warning',
			showCancelButton: true
		}).then((result) => {
			if (result.isConfirmed) {
				changeProgramStatus(programID);
			}
		});
	};

	const handleClickRow = (rowData) => navigate(`/program/${rowData.id}`);

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/program' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getProgramList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (programList) {
			setData(programList.items);
			setPageCount(Math.ceil(programList.total / perPage));
		}
	}, [programList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Program"
					featurePath="/program"
					title={title || 'Program'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					mainRoute={'/program'}
					isReadonly={!isSystem || isReadonly}
					seeAllLink={'/program' + objectToQueryString(params)}
					showButtonSeeAll={isShowButtonSeeAll}
					showButtonUploadSheetFollowers={isShowButtonUploadSheetFollowers}
					showButtonUploadSheetPenerimaConfirmed={isShowButtonUploadSheetPenerimaConfirmed}
					showButtonUploadSheetPenerimaGeneral={isShowButtonUploadSheetPenerimaGeneral}
					showButtonUploadSheetKandidat={isShowButtonUploadSheetKandidat}
				/>
			</div>

			{isShowFilter && (
				<>
					<hr />

					<div className="px-6 py-3">
						<div className="flex justify-end w-full gap-4 text-sm">
							<InputSelectProgramCategory
								containerClassName="w-60"
								value={params.program_category_id ? Number(params.program_category_id) : undefined}
								showLabel={false}
								onChange={(option) =>
									handleSetFilter('program_category_id', option ? { program_category_id: option.value } : null)
								}
							/>
							<InputSelectPeriode
								containerClassName="w-60"
								value={params.periode ? Number(params.periode) : undefined}
								showLabel={false}
								onChange={(option) => handleSetFilter('periode', option ? { periode: option.value } : null)}
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
					loading={fetchingProgramList || programList === null}
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

TableProgram.defaultProps = {
	params: {},
	isShowFilter: true,
	isShowFooter: true,
	showButtonUploadSheetFollowers: false,
	isShowButtonUploadSheetPenerima: false
};
