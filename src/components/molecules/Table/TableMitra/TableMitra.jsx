import { ButtonAction, Table, TableFooter, TableHeader } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableMitra = ({ params, isShowFooter, enableClickRow }) => {
	const navigate = useNavigate();
	const { isSystem } = useAuthStore();
	const { programCategoryList, fetchingProgramCategoryList } = useProgramStore();
	const { getProgramCategoryList, deleteProgramCategory } = useProgramStore();

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
				Cell: (row) => <div className="text-gray-400">{Number(row.row.id) + offset + 1}</div>
			},
			{
				Header: 'Mitra',
				accessor: 'name',
				width: '100%',
				minWidth: 300
			},
			{
				Header: 'Nama PIC',
				accessor: 'pic',
				minWidth: 250
			},
			{
				Header: 'Nomor PIC',
				accessor: 'pic_mobile'
			},
			{
				Header: 'Total Program Tersalurkan',
				accessor: 'total_program',
				minWidth: 250
			},
			{
				Header: 'Total Penerima Benefit',
				accessor: '',
				minWidth: 250
			},
			{
				Header: 'Actions',
				minWidth: 220,
				Cell: (row) => {
					return (
						<div className="flex gap-2">
							<ButtonAction action={ACTION_TYPES.SEE_DETAIL} linkTo={`/mitra/${row.row.original.id}`} />
							{isSystem && (
								<>
									<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/mitra/update/${row.row.original.id}`} />
									<ButtonAction
										action={ACTION_TYPES.DELETE}
										onClick={() => deleteProgramCategory(row.row.original.id)}
									/>
								</>
							)}
						</div>
					);
				}
			}
		],
		[offset, perPage, page, isSystem]
	);

	const handleClickRow = (rowData) => navigate(`/mitra/${rowData.id}`);

	useEffect(() => {
		const offsetResult = (page - 1) * perPage;
		const defaultParams = { limit: perPage, offset: offsetResult };

		if (pageCount > 0 && page > pageCount) setPage(pageCount);
		else {
			setOffset(offsetResult);
			getProgramCategoryList({ ...defaultParams, ...params });
		}
	}, [page, perPage, pageCount]);

	useEffect(() => {
		if (programCategoryList) {
			setData(programCategoryList.items);
			setPageCount(Math.ceil(programCategoryList.total / perPage));
		}
	}, [programCategoryList, pageCount]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="flex items-center justify-between p-6">
				<TableHeader
					feature="Mitra"
					featurePath="/mitra"
					title={'List Mitra'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isSystem}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table
					columns={columns}
					data={data}
					onClickRow={enableClickRow && handleClickRow}
					loading={fetchingProgramCategoryList || programCategoryList === null}
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

TableMitra.defaultProps = {
	params: {},
	isShowFooter: true
};
