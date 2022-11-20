import { Table } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export const TableMitra = ({ selectedCategory }) => {
	const { programCategoryList, fetchingProgramCategoryList, getProgramCategoryList } = useProgramStore();

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
				Header: 'Name',
				accessor: 'name_alias',
				minWidth: 225
			},
			{
				Header: 'Detail',
				minWidth: 180,
				Cell: (row) => {
					return (
						<div>
							<Link
								to={`/mitra/${row.row.original.id}`}
								className="w-full max-w-[200px] text-center bg-blue-500 hover:bg-blue-600 transition-all inline-block text-white text-xs md:text-sm px-2 py-2 rounded-md"
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
		const params = selectedCategory ? { program_category_id: selectedCategory.id } : null;
		getProgramCategoryList(params);
	}, [selectedCategory]);

	useEffect(() => {
		if (programCategoryList) setData(programCategoryList.items);
	}, [programCategoryList]);

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className="p-6 flex items-center justify-between">
				<div>
					<div className="text-lg font-extralight">List Mitra</div>
					<div className="text-sm text-gray-400">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium animi dolorum eveniet.
					</div>
				</div>
			</div>
			<div className="overflow-x-scroll">
				<Table columns={columns} data={data} loading={fetchingProgramCategoryList || programCategoryList === null} />
			</div>
		</div>
	);
};
