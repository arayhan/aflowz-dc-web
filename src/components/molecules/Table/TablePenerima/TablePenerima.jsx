import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, usePartnerStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectInstitusi } from '../../InputSelect/InputSelectInstitusi/InputSelectInstitusi';
import { InputSelectProgram } from '../../InputSelect/InputSelectProgram/InputSelectProgram';
import { InputSelectVillage } from '../../InputSelect/InputSelectVillage/InputSelectVillage';

export const TablePenerima = ({
	title,
	displayedColumns,
	params,
	isReadonly,
	isShowFilter,
	isShowFooter,
	isShowButtonSeeAll,
	enableClickRow
}) => {
	const navigate = useNavigate();

	const { isSystem } = useAuthStore();
	const { penerimaList, fetchingPenerimaList, getPenerimaList, deletePenerima } = usePartnerStore();

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

	const handleClickRow = (rowData) => navigate(`/penerima/${rowData.id}`);

	const handleSetFilter = (key, params) => {
		const updatedParams = params ? addQueryParams(location.search, params) : removeQueryParams(location.search, key);
		navigate('/penerima' + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult, is_follower: false };

		if (page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getPenerimaList({ ...defaultParams, ...params });
		}
	}, [params, page, perPage, pageCount]);

	useEffect(() => {
		if (penerimaList) {
			setData(penerimaList.items);
			setPageCount(Math.ceil(penerimaList.total / perPage));
		}
	}, [penerimaList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Penerima"
					title={title || 'Penerima Program'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem || isReadonly}
					showButtonUploadSheetPenerima
					showButtonCreate={false}
					showButtonSeeAll={isShowButtonSeeAll}
					seeAllLink={'/penerima' + objectToQueryString(params)}
				/>
			</div>

			{isShowFilter && (
				<>
					<hr />

					<div className="px-6 py-3">
						<div className="w-full grid grid-cols-2 lg:flex justify-end text-sm gap-4">
							<InputSelectProgram
								containerClassName="w-full lg:w-60"
								value={params.program_id ? Number(params.program_id) : undefined}
								showLabel={false}
								showPeriodeOnLabel
								onChange={(option) => handleSetFilter('program_id', option ? { program_id: option.value } : null)}
							/>
							<InputSelectInstitusi
								containerClassName="w-full lg:w-60"
								value={params.konstituen_id ? Number(params.konstituen_id) : undefined}
								showLabel={false}
								onChange={(option) => handleSetFilter('konstituen_id', option ? { konstituen_id: option.value } : null)}
							/>
							<InputSelectCity
								containerClassName="w-full lg:w-60"
								value={params.city_id ? Number(params.city_id) : undefined}
								showLabel={false}
								onChange={(option) => handleSetFilter('city_id', option ? { city_id: option.value } : null)}
							/>
							<InputSelectVillage
								containerClassName="w-full lg:w-60"
								value={params.village_id ? Number(params.village_id) : undefined}
								showLabel={false}
								onChange={(option) => handleSetFilter('village_id', option ? { village_id: option.value } : null)}
							/>
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
