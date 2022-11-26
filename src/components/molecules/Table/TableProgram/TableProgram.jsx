import { Table, ButtonAction, TableHeader } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { ACTION_TYPES } from '@/utils/constants';
import { useEffect, useState, useMemo } from 'react';

export const TableProgram = ({ selectedCategory }) => {
	const { isAdmin } = useAuthStore();
	const { programList, fetchingProgramList, getProgramList, deleteProgram } = useProgramStore();

	const [data, setData] = useState([]);

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
		[]
	);

	useEffect(() => {
		const params = selectedCategory ? { program_category_id: selectedCategory.id } : null;
		getProgramList(params);
	}, [selectedCategory]);

	useEffect(() => {
		if (programList) setData(programList.items);
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
		</div>
	);
};
