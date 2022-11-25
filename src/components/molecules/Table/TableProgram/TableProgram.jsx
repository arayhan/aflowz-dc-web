import { Table, TableHeader } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const TableProgram = ({ selectedCategory }) => {
	const location = useLocation();

	const { isAdmin } = useAuthStore();
	const { programList, fetchingProgramList, getProgramList } = useProgramStore();

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
						<div className="min-w-[100px] w-full">
							<Link
								to={`/program/${row.row.original.id}`}
								className="inline-block text-center px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded-sm text-xs transition-all"
							>
								See Detail
							</Link>
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 100,
				hidden: !isAdmin,
				Cell: (row) => {
					return (
						isAdmin && (
							<div className="grid grid-cols-2 gap-2">
								<Link
									to={`${location.pathname}/update/${row.row.original.id}`}
									className="inline-block text-center px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded-sm text-xs transition-all"
								>
									Update
								</Link>
								<Link className="inline-block text-center px-3 py-1 bg-red-500 hover:bg-red-400 text-white rounded-sm text-xs transition-all">
									Delete
								</Link>
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
					isReadonly={isAdmin}
				/>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProgramList || programList === null} />
			</div>
		</div>
	);
};
