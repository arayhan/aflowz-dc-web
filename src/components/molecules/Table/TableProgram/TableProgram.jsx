import { Table, TableHeader } from '@/components/atoms';
import { useAuthStore, useProgramStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export const TableProgram = ({ selectedCategory }) => {
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
				minWidth: 175
			},
			{
				Header: 'Category',
				minWidth: 225,
				Cell: (row) => <div>{row.row.original.program_category.name}</div>
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 50
			},
			{
				Header: 'Detail',
				minWidth: 100,
				maxWidth: 100,
				Cell: (row) => {
					return (
						<div className="min-w-[100px] w-full">
							<Link
								to={`/program/${row.row.original.id}`}
								className="w-full max-w-[200px] text-center bg-blue-500 hover:bg-blue-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md"
							>
								See Detail
							</Link>
						</div>
					);
				}
			},
			{
				Header: 'Actions',
				minWidth: 180,
				hidden: !isAdmin,
				Cell: () => {
					return (
						isAdmin && (
							<div className="grid grid-cols-2 gap-2">
								<Link className="w-full max-w-[200px] text-center bg-green-500 hover:bg-green-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md">
									Update
								</Link>
								<Link className="w-full max-w-[200px] text-center bg-red-500 hover:bg-red-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md">
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
