import { Table, ButtonAction, TableHeader, TableFooter } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';

export const TableProgram = ({ selectedCategory }) => {
	const { isAdmin } = useAuthStore();
	const { programList, fetchingProgramList, getProgramList, deleteProgram } = useProgramStore();

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
				Header: 'Name',
				accessor: 'name',
				minWidth: 215
			},
			{
				Header: 'Category',
				minWidth: 250,
				Cell: (row) => <div>{row.row.original.program_category.name}</div>
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 50
			},
			{
				Header: 'Detail',
				minWidth: 50,
				maxWidth: 50,
				Cell: (row) => {
					return (
						<ButtonAction
							className="min-w-[100px] w-full"
							action={ACTION_TYPES.SEE_DETAIL}
							linkTo={`/program/${row.row.original.id}`}
						/>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 220,
				hidden: !isAdmin,
				Cell: (row) => {
					return (
						isAdmin && (
							<div className="grid grid-cols-2 gap-2">
								<ButtonAction action={ACTION_TYPES.UPDATE} linkTo={`/program/update/${row.row.original.id}`} />
								<ButtonAction action={ACTION_TYPES.DELETE} onClick={() => deleteProgram(row.row.original.id)} />
							</div>
						)
					);
				}
			}
		],
		[offset, perPage, page, isAdmin]
	);

	useEffect(() => {
		const initOffset = (page - 1) * perPage;
		const params = { limit: perPage, offset: initOffset };

		if (selectedCategory) Object.assign(params, { program_category_id: selectedCategory.id });

		setOffset(initOffset);
		getProgramList(params);
	}, [selectedCategory, page, perPage]);

	useEffect(() => {
		if (programList) {
			setData(programList.items);
			setPageCount(Math.ceil(programList.total / perPage));
		}
	}, [programList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6">
				<TableHeader
					title={selectedCategory?.name || 'All Category'}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet."
					isReadonly={!isAdmin}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProgramList || programList === null} />
			</div>
			<div className="p-6">
				<TableFooter page={page} setPage={setPage} pageCount={pageCount} perPage={perPage} setPerPage={setPerPage} />
			</div>
		</div>
	);
};
