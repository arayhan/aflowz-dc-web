import { Table } from '@/components/atoms';
import { useProgramStore } from '@/store';
import { slugify } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { Link } from 'react-router-dom';

export const TableProgram = ({ category }) => {
	const { fetchingProgramList, programList } = useProgramStore();
	const { getProgramList } = useProgramStore();

	const [data, setData] = useState([]);

	const columns = React.useMemo(
		() => [
			{
				Header: 'No',
				accessor: '',
				width: 50,
				maxWidth: 50,
				disableSortBy: true,
				disableFilters: true,
				Cell: (row) => {
					return <div>{Number(row.row.id) + 1}</div>;
				}
			},
			{
				Header: 'Name',
				accessor: 'name',
				maxWidth: 150
			},
			{
				Header: 'Category',
				Cell: (row) => <div>{row.row.original.program_category.name}</div>
			},
			{
				Header: 'Periode',
				accessor: 'periode',
				maxWidth: 80
			},
			{
				Header: 'Detail',
				maxWidth: 80,
				Cell: (row) => {
					const slug = slugify(row.row.original.name);
					return (
						<div>
							<Link to={'/program/' + slug} className="bg-primary text-white px-3 py-1 text-sm rounded-md">
								Detail
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
		getProgramList(params);
	}, [category]);

	useEffect(() => {
		if (programList) setData(programList.items);
	}, [programList]);

	return (
		<div>
			{programList?.total === 0 && (
				<div className="flex flex-col items-center space-y-3 bg-gray-100 p-10 rounded-md text-gray-500">
					<ImFileEmpty size={40} />
					<div>No Data Found</div>
				</div>
			)}
			{programList?.total > 0 && <Table columns={columns} data={data} />}
		</div>
	);
};
