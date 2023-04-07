import {
	Table,
	ButtonAction,
	TableHeader,
	TableFooter,
	Button,
	CardOrganizationStructureImage,
	Badge
} from '@/components/atoms';
import { useAuthStore, useCityStore, useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { addQueryParams, objectToQueryString, queryStringToObject, removeQueryParams } from '@/utils/helpers';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { InputSelectCity } from '../../InputSelect/InputSelectCity/InputSelectCity';
import { InputSelectOrganizationPosition } from '../../InputSelect/InputSelectOrganizationPosition/InputSelectOrganizationPosition';
import { InputSelectProgram } from '../../InputSelect/InputSelectProgram/InputSelectProgram';

export const TableProgramOrganization = ({
	title,
	displayedColumns,
	displayedFilters,
	params,
	mainRoute,
	setParams,
	isReadonly,
	isShowFooter,
	isShowFilter,
	seeAllLink,
	isShowButtonSeeAll,
	isShowUploadOrganizationStructure,
	isShowButtonUploadOrganizationStructure,
	enableClickRow
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { programID } = useParams();

	const { isSystem } = useAuthStore();
	const {
		programDetail,
		programOrganizationList,
		fetchingProgramDetail,
		fetchingProgramOrganizationList,
		processingUploadProgramOrganizationStructureImage,
		getProgramDetail,
		getProgramOrganizationList,
		deleteProgramOrganization,
		uploadProgramOrganizationStructureImage
	} = useProgramStore();

	const { cityList, getCityList } = useCityStore();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	const [selectedCity, setSelectedCity] = useState(null);

	const [organizationPositionParams] = useState(programID ? { program_id: programID } : null);

	const [showModalUploadOrganizationStructure, setShowModalUploadOrganizationStructure] = useState(false);

	const handleUpload = (picture) => {
		const base64Data = picture.split(',')[1];
		uploadProgramOrganizationStructureImage(programID, { picture: base64Data }, () =>
			setShowModalUploadOrganizationStructure(false)
		);
	};

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
				Header: 'Nama',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Nama'),
				Cell: (row) => {
					const data = row.row.original;
					return data.partner?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/staff/${data.partner?.id}`}
							text={data.partner?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Program',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Program'),
				Cell: (row) => {
					const data = row.row.original;
					return data.partner?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/program/${data.program?.id}`}
							text={data.program?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Institusi',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Institusi'),
				Cell: (row) => {
					const data = row.row.original;
					return data.konstituen?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/institusi/${data.konstituen?.id}`}
							text={data.konstituen?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Kota',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Kota'),
				Cell: (row) => {
					const data = row.row.original;
					return data.city?.id ? (
						<Button
							className="px-5 py-2 text-xs rounded-sm text-white bg-purple-500 hover:bg-purple-400 min-w-[100px] w-full"
							linkTo={`/dapil/city/${data.city?.id}`}
							text={data.city?.name}
						/>
					) : (
						'-'
					);
				}
			},
			{
				Header: 'Posisi',
				minWidth: 215,
				hidden: displayedColumns && !displayedColumns.includes('Posisi'),
				Cell: (row) => {
					const data = row.row.original;
					return <div>{data.position?.name || '-'}</div>;
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isSystem || isReadonly,
				Cell: (row) => {
					return (
						isSystem && (
							<div className="flex gap-2">
								<ButtonAction
									action={ACTION_TYPES.UPDATE}
									linkTo={
										mainRoute
											? `${mainRoute}/update/${row.row.original.id}`
											: `/program/organization/update/${row.row.original.id}`
									}
								/>
								<ButtonAction
									action={ACTION_TYPES.DELETE}
									onClick={() => deleteProgramOrganization(row.row.original.id)}
								/>
							</div>
						)
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => {
		if (onClickRow) onClickRow(rowData);
		else navigate(`/program/organization/${rowData.id}`);
	};

	const handleSetFilter = (key, _params) => {
		const updatedParams = _params
			? addQueryParams(location?.search, _params)
			: removeQueryParams(location?.search, key);
		const navigation = programID ? `/program/${programID}/organization` : '/program/organization';
		if (setParams) setParams(queryStringToObject(updatedParams));
		else navigate(navigation + updatedParams, { replace: true });
	};

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = {
			limit: perPage,
			offset: offsetResult
		};

		if (programID) defaultParams.program_id = programID;
		if (selectedCity) defaultParams.city_id = selectedCity.id;

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(Math.abs(offsetResult));
			getProgramOrganizationList({ ...defaultParams, ...params });
		}
	}, [selectedCity, params, page, perPage, pageCount]);

	useEffect(() => {
		if (programOrganizationList) {
			setData(programOrganizationList.items);
			setPageCount(Math.ceil(programOrganizationList.total / perPage));
		}
	}, [programID, programOrganizationList]);

	useEffect(() => {
		if (programID && !programDetail) getProgramDetail(programID);
	}, [programID, programDetail]);

	useEffect(() => {
		if (!selectedCity) getCityList({ limit: 10 });
	}, [selectedCity]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					feature="Program Organization"
					featurePath={mainRoute || programID ? `/program/${programID}/organization` : '/program/organization'}
					title={title || 'Program Organization'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					mainRoute={mainRoute || programID ? `/program/${programID}/organization` : '/program/organization'}
					isReadonly={!isSystem || isReadonly}
					seeAllLink={
						seeAllLink || programID
							? `/program/${programID}/organization`
							: '/program/organization' + objectToQueryString(params)
					}
					showButtonUploadOrganizationStructure={isShowButtonUploadOrganizationStructure && !programDetail?.image_url}
					setShowModalUploadOrganizationStructure={setShowModalUploadOrganizationStructure}
					showButtonSeeAll={isShowButtonSeeAll}
				/>
			</div>

			{isShowUploadOrganizationStructure && (
				<>
					<hr />
					<div className="p-3">
						<CardOrganizationStructureImage
							image={programDetail?.image_url}
							showHeader={false}
							showModal={showModalUploadOrganizationStructure}
							setShowModal={setShowModalUploadOrganizationStructure}
							isLoading={fetchingProgramDetail || processingUploadProgramOrganizationStructureImage}
							hideDeleteButton
							onSubmit={handleUpload}
						/>
					</div>
				</>
			)}

			{selectedCity && isShowFilter && (
				<>
					<hr />

					<div className="px-6 py-4">
						<div className="flex items-center justify-end w-full gap-4">
							{selectedCity && <Badge title={selectedCity.name} onRemove={() => setSelectedCity(null)} />}
							{(!displayedFilters || displayedFilters.includes('program_id')) && !programID && (
								<InputSelectProgram
									containerClassName="w-full lg:w-60"
									value={params.program_id ? Number(params.program_id) : undefined}
									showLabel={false}
									showPeriodeOnLabel
									onChange={(option) => handleSetFilter('program_id', option ? { program_id: option.value } : null)}
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
							{(!displayedFilters || displayedFilters.includes('position_id')) && (
								<InputSelectOrganizationPosition
									containerClassName="w-full lg:w-60"
									value={params.position_id ? Number(params.position_id) : undefined}
									showLabel={false}
									params={organizationPositionParams}
									onChange={(option) => handleSetFilter('position_id', option ? { position_id: option.value } : null)}
								/>
							)}
						</div>
					</div>
				</>
			)}

			{!selectedCity && (
				<div className="flex flex-wrap items-start justify-center gap-3 p-5">
					{cityList?.items?.map((city) => {
						return (
							<button
								key={city.id}
								type="button"
								className="w-24 py-2 text-opacity-50 transition-all bg-white border-2 rounded-md shadow-lg cursor-pointer sm:w-28 md:w-32 hover:bg-gray-100"
								onClick={() => setSelectedCity(city)}
							>
								<div className="px-5">
									<img className="w-full" src={require('@/images/icons/Icon_Home/Kota.svg').default} alt="" />
								</div>
								<div className="text-sm text-center lg:text-base font-extralight">{city.name}</div>
							</button>
						);
					})}
				</div>
			)}
			{selectedCity && (
				<div className="overflow-x-scroll">
					<Table
						columns={columns}
						data={data}
						onClickRow={enableClickRow && handleClickRow}
						loading={fetchingProgramOrganizationList || programOrganizationList === null}
					/>
				</div>
			)}

			{selectedCity && isShowFooter && (
				<div className="p-6">
					<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
				</div>
			)}
		</div>
	);
};

TableProgramOrganization.defaultProps = {
	params: {},
	isShowFilter: true,
	isShowFooter: true,
	isShowUploadOrganizationStructure: true,
	isShowButtonUploadOrganizationStructure: true
};
