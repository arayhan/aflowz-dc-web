import { Table } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { Link } from 'react-router-dom';

export const TableProgram = ({ selectedCategory }) => {
	const { fetchingProgramList, programList } = useProgramStore();
	const { getProgramList } = useProgramStore();

	const [data, setData] = useState([]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				accessor: '',
				width: 10,
				maxWidth: 10,
				disableSortBy: true,
				disableFilters: true,
				Cell: (row) => {
					return <div className="text-gray-400">{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Name',
				accessor: 'name',
				minWidth: 250
			},
			{
				Header: 'Category',
				minWidth: 300,
				Cell: (row) => <div>{row.row.original.program_category.name}</div>
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 50
			},
			{
				Header: 'Detail',
				minWidth: 180,
				Cell: (row) => {
					return (
						<div>
							<Link
								to={`/program/${row.row.original.program_category.id}/${row.row.original.id}`}
								className="w-full max-w-[200px] text-center bg-blue-500 hover:bg-blue-600 transition-all inline-block text-white text-sm px-4 py-2 rounded-md"
							>
								See Detail
							</Link>
						</div>
					);
				}
			}
		],
		[]
	);

	useEffect(() => {
		const params = {
			limit: 10,
			offset: 0
		};

		if (selectedCategory) Object.assign(params, { program_category_id: selectedCategory.id });

		getProgramList(params);
	}, [selectedCategory]);

	useEffect(() => {
		if (programList) setData(programList.items);
	}, [programList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<div>
					<div className="text-lg font-extralight">{selectedCategory?.name || 'All Category'}</div>
					<div className="text-sm text-gray-400">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
					</div>
				</div>
			</div>
			{programList?.total === 0 && (
				<div className="flex flex-col items-center space-y-3 bg-gray-100 p-10 rounded-md text-gray-500">
					<ImFileEmpty size={40} />
					<div>No Data Found</div>
				</div>
			)}
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProgramList || programList === null} />
			</div>
		</div>
	);
};
